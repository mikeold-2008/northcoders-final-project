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
        
        <TouchableOpacity
        style={styles.accountButton}
        onPress={() => navigation.navigate('MyAccountScreen')}
      >
             <Text style={styles.accountButtonText}>My Account</Text>
      </TouchableOpacity>
      
        <View>
          <Text style={styles.title}>

            {userFirstName}'s New Challenges 🎯 
            
            </Text>
            <View style={styles.imageContainer}>
            <Image source={require('../assets/fire.png')} style={styles.image}
            />
            </View>
    
        
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AgainstFriend')}>
                    <Text style={styles.buttonText}>Against friend</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateSoloChallenge')}>
                    <Text style={styles.buttonText}>   Against self  </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
  };


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f5f5f5',
//         marginBottom: 0,
//       },
//       title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 80,
//         textAlign: 'center',
//       },
//       subtitle: {
//         fontSize: 18,
//         color: '#555',
//     },
//       button: {
//         backgroundColor: '#6495ED',
//         paddingVertical: 15,
//         paddingHorizontal: 100,
//         borderRadius: 10,
//         marginVertical: 10,
//         width: '100%',
//         alignItems: 'center',
//       },
//       buttonText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#fff',
//       },
//       accountButton: {
//         backgroundColor: '#6495ED',
//         top: -20,
//         left: 100,
//         paddingVertical: 15,
//         paddingHorizontal: 30,
//         borderRadius: 10,
//         marginVertical: 10,
//         alignItems: 'center',
//         width: '45%',
//       },
//       accountButtonText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff',
//       },
//       image: {
//         width: 260,
//         height: 380,
//         alignItems: 'center',
//         // aspectRatio: 2 / 3,
//       },
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002131',
    paddingHorizontal: 20, 
    paddingBottom: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40, 
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    backgroundColor: '#6495ED',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
    marginVertical: 20, 
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  accountButton: {
    backgroundColor: '#6495ED',
    top: -20,
    left: 100,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: '45%',
  },
  accountButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  image: {
    width: 260,
    height: 380,
    alignItems: 'center',
    marginBottom: 40, 
  },
  imageContainer: {
    alignItems: 'center', 
  },
});



  export default NewChal