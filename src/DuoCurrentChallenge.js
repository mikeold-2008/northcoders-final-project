import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDuo } from '../api';

const DuoChallenge = () => {
    const [userId, setUserId] = useState(null);
    const [duoChallenge, setDuoChallenge] = useState(null);

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
            {duoChallenge.map((duo) => {
                console.log(duo.exercise_name)
                return<Text style={styles.text}>
                    Exercise: {duo.exercise_name}</Text>})
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

export default DuoChallenge;
