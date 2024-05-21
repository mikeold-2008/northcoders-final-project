import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Leaderboard = () => {
    const data = [
        { id: 1, name: 'Player1', score: 100 },
        { id: 2, name: 'Player2', score: 90 },
        { id: 3, name: 'Player3', score: 80 },
        { id: 4, name: 'Player4', score: 70 },
        { id: 5, name: 'Player5', score: 60 },
      ];


  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
    <View style={styles.topComponent}>
      <Text style={styles.title}>Weekly Leaderboard</Text>
    </View>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
    />
  </View>
);
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 20,
  },
  score: {
    fontSize: 18,
  },
  topComponent: {
    backgroundColor: 'lightblue',
    padding: 20,
    fontSize: 50,
  },

});

export default Leaderboard;