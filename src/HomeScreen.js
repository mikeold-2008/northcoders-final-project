import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Alert } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to TrailBlaze</Text>
        <Text style={styles.subtitle}>Here to help you start your fitness journey</Text>
        <Button title={'Submit Recent Workout'}
        onPress={() => navigation.navigate('RecentWorkout')} />
    </View>
  );
};

const RecentWorkout = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>
            Welcome to Recent Workout
          </Text>
          <Button
            title="Press me"
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
      </SafeAreaView>
    );
  };



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 18,
        color: '#555',
    },
})



export { HomeScreen, RecentWorkout };

//submit recent workout
//my current challenges
//start new challenge
//weekly/friends leaderboards
//my account