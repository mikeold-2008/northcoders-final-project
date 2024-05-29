import React from 'react';
import UserDetails from './getUsersComponent';
import { View, Text, StyleSheet, SafeAreaView, Button, Alert, Image } from 'react-native';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Phoenix from './Phoenix';
import { getUsers } from '../api';


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


    return (<>
      <View style={styles.container}>
        <Text style={styles.whiteText}>Welcome {userFirstName}!</Text>
        <Text>
  {'\n'}
  {'\n'}</Text>
      <Phoenix />
      <Text>
  {'\n'}</Text>
  <Button title={'Submit Recent Workout 🏃‍♂️'}
          onPress={() => navigation.navigate('RecentWorkout')} />
  
  <Button title={'My Current Challenges 🏃‍♀️'}
          onPress={() => navigation.navigate('PersonalChallengeButton')} />
  
   <Button title={'Start new challenge 🎯'}
          onPress={() => navigation.navigate('NewChal')} />
  
  <Button title={'Leaderboard 🏆'}
          onPress={() => navigation.navigate('Leaderboard')} /> 
  
  
  <Button title={`${userFirstName}'s account 🔐`}
          onPress={() => navigation.navigate('MyAccount')} /> 
  
  </View></>
  )
  
  }
  
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#002131',
          marginBottom: 100
          
        },
        whiteText: {
          color: '#fff',
          fontSize: 20,
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 10,
        },
        subtitle: {
          fontSize: 18,
          color: '#000000',
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
        color: '#000000',
      },
  })
  
  
  
  export default Dashboard