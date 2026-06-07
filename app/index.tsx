import { View, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/colors';

// All routing is handled by the auth guard in app/_layout.tsx.
// This screen just shows a spinner while auth state resolves.
export default function Index() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F0', alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={Colors.green} />
    </View>
  );
}
