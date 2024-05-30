import React from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const cycle = require('./assets/cycle.png');
const walk = require('./assets/walk.png');
const yoga = require('./assets/yoga.png');

const Card = ({ data, index }) => {
  return (
    <View
      style={{
        flex: 1,
        width: 120, 
        height: 180,
        padding: 10,
        backgroundColor: data.color,
        justifyContent: 'space-between',
        marginHorizontal: 8,
        borderRadius: 10,
        shadowColor: 'lightgrey',
        shadowOffset: { width: -5, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      }}
    >
      <Image source={data.image} style={{ height: 25, width: 25 }} />
      <View style={{ alignSelf: 'center', margin: 5 }}>
        <Progress.Circle
          size={50}
          progress={data.status / 100}
          showsText
          unfilledColor="#ededed"
          borderColor="#ededed"
          color={data.darkColor}
          direction="counter-clockwise"
          fill="white"
          strokeCap="round"
          thickness={5}
          style={{
            shadowColor: 'grey',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 1,
          }}
          textStyle={{
            fontSize: 16,
            fontFamily: 'Poppins-Bold',
            fontWeight: 'bold',
          }}
        />
      </View>
      <View>
        <Text style={{ fontSize: 10, fontFamily: 'Poppins-Light' }}>{'Day     1'}</Text>
        <Text style={{ fontSize: 10, fontFamily: 'Poppins-Light' }}>{'Time   20 min'}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontFamily: 'Poppins-Regular' }}>{data.name}</Text>
        <View
          style={{
            backgroundColor: data.lightColor,
            padding: 2,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 10, color: 'white' }}>Next</Text>
        </View>
      </View>
    </View>
  );
};

const CardApp = () => {
  const data = [
    {
      name: 'Cycling',
      status: 85,
      image: cycle,
      lightColor: '#f8e4d9',
      color: '#fcf1ea',
      darkColor: '#fac5a4',
    },
    {
      name: 'Walking',
      status: 25,
      image: walk,
      lightColor: '#d7f0f7',
      color: '#e8f7fc',
      darkColor: '#aceafc',
    },
    {
      name: 'Yoga',
      status: 85,
      image: yoga,
      lightColor: '#dad5fe',
      color: '#e7e3ff',
      darkColor: '#8860a2',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <Card key={index} data={item} index={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002131',
    paddingTop: -100,
  },
});

export default CardApp;
