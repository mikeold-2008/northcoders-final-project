import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Switch } from 'react-native';
import { postSoloChallenge } from './api';

const SoloChallengeForm = ({ userId }) => {
    const [exerciseName, setExerciseName] = useState('');
    const [duration, setDuration] = useState('');
    const [distance, setDistance] = useState('');
    const [pass, setPass] = useState(false);
    const [error, setError] = useState(null);


const handleChallengeData = () => {
    setError(null)
}


// return (


// )

}