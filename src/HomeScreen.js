import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
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

<SafeAreaView style={styles.container}>
  <View>
<View style={styles.header}>
  <Text style={styles.headerText}>Welcome to TrailBlaze </Text>
  <Text style={styles.subHeaderText}>Here to help you start your fitness journey</Text>
</View>
<Phoenix />
<Text {...userId}/>
<Text>
{'\n'}
{'\n'}</Text>
</View>
<View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
    <Text style={styles.buttonText}>Sign up 📝</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
    <Text style={styles.buttonText}>Login 🔓</Text>
  </TouchableOpacity>

</View>
</SafeAreaView>
);  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#002131',
      padding: 20,
    },
    header: {
      marginBottom: 170,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 40,
      marginTop: 30
    },
    subHeaderText: {
      fontSize: 20,
      color: '#fff',
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#6495ED',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginVertical: 10,
      width: '85%',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
})



export { HomeScreen };

