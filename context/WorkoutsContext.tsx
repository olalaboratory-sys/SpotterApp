import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection, doc, onSnapshot, addDoc, updateDoc, increment,
  serverTimestamp, Timestamp, query, orderBy, limit,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';

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
  completeWorkout: (r: { completedCount: number; totalCount: number; setsDone: number; feel: string | null }) => Promise<void>;
};

const WorkoutsContext = createContext<WorkoutsContextType | null>(null);

export function WorkoutsProvider({ children }: { children: React.ReactNode }) {
  const { user, refreshProfile } = useAuth();
  const [history, setHistory] = useState<WorkoutRecord[]>([]);
  const [draft, setDraft] = useState<string[]>([]);
  const [meta, setMeta] = useState<WorkoutMeta>(DEFAULT_META);

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

  const startDraft = (keys: string[], m: WorkoutMeta) => { setDraft(keys); setMeta(m); };
  const removeFromDraft = (key: string) => setDraft(d => d.filter(k => k !== key));
  const swapInDraft = (oldKey: string, newKey: string) =>
    setDraft(d => d.map(k => (k === oldKey ? newKey : k)));

  const completeWorkout = async (r: { completedCount: number; totalCount: number; setsDone: number; feel: string | null }) => {
    if (!user) return;
    await addDoc(collection(db, 'users', user.uid, 'workouts'), {
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
  };

  return (
    <WorkoutsContext.Provider value={{ history, draft, meta, startDraft, removeFromDraft, swapInDraft, completeWorkout }}>
      {children}
    </WorkoutsContext.Provider>
  );
}

export function useWorkouts() {
  const ctx = useContext(WorkoutsContext);
  if (!ctx) throw new Error('useWorkouts must be used within WorkoutsProvider');
  return ctx;
}
