import React, { useEffect, useState } from "react";
import { TextInputMask } from "react-native-masked-text";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  Pressable,
} from "react-native";
import MyAccountButton from "./MyAccount";
import axios from "axios";
import Dropdown from "./Dropdown";

const RecentWorkout = () => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [addActivity, setAddActivity] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [km, setKm] = useState(0);
  const [exerciseName, setExerciseName] = useState("");

  const [userId, setUserId] = useState(null);

  const load = async () => {
    try {
      let id = await AsyncStorage.getItem("userData");
      setUserId(JSON.parse(id).id);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submitActivity = () => {
    axios
      .patch(
        `https://trailblaze-api-prod.onrender.com/activities/user/${userId}`,
        {
          exercise_name: exerciseName,
          user_id: userId,
          duration: duration,
          completed_at: date,
        }
      )
      .then((newlyAddedActivity) => {
        setRecentActivities([...recentActivities, newlyAddedActivity]);
      });
  };

  const handleAddActivity = () => {
    setAddActivity(true);
  };

  useEffect(() => {
    axios
      .get(`https://trailblaze-api-prod.onrender.com/activities/user/10`)
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
      distance={`${item.distance} km`}
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
        <View>
          <Text style={styles.title}>History</Text>
          {/* <MyAccountButton onPress={() => navigation.navigate("MyAccount")} /> */}
          {recentActivities.length ? (
            <FlatList
              style={{ flex: 1, width: 380, marginLeft: 20 }}
              data={recentActivities}
              renderItem={renderItem}
              keyExtractor={(item) => item.activity_id}
            />
          ) : null}

          <TouchableOpacity onPress={openModal}>
            <Text
              style={{
                backgroundColor: "#6495ED",
                fontSize: 20,
                textAlign: "center",
                width: 380,
                marginLeft: 20,
                padding: 10,
                marginTop: 30,
                color: "white",
                fontWeight: "bold",
              }}
            >
              + Add Workout
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <SafeAreaView>
            <View style={styles.newActivityContainer}>
              <View style={styles.newActivityProperty}>
                <Dropdown
                  setExerciseName={setExerciseName}
                  exerciseName={exerciseName}
                />
              </View>
              <View style={styles.newActivityProperty}>
                <Text>Km</Text>
                <TextInput
                  onChangeText={(text) => setKm(text)}
                  placeholder="0"
                  style={styles.distanceInput}
                ></TextInput>
              </View>
              <View style={styles.newActivityProperty}>
                <Text>Date</Text>
                <TextInputMask
                  stype={styles.textInputMask}
                  type={"datetime"}
                  options={{ format: "MM/DD/YYYY" }}
                  placeholder={"MM/DD/YYYY"}
                  value={date}
                  placeholderTextColor="grey"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    setDate(text);
                  }}
                />
              </View>

              <View style={styles.newActivityProperty}>
                <Text>Time</Text>
                <TextInputMask
                  style={styles.textInputMask}
                  type={"datetime"}
                  options={{ format: "HH:mm:ss" }}
                  placeholder={"HH:mm:ss"}
                  value={duration}
                  placeholderTextColor="grey"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    setDuration(text);
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(210, 230, 255)" : "lightblue",
              },
              styles.wrapperCustom,
            ]}
            onPress={() => {
              Alert.alert("worked out added");
            }}
          >
            <Text style={{ fontSize: 15, color: "#fff" }}>FINISH</Text>
          </Pressable>
          <TouchableOpacity onPress={closeModal} style={styles.cancel}>
            <Text style={{ color: "red", fontSize: 15 }}>CANCEL</Text>
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
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 20,
    color: "#6495ED",
  },
  distanceInput: {
    fontSize: 20,
    color: "blue",
    borderWidth: 2,
    margin: 10,
  },
  //history each workout is an item
  item: {
    borderWidth: 2,
    marginBottom: 8,
    paddingLeft: 5,
    borderRadius: 4,
    paddingBottom: 5,
    paddingTop: 5,
  },
  cancel: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "lightpink",
  },
  finish: {
    alignItems: "center",
    padding: 10,
  },
  wrapperCustom: {
    paddding: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  textInputMask: {
    borderColor: "black",
    alignItems: "center",
    backgroundColor: "yellow",
    marginBottom: 10,
    padding: 10,
  },

  newActivityContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  newActivityProperty: {
    height: 100,
    width: 300,
  },
});

export default RecentWorkout;
