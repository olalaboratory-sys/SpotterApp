import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, increment,
  serverTimestamp, Timestamp, query, orderBy, limit,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

export type WorkoutMeta = {
  goal: string;
  time: string;
  difficulty: string;
  placeId: string | null;
  placeName: string;
  title: string;
};

export type WorkoutRecord = {
  id: string;
  title: string;
  exerciseKeys: string[];
  completedCount: number;
  totalCount: number;
  setsDone: number;
  feel: string | null;
  createdAt: Date | null;
};

/** A favorited routine, optionally scoped to a single place (placeId null = all places). */
export type SavedRoutine = {
  id: string;
  routineId: string;
  placeId: string | null;
};

const DEFAULT_META: WorkoutMeta = {
  goal: 'Full body', time: '30 min', difficulty: 'Beginner',
  placeId: null, placeName: '', title: 'Workout',
};

type WorkoutsContextType = {
  history: WorkoutRecord[];
  draft: string[];
  meta: WorkoutMeta;
  startDraft: (keys: string[], meta: WorkoutMeta) => void;
  removeFromDraft: (key: string) => void;
  swapInDraft: (oldKey: string, newKey: string) => void;
  completeWorkout: (r: { completedCount: number; totalCount: number; setsDone: number; feel: string | null }) => Promise<string | null>;
  updateWorkoutFeel: (id: string, feel: string) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
  savedRoutines: SavedRoutine[];
  /** True if the routine is saved at all (any scope), or for a specific place when placeId is passed. */
  isRoutineSaved: (routineId: string, placeId?: string | null) => boolean;
  /** Toggle a routine favorite. placeId null = saved to all places. */
  toggleRoutineSaved: (routineId: string, placeId: string | null) => Promise<void>;
};

const WorkoutsContext = createContext<WorkoutsContextType | null>(null);

export function WorkoutsProvider({ children }: { children: React.ReactNode }) {
  const { user, refreshProfile } = useAuth();
  const toast = useToast();
  const [history, setHistory] = useState<WorkoutRecord[]>([]);
  const [draft, setDraft] = useState<string[]>([]);
  const [meta, setMeta] = useState<WorkoutMeta>(DEFAULT_META);
  const [savedRoutines, setSavedRoutines] = useState<SavedRoutine[]>([]);

  useEffect(() => {
    if (!user) { setHistory([]); return; }
    const q = query(
      collection(db, 'users', user.uid, 'workouts'),
      orderBy('createdAt', 'desc'),
      limit(25),
    );
    const unsub = onSnapshot(q, snap => {
      setHistory(snap.docs.map(d => ({
        id: d.id, ...d.data(),
        createdAt: d.data().createdAt instanceof Timestamp ? d.data().createdAt.toDate() : null,
      } as WorkoutRecord)));
    }, () => {});
    return unsub;
  }, [user]);

  useEffect(() => {
    if (!user) { setSavedRoutines([]); return; }
    const unsub = onSnapshot(collection(db, 'users', user.uid, 'savedRoutines'), snap => {
      setSavedRoutines(snap.docs.map(d => ({
        id: d.id, routineId: d.data().routineId, placeId: d.data().placeId ?? null,
      })));
    }, () => {});
    return unsub;
  }, [user]);

  const isRoutineSaved = (routineId: string, placeId?: string | null) => {
    if (placeId === undefined) return savedRoutines.some(s => s.routineId === routineId);
    return savedRoutines.some(s => s.routineId === routineId && s.placeId === placeId);
  };

  const toggleRoutineSaved = async (routineId: string, placeId: string | null) => {
    if (!user) return;
    const existing = savedRoutines.find(s => s.routineId === routineId && s.placeId === placeId);
    try {
      if (existing) {
        await deleteDoc(doc(db, 'users', user.uid, 'savedRoutines', existing.id));
      } else {
        await addDoc(collection(db, 'users', user.uid, 'savedRoutines'), {
          routineId, placeId, savedAt: serverTimestamp(),
        });
      }
    } catch { toast("Couldn't update your saved routines.", 'error'); }
  };

  const startDraft = (keys: string[], m: WorkoutMeta) => { setDraft(keys); setMeta(m); };
  const removeFromDraft = (key: string) => setDraft(d => d.filter(k => k !== key));
  const swapInDraft = (oldKey: string, newKey: string) =>
    setDraft(d => d.map(k => (k === oldKey ? newKey : k)));

  const completeWorkout = async (r: { completedCount: number; totalCount: number; setsDone: number; feel: string | null }) => {
    if (!user) return null;
    try {
      const ref = await addDoc(collection(db, 'users', user.uid, 'workouts'), {
        title: meta.title,
        exerciseKeys: draft,
        completedCount: r.completedCount,
        totalCount: r.totalCount,
        setsDone: r.setsDone,
        feel: r.feel,
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, 'users', user.uid), { workoutsCount: increment(1) }).catch(() => {});
      await refreshProfile().catch(() => {});
      return ref.id;
    } catch {
      toast("Couldn't save your workout.", 'error');
      return null;
    }
  };

  const updateWorkoutFeel = async (id: string, feel: string) => {
    if (!user) return;
    await updateDoc(doc(db, 'users', user.uid, 'workouts', id), { feel }).catch(() => {});
  };

  const deleteWorkout = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'workouts', id));
      await updateDoc(doc(db, 'users', user.uid), { workoutsCount: increment(-1) }).catch(() => {});
      await refreshProfile().catch(() => {});
    } catch { toast("Couldn't delete that workout.", 'error'); }
  };

  return (
    <WorkoutsContext.Provider value={{ history, draft, meta, startDraft, removeFromDraft, swapInDraft, completeWorkout, updateWorkoutFeel, deleteWorkout, savedRoutines, isRoutineSaved, toggleRoutineSaved }}>
      {children}
    </WorkoutsContext.Provider>
  );
}

export function useWorkouts() {
  const ctx = useContext(WorkoutsContext);
  if (!ctx) throw new Error('useWorkouts must be used within WorkoutsProvider');
  return ctx;
}
