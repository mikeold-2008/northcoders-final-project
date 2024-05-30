import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function walk() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/walk.png')} 
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

export default walk;