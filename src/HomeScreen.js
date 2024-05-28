import React from 'react';
import UserDetails from './getUsersComponent';
import { View, Text, StyleSheet, SafeAreaView, Button, Alert, Image } from 'react-native';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Phoenix from './Phoenix';

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

  return (

    <View style={styles.container}>

<Phoenix />
<Button title={'Sign up'}
        onPress={() => navigation.navigate('Signup')} />

<Button title={'Login'}
        onPress={() => navigation.navigate('Login')} />

        <Text style={styles.title}>Welcome to TrailBlaze </Text>
        
        <Text style={styles.subtitle}>Here to help you start your fitness journey</Text>
        
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

