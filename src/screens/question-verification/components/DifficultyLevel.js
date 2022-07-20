import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/difficulty-level";

const DifficultyLevel = ({ style, textStyle, text, index, selectedLevel }) => {
  return (
    <TouchableOpacity
      style={[
        styles.difficultyLevelContainer,
        style,
        text == selectedLevel ? styles.selected : null,
      ]}
    >
      <Text
        style={[
          styles.text,
          textStyle,
          text == selectedLevel ? styles.selectedText : null,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default DifficultyLevel;
