import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function BG() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/BG.png')} 
        style={styles.gif} 
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: 300,
    height: 100,
  },
});

export default BG;