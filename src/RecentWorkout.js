import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Alert, Image } from 'react-native';
import MyAccountButton from './MyAccount';

const RecentWorkout = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>
            Welcome to Recent Workout
          </Text>
          <MyAccountButton onPress={() => navigation.navigate('MyAccount')} />
          <Button
            title="Submit recent workout"
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
        marginBottom: 100
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

  export default RecentWorkout