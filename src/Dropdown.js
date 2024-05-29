import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Text } from "react-native";

const Dropdown = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const placeholder = { label: "select an activity", value: "" };
  const options = [
    { label: "Running", value: "running" },
    { label: "Cycling", value: "cycling" },
    { label: "Walking", value: "walking" },
  ];
  return (
    <View>
      <Text>Select an activity</Text>
      <RNPickerSelect
        placeholder={placeholder}
        items={options}
        onValueChange={(value) => setSelectedValue(value)}
        value={selectedValue}
      />
      {selectedValue && <Text>Selected: {selectedValue}</Text>}
    </View>
  );
};

export default Dropdown;
