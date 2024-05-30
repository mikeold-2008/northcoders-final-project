import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import MyAccountButton from './MyAccount';
import SoloUserCallenge from './SoloCurrentChallenge';
import CardApp from './dummyData';


  const PersonalChallengeButton = ({ score, status, onPress, navigation }) => {

return (
  
  <View style={styles.container}>
    <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SoloCurrentChallenge')}>
        <Text style={styles.buttonText}>Current Solo Challenge</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CurrentDuoChallenge')}>
        <Text style={styles.buttonText}>Current Duo Challenge</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ExerciseCards')}>
        <Text style={styles.buttonText}>Current Synced Data</Text>
      </TouchableOpacity>
    </View>
    

    <TouchableOpacity style={styles.accountButton} onPress={() => navigation.navigate('MyAccountScreen')}>
      <Text style={styles.buttonText}>My Account</Text>
    </TouchableOpacity> 
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#002131',
},
row: {
  flexDirection: 'row',
  marginBottom: 10,
},
accountButton: {
  backgroundColor: '#6495ED',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',
},
button: {
  backgroundColor: '#007bff',
  padding: 20,
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 10,
},
buttonText: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
},
card: {
  padding: 20,
  marginBottom: -100,
}
});

export default PersonalChallengeButton;