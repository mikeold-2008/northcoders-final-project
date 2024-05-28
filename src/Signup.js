import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { getAuthUser, postUser } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpForm = ({  navigation  }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('')
  const [loggedInAuth,setLoggedInAuth] = useState(false)


  const saveUser = async (userData) =>{
    try{
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    }
    catch(err){

    }
  }

  const removeSavedUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData')

    } catch(e) {
      console.log("error trying to remove previous user data",e)
    }
  }



  function validateInput(email,password,firstName,lastName){
    let errString = ""

    if(!email || !password || !firstName || !lastName){
      errString = errString+"All fields are required - please fill in the missing data. "
      setError(errString)
      return false
    }
    if(email){
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if(!emailRegex.test(email)){
        errString = errString+"Please enter a valid email address. "
        setError(errString)
        return false
      }
    }
    if(password.length < 8){
      errString = errString+"Passwords must be a minimum of 8 characters. "
      setError(errString)
      return false
    }

    setError(errString)
    if(errString===""){
      return true
    }
    return false
  }





  const handleSignUp = () => {
    const valid = validateInput(email,password,firstName,lastName)
    if(valid){
    const userData = {
      "email": email,
      "password": password,
      "firstName": firstName,
      "lastName": lastName
      }
    postUser(userData)
    .then((response)=>{
      setError('')
    })
    .then(()=>{
      removeSavedUserData()
      getAuthUser(email,password)
      .then((response)=>{
        saveUser(response)
        setLoggedInAuth(true)
        navigation.navigate('Dashboard')
      })
      .catch((error)=>{
        console.log(error)
      })
    })
    .catch((error)=>{
      setError(error.response.data.error)
    })
  }
  };

  return (   
    <View style={styles.container}>
        <View style={styles.topComponent}>
      <Text style={styles.title}>Sign up below to access TrailBlaze</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password (min. 8 characters)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      {error}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  topComponent: {
    backgroundColor: 'lightblue',
    padding: 20,
  },
});

export default SignUpForm;