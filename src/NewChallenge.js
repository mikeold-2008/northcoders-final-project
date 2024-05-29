import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Alert, Image, TouchableOpacity } from 'react-native';
import MyAccountButton from './MyAccount';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsers } from '../api';


const NewChal = ({navigation}) => {

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
            
    <Button title={`My Account`}
          onPress={() => navigation.navigate('MyAccountScreen')} /> 

        <View>
          <Text style={styles.title}>
          {'\n'}
            {'\n'}
            {userFirstName}'s New Challenges 🎯  {'\n'}
            {'\n'}
            
            {/* <Button
        onPress={() => { alert('Button pressed!'); }}
        title="Against Random"
      /> */}
        </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AgainstFriend')}>
                    <Text style={styles.buttonText}>Against friend</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateSoloChallenge')}>
                    <Text style={styles.buttonText}>Against self</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
      },
})

  export default NewChal