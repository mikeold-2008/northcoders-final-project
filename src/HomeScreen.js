import React from 'react';
import UserDetails from './getUsersComponent';
import { View, Text, StyleSheet, SafeAreaView, Button, Alert, Image } from 'react-native';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [userId,setUserId] = useState(null)

  const load = async () =>{
    try{
      let id = await AsyncStorage.getItem("userData")
      setUserId(JSON.parse(id).id)
    }
    catch(err){
      alert(err)
    }
  }

  useEffect(()=>{
    load()
  },[])
  // const [userId, setUserId] = useState(null)

  // useEffect(()=>{
  //   let id = AsyncStorage.getItem("userData")
  //   setUserId(id)
  // },[])


  return (

    <View style={styles.container}>

<Button title={'Sign up'}
        onPress={() => navigation.navigate('Signup')} />

<Button title={'Login'}
        onPress={() => navigation.navigate('Login')} />

        <Text style={styles.title}>Welcome to TrailBlaze {userId}</Text>
        <Text style={styles.subtitle}>Here to help you start your fitness journey</Text>
      
        <Text>UserDetails</Text>
        
        <Button title={'Submit Recent Workout'}
        onPress={() => navigation.navigate('RecentWorkout')} />

<Button title={'My Current Challenges'}
        onPress={() => navigation.navigate('PersonalChallengeButton')} />

 <Button title={'Start new challenge'}
        onPress={() => navigation.navigate('NewChallenge')} />

<Button title={'Weekly/friends leaderboards'}
        onPress={() => navigation.navigate('Leaderboard')} /> 
    </View>

    
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
})



export { HomeScreen };

