import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function Phoenix() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../phoenix-cc0.gif')} 
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
    width: 100,
    height: 100,
  },
});

export default Phoenix;

