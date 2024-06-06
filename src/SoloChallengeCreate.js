import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postSolo } from '../api';
import DropDownPicker from 'react-native-dropdown-picker';


const CreateSoloChallenge = () => {
    const [user_id, setUser_id] = useState(null);
    const [exerciseName, setExerciseName] = useState('walking');
    const [duration, setDuration] = useState(7);
    const [distance, setDistance] = useState(0);
    const [message, setMessage] = useState('');

    const loadUserId = async () => {
        try {
            const id = await AsyncStorage.getItem("userData");
            if (id) {
                setUser_id(JSON.parse(id).id);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadUserId();
    }, []);

    const handleSoloChallenge = async () => {
        if (!user_id) {
            setMessage('User ID not loaded');
            return;
        }
        try {
            await postSolo(user_id, exerciseName, duration, distance);
            setMessage('Challenge created');
        } catch (error) {
            throw error;
        }
    };


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(exerciseName);
    const [items, setItems] = useState([
      { label: 'Walking', value: 'Walking' },
      { label: 'Running', value: 'Running' },
      { label: 'Cycling', value: 'Cycling' },
    ]);

    useEffect(() => {
        setExerciseName(value);
    }, [value]);

    return (
        <View style={styles.container}>
            <View style={styles.topComponent}>
                <Text>{message}</Text>
                <Text style={styles.title}>Set Challenge Details!</Text>
            </View>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
            <TextInput
                style={styles.input}
                placeholder="Distance (km)"
                value={String(distance)}
                onChangeText={(text) => setDistance(Number(text))}
                keyboardType="numeric"
            />
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

export default CreateSoloChallenge;
