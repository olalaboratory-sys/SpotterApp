import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithCredential,
  OAuthProvider,
} from 'firebase/auth';
import {
  doc, getDoc, setDoc, updateDoc, serverTimestamp, Timestamp,
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { normalizeExperience, normalizeGoals } from '../constants/profile';

export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  onboardingCompleted: boolean;
  trialStartedAt: Date | null;
  subscriptionStatus: 'none' | 'trial' | 'active' | 'expired';
  machinesCount: number;
  workoutsCount: number;
  experienceLevel: string | null;
  goals: string[];
  createdAt: Date | null;
};

type AuthContextType = {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (name: string, email: string, password: string) => Promise<void>;
  handleGoogleCredential: (idToken: string) => Promise<void>;
  handleAppleCredential: (idToken: string, rawNonce: string) => Promise<void>;
  signOut: () => Promise<void>;
  startTrial: (planId: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

async function fetchOrCreateProfile(user: FirebaseUser): Promise<UserProfile> {
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data();
    return {
      uid: user.uid,
      email: data.email ?? user.email,
      displayName: data.displayName ?? user.displayName,
      photoURL: data.photoURL ?? user.photoURL,
      onboardingCompleted: data.onboardingCompleted ?? false,
      trialStartedAt: data.trialStartedAt ? (data.trialStartedAt as Timestamp).toDate() : null,
      subscriptionStatus: data.subscriptionStatus ?? 'none',
      machinesCount: data.machinesCount ?? 0,
      workoutsCount: data.workoutsCount ?? 0,
      experienceLevel: normalizeExperience(data),
      goals: normalizeGoals(data),
      createdAt: data.createdAt ? (data.createdAt as Timestamp).toDate() : null,
    };
  }

  const newProfile = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    onboardingCompleted: false,
    trialStartedAt: null,
    subscriptionStatus: 'none' as const,
    machinesCount: 0,
    workoutsCount: 0,
    experienceLevel: null,
    goals: [] as string[],
    createdAt: serverTimestamp(),
  };
  await setDoc(ref, newProfile);
  return { ...newProfile, trialStartedAt: null, createdAt: null };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const profile = await fetchOrCreateProfile(firebaseUser);
          setUserProfile(profile);
        } catch {
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    const profile = await fetchOrCreateProfile(user);
    setUserProfile(profile);
  }, [user]);

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (name: string, email: string, password: string) => {
    const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(newUser, { displayName: name });
  };

  const handleGoogleCredential = async (idToken: string) => {
    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, credential);
  };

  const handleAppleCredential = async (idToken: string, rawNonce: string) => {
    const provider = new OAuthProvider('apple.com');
    const credential = provider.credential({ idToken, rawNonce });
    await signInWithCredential(auth, credential);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const startTrial = async (planId: string) => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    await updateDoc(ref, {
      trialStartedAt: serverTimestamp(),
      subscriptionStatus: 'trial',
      onboardingCompleted: true,
      selectedPlan: planId,
    });
    await refreshProfile();
  };

  return (
    <AuthContext.Provider value={{
      user, userProfile, loading,
      signInWithEmail, signUpWithEmail,
      handleGoogleCredential, handleAppleCredential,
      signOut, startTrial, refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function getDaysLeftInTrial(trialStartedAt: Date | null): number {
  if (!trialStartedAt) return 0;
  const end = new Date(trialStartedAt.getTime() + 7 * 24 * 60 * 60 * 1000);
  const diff = end.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
