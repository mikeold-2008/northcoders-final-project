import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,  ImageBackground, Image, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { getSolo, PatchSoloChallengeProgress, PatchSoloChallengePass } from '../api';

const SoloUserChallenge = () => {
    const [userId, setUserId] = useState(null);
    const [soloUser, setSoloUser] = useState(null);
    const [distance, setDistance] = useState(0)
    const [challengeId, setChallengeId] = useState(null)
    const [progress, setProgress] = useState(null)
    const [challengePass,setChallengePass] = useState(null)

    const [steps, setSteps] = useState(0);
    const [spritePosition, setSpritePosition] = useState(progress)

    const handleMove = () => {
    const newSteps = parseInt(steps, 10);

    const newPosition = (newSteps / distance) * 100;
    setSpritePosition(newPosition);
    PatchSoloChallengeProgress(challengeId,newSteps)
    .then((response)=>{
        setProgress((currProgress)=>{
            return currProgress + newSteps
        })
    })
    .catch((err)=>{
        console.log(error)
    })
    if((progress+newSteps)>=distance){
        PatchSoloChallengePass(challengeId,true).then((response)=>{
            setChallengePass(true)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
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
            setDistance(response[0].distance)
            setChallengeId(response[0].challenge_id)
            setProgress(response[0].progress)
            setChallengePass(response[0].pass)
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
                    <Text style={styles.text}>Target: {distance} km</Text>
                    <Text style={styles.text}>Progress: {progress} km</Text>
                    </>)         
                })
            }
            {challengePass ? <Text style={styles.winText}>You passed the challenge!</Text> : <Text></Text> }


<ImageBackground 
    source={require('../assets/track.jpg')}
    style={styles.background}>
      <View style={styles.overlay}>
          <Image 
            source={require('../assets/Walking.png')} 
            style={[styles.sprite, { left: `${spritePosition}%` }]} 
          />
     <Text style={styles.text}>Enter the number of km you've walked!</Text>
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
    winText:{
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default SoloUserChallenge;

