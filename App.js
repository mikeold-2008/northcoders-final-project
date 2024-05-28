import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './src/HomeScreen';
import RecentWorkout from './src/RecentWorkout';
import SignUpForm from './src/Signup';
import LoginForm from './src/Login';
import Leaderboard from './src/Leaderboard';
import Dashboard from './src/Dashboard'
import PersonalChallengeButton from './src/CurrentChallenges';
import MyAccountButton from './src/MyAccount';
import NewChal from './src/NewChallenge';
import AgainstSelfScreen from './src/AgainstSelf';

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
         <Stack.Screen
          name="Leaderboard"
          component={Leaderboard}
          options={{ title: 'Leaderboard' }}
          containerStyle={styles.screenContainer}
        />
           <Stack.Screen
          name="PersonalChallengeButton"
          component={PersonalChallengeButton}
          options={{ title: 'PersonalChallengeButton' }}
          containerStyle={styles.screenContainer}
        />
           <Stack.Screen
          name="MyAccountButton"
          component={MyAccountButton}
          options={{ title: 'MyAccountButton' }}
          containerStyle={styles.screenContainer}
        />
        <Stack.Screen
          name="NewChal"
          component={NewChal}
          options={{ title: 'New Challenge' }}
          containerStyle={styles.screenContainer}
        />
        <Stack.Screen 
        name="AgainstSelf" 
        component={AgainstSelfScreen} />
                    
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: 'Dashboard' }}
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


