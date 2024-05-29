import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import WeeklyStepChallenge from '../components/WeeklyStepChallenge';

const MyAccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>
      {/* <WeeklyStepChallenge /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default MyAccountScreen;