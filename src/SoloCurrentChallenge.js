import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,  ImageBackground, Image, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { getSolo } from '../api';

const SoloUserChallenge = () => {
    const [userId, setUserId] = useState(null);
    const [soloUser, setSoloUser] = useState(null);

    const [steps, setSteps] = useState(0);
    const [spritePosition, setSpritePosition] = useState(0)

const handleMove = () => {
    const newSteps = parseInt(steps, 10);
    const newPosition = (newSteps / 10) * 100;
    setSpritePosition(newPosition);
}

    const loadUserId = async () => {
        try {
            const id = await AsyncStorage.getItem("userData");
            setUserId(JSON.parse(id).id)
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSoloUser = async () => {
        try {
            const response = await getSolo(userId);
            setSoloUser(response);
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadUserId(); 
    }, []);

    useEffect(() => {
        if (userId) {
            fetchSoloUser(); 
        }
    }, [userId]);
    
    if (!soloUser) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            {soloUser.map((solo,index) => {        
                console.log(solo.exercise_name)
                return (<><Text key={index} style={styles.text}>
                    Exercise: {solo.exercise_name}</Text>
                    <Text style={styles.text}>Target: {solo.distance} km</Text>
                    </>)
                    
                })
        }


<ImageBackground 
    source={require('../assets/track.jpg')}
    style={styles.background}>
      <View style={styles.overlay}>
          <Image 
            source={require('../assets/Walking.png')} 
            style={[styles.sprite, { left: `${spritePosition}%` }]} 
          />
     <Text style={styles.text}>Step Challenge!</Text>
      <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter steps"
              keyboardType="numeric"
              value={steps.toString()}
              onChangeText={text => setSteps(text)}
            />
            <Button title="Move" onPress={handleMove} />
          </View>
    </View>
    </ImageBackground>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    text: {
        fontSize: 18,
    },
});

export default SoloUserChallenge;

