import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection, doc, onSnapshot, addDoc, setDoc, deleteDoc, updateDoc,
  query, where, serverTimestamp, Timestamp, getDocs,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { getMachine, registerMachines, Machine } from '../constants/machines';

export type PlaceType = 'gym' | 'home' | 'hotel' | 'other';

export type Place = {
  id: string;
  name: string;
  type: PlaceType;
  createdAt: Date | null;
};

export type SaveStatus = 'Comfortable' | 'Tried once' | 'Scanned' | 'Added';

export type SavedMachine = {
  id: string;
  key: string;        // catalog key (or custom key)
  placeId: string;
  name: string;       // denormalized for fast rendering
  cat: string;
  area: string;
  status: SaveStatus;
  photoUri?: string | null;
  savedAt: Date | null;
  lastTrainedAt?: Date | null;
};

const CURRENT_KEY = 'spotter.currentPlaceId';

type PlacesContextType = {
  loading: boolean;
  places: Place[];
  saved: SavedMachine[];
  currentId: string | null;
  current: Place | null;
  /** Saved machines belonging to the current place. */
  currentMachines: SavedMachine[];
  /** Most-recently-saved machines across all places. */
  recent: SavedMachine[];
  machineCount: (placeId: string) => number;
  isSaved: (key: string, placeId?: string) => boolean;
  addPlace: (name: string, type: PlaceType) => Promise<string | null>;
  renamePlace: (id: string, name: string) => Promise<void>;
  deletePlace: (id: string) => Promise<void>;
  setCurrent: (id: string) => Promise<void>;
  saveTo: (placeId: string, key: string, status?: SaveStatus) => Promise<void>;
  removeFrom: (placeId: string, key: string) => Promise<void>;
  /** Toggle a machine in the current place. */
  toggle: (key: string, status?: SaveStatus) => Promise<void>;
  /** Persist a user-created custom machine so the guide can render it later. */
  registerCustom: (machine: Machine) => Promise<void>;
  /** Attach a real photo to every saved copy of a machine in a place. */
  setPhoto: (key: string, uri: string, placeId?: string) => Promise<void>;
  /** Look up a saved photo for a machine in a place. */
  photoFor: (key: string, placeId?: string) => string | null;
  /** Stamp machines as just trained (called when a workout finishes). */
  markTrained: (keys: string[], placeId?: string | null) => Promise<void>;
};

const PlacesContext = createContext<PlacesContextType | null>(null);

function toDate(v: any): Date | null {
  return v instanceof Timestamp ? v.toDate() : null;
}

