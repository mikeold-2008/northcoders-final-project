import React from 'react';
import UserDetails from './getUsersComponent';
import { View, Text, StyleSheet, SafeAreaView, Button, Alert, Image, TouchableOpacity } from 'react-native';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Phoenix from './Phoenix';
import { getUsers } from '../api';
import BottomTab from './BottomButton';


const Dashboard = ({ navigation }) => {
    const [userId,setUserId] = useState(null)
    const [userFirstName, setUserFirstName] = useState("")

    const load = async () =>{
        try{
          let id = await AsyncStorage.getItem("userData")
          setUserId(JSON.parse(id).id)
          let data = await getUsers(JSON.parse(id).id)
          setUserFirstName(data.firstName)
        }
        catch(err){
          alert(err)
        }
    }

    useEffect(()=>{
        load()
    },[])

  return (


    <SafeAreaView style={styles.container}>
      <Text style={styles.whiteText}>Welcome {userFirstName}!</Text>
     
      <Text>{'\n'}</Text>
      <Phoenix />
      <Text>{'\n'}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RecentWorkout')}>
        <Text style={styles.buttonText}>Submit Recent Workout 🏃‍♂️</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PersonalChallengeButton')}>
        <Text style={styles.buttonText}>My Current Challenges 🏃‍♀️</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewChal')}>
        <Text style={styles.buttonText}>Start new challenge 🎯</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Leaderboard')}>
        <Text style={styles.buttonText}>Leaderboard 🏆</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyAccountScreen')}>
        <Text style={styles.buttonText}>{`${userFirstName}'s account 🔐`}</Text>
      </TouchableOpacity>
    </SafeAreaView>
    
  );
};
<BottomTab />
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002131',
    marginBottom: 0,
  },
  whiteText: {
    color: '#fff',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#6495ED',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Dashboard;