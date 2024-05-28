import React, { useState } from 'react';
import { getAuthUser } from '../api';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


  const save = async (userData) =>{
    try{
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    }
    catch(err){
      console.log("error occured while trying to store user details")
    }
  }
  const removeSavedUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData')

    } catch(e) {
      console.log("error trying to remove previous user data",e)
    }
  }


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    removeSavedUserData()
    getAuthUser(email, password)
    .then((response) => {
      console.log(response)
      save(response)
      setError(null)
    })
    .catch((error)=>{
      console.log("ERROR",error)
      setError("Login failed - please check your username and password are correct")
    })




  };

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
