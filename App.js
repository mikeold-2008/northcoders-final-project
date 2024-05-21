import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, RecentWorkout } from './src/HomeScreen';
import SignUpForm from './src/Signup';
import LoginForm from './src/Login';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Fitness App Home' }}
          containerStyle={styles.screenContainer}
        />
        <Stack.Screen
          name="RecentWorkout"
          component={RecentWorkout}
          options={{ title: 'Recent Workout' }}
          containerStyle={styles.screenContainer}
        />
           <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{ title: 'LoginForm' }}
          containerStyle={styles.screenContainer}
        />
          <Stack.Screen
          name="Signup"
          component={SignUpForm}
          options={{ title: 'SignUpForm' }}
          containerStyle={styles.screenContainer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
});