export function PlacesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [places, setPlaces] = useState<Place[]>([]);
  const [saved, setSaved] = useState<SavedMachine[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [placesLoaded, setPlacesLoaded] = useState(false);
  const [savedLoaded, setSavedLoaded] = useState(false);

  // Restore the last-selected place id from local storage on mount.
  useEffect(() => {
    AsyncStorage.getItem(CURRENT_KEY).then(v => { if (v) setCurrentId(v); });
  }, []);

  // Subscribe to the user's places + saved machines + custom equipment.
  useEffect(() => {
    if (!user) {
      setPlaces([]); setSaved([]); setPlacesLoaded(false); setSavedLoaded(false);
      return;
    }
    const placesCol = collection(db, 'users', user.uid, 'places');
    const savedCol = collection(db, 'users', user.uid, 'saved');
    const customCol = collection(db, 'users', user.uid, 'customMachines');

    // Load custom machines once so the catalog can resolve them.
    getDocs(customCol).then(snap => {
      const more: Record<string, Machine> = {};
      snap.forEach(d => { more[d.id] = d.data() as Machine; });
      if (Object.keys(more).length) registerMachines(more);
    }).catch(() => {});

    const unsubPlaces = onSnapshot(placesCol, snap => {
      const list = snap.docs.map(d => ({
        id: d.id, name: d.data().name, type: d.data().type ?? 'gym', createdAt: toDate(d.data().createdAt),
      } as Place));
      list.sort((a, b) => (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0));
      setPlaces(list);
      setPlacesLoaded(true);
    }, () => setPlacesLoaded(true));

    const unsubSaved = onSnapshot(savedCol, snap => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data(), savedAt: toDate(d.data().savedAt), lastTrainedAt: toDate(d.data().lastTrainedAt) } as SavedMachine));
      list.sort((a, b) => (b.savedAt?.getTime() ?? 0) - (a.savedAt?.getTime() ?? 0));
      setSaved(list);
      setSavedLoaded(true);
    }, () => setSavedLoaded(true));

    return () => { unsubPlaces(); unsubSaved(); };
  }, [user]);

  // Auto-seed a default place for brand-new users, and keep currentId valid.
  useEffect(() => {
    if (!user || !placesLoaded) return;
    if (places.length === 0) {
      addDoc(collection(db, 'users', user.uid, 'places'), {
        name: 'My Gym', type: 'gym', createdAt: serverTimestamp(),
      }).catch(() => {});
      return;
    }
    if (!currentId || !places.some(p => p.id === currentId)) {
      const next = places[0].id;
      setCurrentId(next);
      AsyncStorage.setItem(CURRENT_KEY, next).catch(() => {});
    }
  }, [user, placesLoaded, places, currentId]);

  const setCurrent = async (id: string) => {
    setCurrentId(id);
    await AsyncStorage.setItem(CURRENT_KEY, id);
  };

  const addPlace = async (name: string, type: PlaceType) => {
    if (!user) return null;
    const ref = await addDoc(collection(db, 'users', user.uid, 'places'), {
      name: name.trim(), type, createdAt: serverTimestamp(),
    });
    await setCurrent(ref.id);
    return ref.id;
  };

  const renamePlace = async (id: string, name: string) => {
    if (!user) return;
    await updateDoc(doc(db, 'users', user.uid, 'places', id), { name: name.trim() });
  };

  const deletePlace = async (id: string) => {
    if (!user) return;
    // Remove the place's saved machines, then the place itself.
    const toRemove = saved.filter(s => s.placeId === id);
    await Promise.all(toRemove.map(s => deleteDoc(doc(db, 'users', user!.uid, 'saved', s.id))));
    await deleteDoc(doc(db, 'users', user.uid, 'places', id));
  };

  const saveTo = async (placeId: string, key: string, status: SaveStatus = 'Added') => {
    if (!user) return;
    if (saved.some(s => s.placeId === placeId && s.key === key)) return; // already saved
    const m = getMachine(key);
    await addDoc(collection(db, 'users', user.uid, 'saved'), {
      key, placeId, name: m.name, cat: m.cat, area: m.area, status, savedAt: serverTimestamp(),
    });
  };

  const removeFrom = async (placeId: string, key: string) => {
    if (!user) return;
    const hit = saved.find(s => s.placeId === placeId && s.key === key);
    if (hit) await deleteDoc(doc(db, 'users', user.uid, 'saved', hit.id));
  };

  const toggle = async (key: string, status: SaveStatus = 'Added') => {
    if (!currentId) return;
    if (saved.some(s => s.placeId === currentId && s.key === key)) {
      await removeFrom(currentId, key);
    } else {
      await saveTo(currentId, key, status);
    }
  };

  const registerCustom = async (machine: Machine) => {
    registerMachines({ [machine.key]: machine });
    if (!user) return;
    await setDoc(doc(db, 'users', user.uid, 'customMachines', machine.key), machine);
  };

  const setPhoto = async (key: string, uri: string, placeId?: string) => {
    if (!user) return;
    const pid = placeId ?? currentId;
    const targets = saved.filter(s => s.key === key && (!pid || s.placeId === pid));
    await Promise.all(targets.map(s => updateDoc(doc(db, 'users', user!.uid, 'saved', s.id), { photoUri: uri })));
  };

  const photoFor = (key: string, placeId?: string) => {
    const pid = placeId ?? currentId;
    const hit = saved.find(s => s.key === key && (!pid || s.placeId === pid) && s.photoUri);
    return hit?.photoUri ?? null;
  };

  const markTrained = async (keys: string[], placeId?: string | null) => {
    if (!user || !keys.length) return;
    const pid = placeId ?? currentId;
    const targets = saved.filter(s => keys.includes(s.key) && (!pid || s.placeId === pid));
    await Promise.all(targets.map(s =>
      updateDoc(doc(db, 'users', user!.uid, 'saved', s.id), { lastTrainedAt: serverTimestamp() }).catch(() => {}),
    ));
  };

  const machineCount = (placeId: string) => saved.filter(s => s.placeId === placeId).length;
  const isSaved = (key: string, placeId?: string) => {
    const pid = placeId ?? currentId;
    return !!pid && saved.some(s => s.placeId === pid && s.key === key);
  };

  const current = useMemo(() => places.find(p => p.id === currentId) ?? null, [places, currentId]);
  const currentMachines = useMemo(() => saved.filter(s => s.placeId === currentId), [saved, currentId]);
  const recent = useMemo(() => saved.slice(0, 10), [saved]);
  const loading = !!user && (!placesLoaded || !savedLoaded);

  return (
    <PlacesContext.Provider value={{
      loading, places, saved, currentId, current, currentMachines, recent,
      machineCount, isSaved, addPlace, renamePlace, deletePlace, setCurrent,
      saveTo, removeFrom, toggle, registerCustom, setPhoto, photoFor, markTrained,
    }}>
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlaces() {
  const ctx = useContext(PlacesContext);
  if (!ctx) throw new Error('usePlaces must be used within PlacesProvider');
  return ctx;
}
