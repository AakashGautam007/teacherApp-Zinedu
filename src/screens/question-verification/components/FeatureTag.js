import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/feature-tag";

const FeatureTag = ({
  style,
  textStyle,
  text,
  selectedFeature,
  setSelectedFeature,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.difficultyLevelContainer,
        style,
        selectedFeature == text ? styles.selected : null,
      ]}
      onPress={() => setSelectedFeature(text)}
    >
      <Text
        style={[
          styles.text,
          textStyle,
          selectedFeature == text ? styles.selectedText : null,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default FeatureTag;
