import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import AppleHealthKit from 'react-native-health';

const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.HeartRate],
    write: [AppleHealthKit.Constants.Permissions.Steps],
  },
};

const HealthKitComponent = () => {
  const [heartRateSamples, setHeartRateSamples] = React.useState(null);
  const [error, setError] = React.useState(null);

  const requestPermissionsAndFetchData = () => {
    AppleHealthKit.initHealthKit(permissions, (initError) => {
      if (initError) {
        console.log('[ERROR] Cannot grant permissions!');
        setError('Cannot grant permissions!');
      } else {
        const options = {
          startDate: new Date(2020, 1, 1).toISOString(),
        };

        AppleHealthKit.getHeartRateSamples(options, (callbackError, results) => {
          if (callbackError) {
            console.log('[ERROR] Cannot get heart rate samples!');
            setError('Cannot get heart rate samples!');
          } else {
            console.log('Heart rate samples:', results);
            setHeartRateSamples(results);
          }
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Request Permissions and Fetch Heart Rate Data" onPress={requestPermissionsAndFetchData} />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {heartRateSamples && (
        <View style={styles.resultsContainer}>
          {heartRateSamples.map((sample, index) => (
            <Text key={index}>{`Heart Rate: ${sample.value} at ${sample.startDate}`}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
  resultsContainer: {
    marginTop: 20,
  },
});

export default HealthKitComponent;

