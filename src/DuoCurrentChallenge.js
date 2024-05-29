import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDuo } from '../api';

const DuoChallenge = () => {
    const [userId, setUserId] = useState(null);
    const [duoChallenge, setDuoChallenge] = useState(null);

    const [steps, setSteps] = useState(0);
    const [spritePosition, setSpritePosition] = useState(0)

    const handleMove = () => {
    const newSteps = parseInt(steps, 10);
    const newPosition = (newSteps / 70000) * 100;
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

    const fetchDuoUser = async () => {
        try {
            const response = await getDuo(userId);
            setDuoChallenge(response);
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
                </>)
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

export default DuoChallenge;
