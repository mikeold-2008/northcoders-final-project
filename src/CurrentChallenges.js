import React from 'react';
import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';



  const PersonalChallengeButton = ({ score, status, onPress, navigation }) => {

return (
  
  <SafeAreaView style={styles.container}>
      {/* <CardApp style={styles.card}/>  */}
    
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SoloCurrentChallenge')}>
        <Text style={styles.buttonText}>Current Solo Challenge</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CurrentDuoChallenge')}>
        <Text style={styles.buttonText}>Current Vs. Challenge</Text>
      </TouchableOpacity>
    

  </SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#002131',
  marginBottom: 0,
},
accountButton: {
  backgroundColor: '#6495ED',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',
},
button: {
  backgroundColor: '#6495ED',
  paddingVertical: 15,
  paddingHorizontal: 30,
  borderRadius: 10,
  marginVertical: 10,
  width: '85%',
  alignItems: 'center',
  justifyContent: 'center',
},
buttonText: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
}
});

export default PersonalChallengeButton;