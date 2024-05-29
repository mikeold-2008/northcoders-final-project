import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Alert, Image } from 'react-native';
import MyAccountButton from './MyAccount';

const NewChal = ({navigation}) => {
    return (
      <SafeAreaView style={styles.container}>
            <MyAccountButton onPress={() => navigation.navigate('MyAccount')} />

        <View>
          <Text style={styles.title}>
          {'\n'}
            {'\n'}
            New Challenge {'\n'}
            {'\n'}
            
            <Button
        onPress={() => { alert('Button pressed!'); }}
        title="Against Random"
      />
       <Button
        onPress={() => navigation.navigate('AgainstFriend')}
        title="Against friend"
      />

<Button
        title="Against self"
        onPress={() => navigation.navigate('CreateSoloChallenge')}
      />
          </Text>
        </View>
      </SafeAreaView>
    );
  };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        marginBottom: 100
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 18,
        color: '#555',
    },
})

  export default NewChal