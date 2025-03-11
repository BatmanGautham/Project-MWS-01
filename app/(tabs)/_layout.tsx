import React from 'react';
import { Stack } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

export default function RootLayout() {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Handle back button press
        // You can use router.back() to navigate back
        return false; // Return false to allow default back behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide the header for all screens
        contentStyle: { backgroundColor: 'black' },
      }}
    >
      <Stack.Screen name="index" /> {/* This is your home screen */}
      <Stack.Screen name="Learn" />
      <Stack.Screen name="Speak" />
      <Stack.Screen name="Review" />
      <Stack.Screen name="Profile" />

    </Stack>
  );
}


// import React from 'react';
// import { Tabs } from 'expo-router';
// import { Feather } from '@expo/vector-icons';
// import { useFocusEffect } from '@react-navigation/native';
// import { BackHandler } from 'react-native';

// import { View, Text, StyleSheet, Image, Platform } from 'react-native';


// export default function TabsLayout() {
//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         BackHandler.exitApp(); // Exit app when on main navigation
//         return true;
//       };

//       BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//     }, [])
//   );

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         // tabBarStyle: { height: 0 }, // Hide the tab bar

//         tabBarStyle: styles.tabBar,
//         tabBarActiveTintColor: '#0066FF',
//         // tabBarInactiveTintColor: '#666666',
//         // tabBarLabelStyle: styles.tabBarLabel,
//       }}
//     >
//       {/* Define the 5 tab screens */}
//       <Tabs.Screen
//         name="Home"
//         options={{
//           title: 'Home',
//           href: null,
//         }}
//       />
//       <Tabs.Screen
//         name="Learn"
//         options={{
//           title: 'Learn',
//           tabBarIcon: ({ color, size }) => (
//             <Feather name="book" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Speak"
//         options={{
//           title: 'Speak',
//           tabBarIcon: ({ color, size }) => (
//             <Feather name="message-circle" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Review"
//         options={{
//           title: 'Review',
//           tabBarIcon: ({ color, size }) => (
//             <Feather name="trending-up" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Profile"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color, size }) => (
//             <Feather name="user" size={size} color={color} />
//           ),
//         }}
//       />

//       {/* Define other screens without the tab bar */}
//       <Tabs.Screen
//         name="Home1"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />
//       <Tabs.Screen
//         name="q1"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />
//       <Tabs.Screen
//         name="q2"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />
//       <Tabs.Screen
//         name="star2q1"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />
//       <Tabs.Screen
//         name="star2q2"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />
//       <Tabs.Screen
//         name="qn1"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />
//       <Tabs.Screen
//         name="qn2"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />
//       <Tabs.Screen
//         name="qn3"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />

//       <Tabs.Screen
//         name="quiz"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />

//       <Tabs.Screen
//         name="German"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />
//       <Tabs.Screen
//         name="English"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />
//       <Tabs.Screen
//         name="Spanish"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />
      
//       <Tabs.Screen
//         name="Welcome"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />

            
//       <Tabs.Screen
//         name="explore"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />

            
//       <Tabs.Screen
//         name="GameList"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />

// <Tabs.Screen
//         name="Learnvid"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />

// <Tabs.Screen
//         name="qwriting"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />

// <Tabs.Screen
//         name="Crossword"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />


// <Tabs.Screen
//         name="Fact_Index"
//         options={{
//           href: null, // Hide from the tab bar
//         }}
//       />




      
// <Tabs.Screen
//   name="Frenchvid1"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />

// <Tabs.Screen
//   name="resturantchat"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />

// <Tabs.Screen
//   name="Learnwithai"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />

// <Tabs.Screen
//   name="SpeakScreen"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />

// <Tabs.Screen
//   name="admin"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />

// <Tabs.Screen
//   name="MatchThePair"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />

// <Tabs.Screen
//   name="TabNavigator"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />

// <Tabs.Screen
//   name="Learnwithaifood"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />

// <Tabs.Screen
//   name="add-video"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />

// <Tabs.Screen
//   name="Facts_French"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />

// <Tabs.Screen
//   name="admin/login"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />

// <Tabs.Screen
//   name="index"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />

// <Tabs.Screen
//   name="ProfileScreen"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />



// <Tabs.Screen
//   name="admin/dashboard"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />



// <Tabs.Screen
//   name="/admin/edit-quiz"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />

// <Tabs.Screen
//   name="admin/edit-quiz"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />

// <Tabs.Screen
//   name="SpeakingPractice"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />

// <Tabs.Screen
//   name="Facts_French/[id]"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />


// <Tabs.Screen
//   name="admin/add-video"
//   options={{
//     href: null, // Hide from the tab bar
//   }}
// />


//     </Tabs>
    
//   );
// }
// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: '#F0657A',
//     height: Platform.OS === 'ios' ? 85 : 60,
//     paddingBottom: Platform.OS === 'ios' ? 20 : 8,
//     paddingTop: 8,
//     borderTopWidth: 1,
//     borderTopColor: '#2b3940',
//   },
//   tabBarLabel: {
//     fontSize: 12,
//     fontWeight: '500',
//   },
// });