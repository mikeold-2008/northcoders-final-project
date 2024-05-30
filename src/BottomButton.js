import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomButton from './BottomButton'; 
const home = require('./assets/Home.png');
const heart = require('./assets/fire.png');
const plus = require('./assets/Plus.png');
const calendar = require('./assets/Calender.png');
const profile = require('./assets/User.png');

const BottomTab = () => (
  <View style={styles.container}>
    <BottomButton image={home} />
    <BottomButton image={heart} />
    <BottomButton
      image={plus}
      style={styles.plusButton}
    />
    <BottomButton image={calendar} />
    <BottomButton image={profile} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    marginHorizontal: 25,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#EDEDED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  plusButton: {
    position: 'absolute',
    left: '43%',
    top: -25,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
  },
});

export default BottomTab;
