import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Alert,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import MyAccountButton from "./MyAccount";
import axios from "axios";
import Dropdown from "./Dropdown";
import { inline } from "react-native-web/dist/cjs/exports/StyleSheet/compiler";

const RecentWorkout = () => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [addActivity, setAddActivity] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newActivity, setNewActivity] = useState({});

  const handleAddActivity = () => {
    setAddActivity(true);
  };

  useEffect(() => {
    axios
      .get("https://trailblaze-api-prod.onrender.com/activities/user/2")
      .then((fetchedActivity) => {
        setRecentActivities(fetchedActivity.data);
      });
  }, []);

  const Item = ({ exercise_name, distance, created_at }) => (
    <View key={created_at} style={styles.item}>
      <Text>{created_at.substring(0, 10)}</Text>
      <Text>{exercise_name}</Text>
      <Text>{distance}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      exercise_name={item.exercise_name}
      distance={`${item.distance / 1000} km`}
      created_at={item.created_at}
    />
  );

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>History</Text>
        <MyAccountButton onPress={() => navigation.navigate("MyAccount")} />

        {recentActivities.length ? (
          <FlatList
            data={recentActivities}
            renderItem={renderItem}
            keyExtractor={(item) => item.activity_id}
          />
        ) : null}

        <TouchableOpacity onPress={openModal}>
          <Text>+ Add Exercises touchable opacity</Text>
        </TouchableOpacity>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <SafeAreaView>
            <Text>Add new workout</Text>
            <View style={styles.newActivityContainer}>
              <View style={styles.newActivityProperty}>
                <Dropdown />
              </View>
              <View style={styles.newActivityProperty}>
                <Text>km</Text>
                <TextInput
                  placeholder="km"
                  style={styles.textInput}
                ></TextInput>
              </View>
              <View style={styles.newActivityProperty}>
                <Text>Time</Text>
                <TextInput
                  placeholder="time"
                  style={styles.textInput}
                ></TextInput>
              </View>
            </View>
          </SafeAreaView>
          <Button
            title="Finish"
            onPress={() => {
              Alert.alert("worked out added");
            }}
          />
          <TouchableOpacity onPress={closeModal}>
            <Text>Cancle</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginBottom: 100,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
  },
  textInput: {
    fontSize: 18,
    color: "blue",
    borderWidth: 2,
    margin: 10,
  },
  item: {
    borderWidth: 2,
    marginBottom: 8,
  },
  // newActivityContainer: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "flex-start",
  // },
  // newActivityProperty: {
  //   height: 100,
  // },
});

export default RecentWorkout;
