import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postSolo } from '../api';


const CreateSoloChallenge = ({ onChallenge }) => {
    const [userId, setUserId] = useState(null);
    const [exerciseName, setExerciseName] = useState('walking');
    const [duration, setDuration] = useState(7);
    const [distance, setDistance] = useState(70000);
    const [message, setMessage] = useState('');


    const loadUserId = async () => {
        try {
            const id = await AsyncStorage.getItem("userData");
            setUserId(JSON.parse(id).id)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadUserId();
    }, []);


    const handleSoloChallenge = async () => {
        try {
            await postSolo(userId, exerciseName, duration, distance);
            setMessage('Challenge created');
            onChallenge();
        } catch (error) {
            setMessage('challenge failed to start');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topComponent}>
                <Text {...message}/>
                <Text style={styles.title}>Set Challenge Details!</Text>
            </View>
            <Button title="Challenge" onPress={handleSoloChallenge} />
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
        title: {
            fontSize: 20,
            fontWeight: 'bold',
        },
    });

    export default CreateSoloChallenge