import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Alert, Image } from 'react-native';
import { useState,useEffect } from 'react';
import { getUsers } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import WeeklyStepChallenge from '../components/WeeklyStepChallenge';

const MyAccountScreen = ({navigation}) => {
  const [userId,setUserId] = useState(null)
  const [userFirstName, setUserFirstName] = useState("")
  const [userLastName, setUserLastName] = useState("")
  const [userEmail, setUserEmail] = useState("")


  const removeSavedUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData')

    } catch(e) {
      console.log("error trying to remove previous user data",e)
    }
  }

  const load = async () =>{
    try{
      let id = await AsyncStorage.getItem("userData")
      setUserId(JSON.parse(id).id)
      let data = await getUsers(JSON.parse(id).id)
      setUserFirstName(data.firstName)
      setUserLastName(data.lastName)
      setUserEmail(data.email)
    }
    catch(err){
      alert(err)
    }
}

useEffect(()=>{
    load()
},[])


  const handleLogout = () =>{
    removeSavedUserData()
    navigation.navigate('Home')
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>
      <Text style={styles.summaryText}>Name: {userFirstName} {userLastName}</Text>
      <Text style={styles.summaryText}>Email: {userEmail} </Text>
      {/* <WeeklyStepChallenge /> */}



      <Button title='Logout' onPress={handleLogout} />
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
  summaryText:{
    fontSize: 24
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
});

export default MyAccountScreen;