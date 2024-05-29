import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postDuo } from '../api';

const CreateDuoChallenge = ({ onChallenge }) => {
    const [proposerId, setProposerId] = useState(null);
    const [acceptorId, setAcceptorId] = useState('');
    const [exerciseName, setExerciseName] = useState('walking');
    const [duration, setDuration] = useState(7);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const loadUserId = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                setProposerId(JSON.parse(userData).id);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadUserId();
    }, []);

    const handleDuoChallenge = async () => {
        try {
            await postDuo(proposerId, acceptorId, exerciseName, duration);
            setMessage('');
            setError('');
            onChallenge();
        } catch (error) {
            setMessage('');
            setError('Challenge sent successfully!');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topComponent}>
                {error ? (
                    <Text style={{ color: 'red' }}>{error}</Text>
                ) : (
                    <Text style={{ color: 'green' }}>{message}</Text>
                )}
                <Text style={styles.title}>Set Challenge Details!</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Acceptor Id"
                value={acceptorId}
                onChangeText={setAcceptorId}
            />
            <Button title="Challenge" onPress={handleDuoChallenge} />
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

export default CreateDuoChallenge;
