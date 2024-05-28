import React, {useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, Button } from 'react-native';

const AgainstSelfScreen = () => {
const [steps, setSteps] = useState(0);
const [spritePosition, setSpritePosition] = useState(0)

const handleMove = () => {
    const newSteps = parseInt(steps, 10);
    const newPosition = (newSteps / 70000) * 100;
    setSpritePosition(newPosition);

}



  return (

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
  );
};

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
    },
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontSize: 30,
    },

sprite: { width: 100, 
    height: 100, 
    position: 'absolute',
    top: '70%', 
    transform: [{ translateX: -50 }, { translateY: -50 }],
    },
    text: {
        color: 'black',
        fontSize: 40,
        position: 'absolute',
        top: 100,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -400,
      },
      input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        width: 150,
      },
  });


export default AgainstSelfScreen;