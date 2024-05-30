import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Alert, View, Text, StyleSheet } from "react-native";

const Dropdown = (props) => {
  const { setExerciseName, exerciseName } = props;
  // const [selectedValue, setSelectedValue] = useState("");
  const placeholder = { label: "Hiking", value: "hiking" };
  const options = [
    { label: "Running", value: "running" },
    { label: "Cycling", value: "cycling" },
    { label: "Walking", value: "walking" },
  ];
  return (
    <View>
      <Text style={styles.text}>Work out</Text>
      <RNPickerSelect
        placeholder={placeholder}
        items={options}
        onValueChange={(value) => {
          setExerciseName(value);
        }}
        value={exerciseName}
        style={styles.dropdown}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
});

export default Dropdown;
