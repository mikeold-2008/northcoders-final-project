import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import MyAccountButton from './MyAccount';
import SoloUserCallenge from './SoloCurrentChallenge';


  const PersonalChallengeButton = ({ score, status, onPress }) => {
    return (
      <View style={styles.container}>
        <MyAccountButton onPress={() => navigation.navigate('MyAccount')} />
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>My Personal Challenge</Text>
          <Text style={styles.scoreText}>Score: {score}</Text>
          <Text style={styles.statusText}>Status: {status}</Text>
        </TouchableOpacity>
        <SoloUserCallenge />
      </View>
    );
  };

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100,
    },
    buttonText: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    scoreText: {
      color: '#fff',
      fontSize: 20,
      marginBottom: 5,
    },
    statusText: {
      color: '#fff',
      fontSize: 20,
    },
    usernameButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      },
      usernameText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
  });


  export default PersonalChallengeButton;