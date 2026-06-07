import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { PlacesProvider } from '../context/PlacesContext';
import { WorkoutsProvider } from '../context/WorkoutsContext';
import { ToastProvider } from '../context/ToastContext';

function RootNavigator() {
  const { user, userProfile, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Reactive auth guard: keeps the user on the right screen whenever auth state
  // changes (sign in, sign up, sign out, finishing onboarding).
  useEffect(() => {
    if (loading) return;

    const group = segments[0] as string | undefined;
    const inAuth = group === '(auth)';
    const inOnboarding = group === '(onboarding)';
    const onPaywall = group === 'paywall';

    if (!user) {
      if (!inAuth) router.replace('/(auth)/login');
      return;
    }

    if (!userProfile?.onboardingCompleted) {
      // Allow the onboarding flow and the paywall (which completes onboarding).
      if (!inOnboarding && !onPaywall) router.replace('/(onboarding)/welcome');
      return;
    }

    // Fully set up — bounce out of auth/onboarding or the root index.
    if (inAuth || inOnboarding || group === undefined) {
      router.replace('/(tabs)');
    }
  }, [user, userProfile, loading, segments, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="paywall" options={{ presentation: 'modal' }} />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="guide/[key]" />
      <Stack.Screen name="add-machine" options={{ presentation: 'modal' }} />
      <Stack.Screen name="library/index" />
      <Stack.Screen name="library/[category]" />
      <Stack.Screen name="place/[id]" />
      <Stack.Screen name="machine/[id]" />
      <Stack.Screen name="workout/builder" />
      <Stack.Screen name="workout/preview" />
      <Stack.Screen name="workout/session" />
      <Stack.Screen name="workout/complete" />
      <Stack.Screen name="progress" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="legal/[doc]" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ToastProvider>
      <AuthProvider>
        <PlacesProvider>
          <WorkoutsProvider>
            <StatusBar style="light" />
            <RootNavigator />
          </WorkoutsProvider>
        </PlacesProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
