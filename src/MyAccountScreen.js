import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppleHealthKit from 'react-native-health';

const MyAccountScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const loadUserData = async () => {
    try {
      let id = await AsyncStorage.getItem("userData");
        setUserId(JSON.parse(id).id);
        let data = await getUsers(JSON.parse(id).id);
        setUserFirstName(data.firstName)
        setUserLastName(data.lastName)
        setUserEmail(data.email)
      
    } catch (error) {
      Alert.alert("Error", "Failed to load user data");
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const requestHealthKitPermissions = () => {
    const permissions = {
      permissions: {
        read: [AppleHealthKit.Constants.Permissions.HeartRate],
        write: [AppleHealthKit.Constants.Permissions.Steps],
      },
    };

    AppleHealthKit.initHealthKit(permissions, (error) => {
      if (error) {
        Alert.alert('Error', 'Cannot grant permissions!');
      } else {
        Alert.alert('Success', 'HealthKit permissions granted successfully!');
      }
    });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>
      <Text style={styles.summaryText}>Name: {userFirstName} {userLastName}</Text>
      <Text style={styles.summaryText}>Email: {userEmail}</Text>

      <TouchableOpacity onPress={requestHealthKitPermissions} style={styles.button}>
        <Text style={styles.buttonText}>Connect Health</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002131',
    marginBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff'
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff'
  },
  healthKitButton: {
    backgroundColor: '#87CEEB',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    backgroundColor: '#6495ED',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '85%',
    alignItems: 'center',
  }
});

export default MyAccountScreen;
