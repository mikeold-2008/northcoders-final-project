import React, { useState } from 'react';
import { getAuthUser } from '../api';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


  const save = async (userData) =>{
    try{
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    }
    catch(err){
      throw err;
    }
  }
  const removeSavedUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData')

    } catch(err) {
      throw err;
    }
  }


const LoginForm = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    removeSavedUserData()
    getAuthUser(email, password)
    .then((response) => {
      save(response)
      setError(null)
      navigation.navigate('Dashboard')
    })
    .catch((error)=>{
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
