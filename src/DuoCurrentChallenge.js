import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDuo,PatchTwoPersonChallengeProgress, PatchTwoPersonChallengeWinner } from '../api';

const DuoChallenge = () => {
    const [userId, setUserId] = useState(null);
    const [duoChallenge, setDuoChallenge] = useState(null);
    const [challengeId,setChallengeId] = useState(null)
    const [yourProgress, setYourProgress] = useState(null)
    const [opponentProgress,setOpponentProgress] = useState(null)
    const [opponentName, setOpponentName] = useState(null)
    const [steps, setSteps] = useState(0);
    const [spritePosition, setSpritePosition] = useState(0)

    const handleMove = () => {
    const newSteps = parseInt(steps, 10);
    const newPosition = (newSteps / 10) * 100;
    setSpritePosition(newPosition);
    console.log(challengeId,userId)
    PatchTwoPersonChallengeProgress(challengeId,userId,newSteps)
    .then((response)=>{
        console.log(response)
        setYourProgress((currProgress)=>{
            return currProgress + newSteps
        })
    })
    .catch((error)=>{
        console.log(error)
    })

}

    const loadUserId = async () => {
        try {
            const id = await AsyncStorage.getItem("userData");
            setUserId(JSON.parse(id).id)
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDuoUser = async () => {
        try {
            const response = await getDuo(userId);
            setDuoChallenge(response);
            console.log(response)
            setChallengeId(response[0].dual_challenge_id)
            if(response[0].challenge_proposer_id===userId){
                setYourProgress(response[0].challenge_proposer_progress)
                setOpponentProgress(response[0].challenge_accepter_progress)
                setOpponentName(response[0].challenge_accepter_name)
            }
            else if(response[0].challenge_accepter_id===userId){
                setYourProgress(response[0].challenge_accepter_progress)
                setOpponentProgress(response[0].challenge_proposer_progress)
                setOpponentName(response[0].challenge_proposer_name)
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadUserId(); 
    }, []);

    useEffect(() => {
        if (userId) {
            fetchDuoUser(); 
        }
    }, [userId]);
    
    if (!duoChallenge) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            {duoChallenge.map((duo,index) => 
            {
                console.log(duo.exercise_name)
                return (<>
                <Text style={styles.text}>{duo.challenge_proposer_name} vs. {duo.challenge_accepter_name}
                </Text>
                <Text key={index} style={styles.text}>
                    Exercise: {duo.exercise_name}</Text>
                <Text style={styles.text}>Your score: {yourProgress}km {" "} | {" "} {opponentName}'s score: {opponentProgress}km</Text> </>)
            })
            }
            
            <ImageBackground 
        source={require('../assets/track.jpg')}
        style={styles.background}
        >
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
});

export default DuoChallenge;
