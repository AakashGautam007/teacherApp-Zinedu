import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/difficulty-level-modal";

const DifficultyLevelModal = ({
  style,
  textStyle,
  text,
  index,
  selectedDifficulty,
  setSelectedDifficulty,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.difficultyLevelContainer,
        style,
        selectedDifficulty == index + 1 ? styles.selected : null,
      ]}
      onPress={() => setSelectedDifficulty(index + 1)}
    >
      <Text
        style={[
          styles.text,
          textStyle,
          selectedDifficulty == index + 1 ? styles.selectedText : null,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default DifficultyLevelModal;
