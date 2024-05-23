import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Alert, Image } from 'react-native';
import getUsers from '../api';


const UserDetails = () => {
    const [users, setUsers] = useState([]);
useEffect(() => {
    getUsers()
    .then(response => {
        console.log(response)
        setUsers(response)
    })
    .catch(error => {
        (error)
    });
}, []);

return (
    <Text>User List</Text>
)

}


export default UserDetails;