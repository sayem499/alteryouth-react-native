/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopBar from './components/TopBar';

// Dummy screens for demonstration
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function StudentScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Student Screen</Text>
    </View>
  );
}

function ScholarshipScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Student Screen</Text>
    </View>
  );
}

function SchoolScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Student Screen</Text>
    </View>
  );
}

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={[styles.container, backgroundStyle]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {/* TopBar always at the top */}
        <View style={styles.topBar}>
          <TopBar />
        </View>
        {/* Bottom Tab Navigator takes the rest of the space */}
        <View style={styles.content}>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarStyle: { height: 60, backgroundColor: '#fff' },
              tabBarLabelStyle: ({ focused }) => ({
                fontSize: 9,
                color: focused ? '#1dc468' : '#ccc',  // Change color based on focus state
                textTransform: 'uppercase',
              }),
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: string = 'home-outline'; 

                // Define icon names based on the route
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline'; // Active icon vs. inactive icon
                } else if (route.name === 'Student') {
                  iconName = focused ? 'person' : 'person-outline';
                } else if (route.name === 'Scholarship') {
                  iconName = focused ? 'school' : 'school-outline';
                } else if (route.name === 'School') {
                  iconName = focused ? 'business' : 'business-outline';
                }

                return (
                  <Ionicons
                    name={iconName}
                    size={size}
                    color={focused ? '#1dc468' : '#ccc'}
                    style={{ fontFamily: 'Ionicons' }}
                  />
                );
              },
              tabBarActiveTintColor: '#1dc468',  // Set active icon and label color
              tabBarInactiveTintColor: '#ccc',   // Set inactive icon and label color
              headerShown: false,
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Student" component={StudentScreen} />
            <Tab.Screen name="Scholarship" component={ScholarshipScreen} />
            <Tab.Screen name="School" component={SchoolScreen} />
          </Tab.Navigator>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 60, // Adjust height as needed for your TopBar
    zIndex: 1, // Ensures TopBar stays above other content
  },
  content: {
    flex: 1, // Allows content to fill remaining space
  },
});

export default App;
