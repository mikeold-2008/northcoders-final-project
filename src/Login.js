import React, { useState } from 'react';
import { getAuthUser } from '../api';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//AsyncStorage



  const save = async (userData) =>{
    try{
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    }
    catch(err){

    }
  }


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  //dont need password as state

  const handleLogin = () => {
    console.log(email, password)
    getAuthUser(email, password)
    .then((response) => {
      // console.log(response)
      // const userData = JSON.stringify(response);
          //  console.log("user data before setting storage: ",userData)
          save(response)
    // AsyncStorage.setItem('userData', JSON.stringify(userData));

      setError(null)
    })
    // event.preventDefault();
    // onLogin(email, password);
    
  };

  //may need to add in something here for storing user data locally

  return (

    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        required
      />
      <Button title="Login" onPress={handleLogin} />
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  });
  



export default LoginForm;
