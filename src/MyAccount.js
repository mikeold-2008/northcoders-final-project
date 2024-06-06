import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

    const MyAccountButton = ({ navigation }) => {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('MyAccountScreen')} style={styles.button}>
            <Text style={styles.buttonText}>My Account</Text>
          </TouchableOpacity>
        </View>
      );
    };

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#87CEEB',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default MyAccountButton;

