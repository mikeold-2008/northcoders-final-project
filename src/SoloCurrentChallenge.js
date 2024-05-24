import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { getSolo } from '../api';

const SoloUserChallenge = () => {
    const [userId, setUserId] = useState(null);
    const [soloUser, setSoloUser] = useState(null);

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
            {soloUser.map((solo) => {
                console.log(solo.exercise_name)
                return<Text style={styles.text}>
                    Exercise: {solo.exercise_name}</Text>})
        }
            
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

