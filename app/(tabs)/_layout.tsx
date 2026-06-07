import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(252,253,252,0.95)',
          borderTopColor: '#c6c6c8',
          borderTopWidth: 0.5,
          height: Platform.OS === 'ios' ? 83 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.green,
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: { fontSize: 10, fontWeight: '500', letterSpacing: 0.1 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'scan' : 'scan-outline'} size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'barbell' : 'barbell-outline'} size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-gym"
        options={{
          title: 'My Places',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'business' : 'business-outline'} size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={25} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
