import { Redirect } from 'expo-router';

export default function Index() {
  // In a real app, check AsyncStorage for onboarding completion
  // For demo purposes, always show onboarding first
  return <Redirect href="/(onboarding)/welcome" />;
}
