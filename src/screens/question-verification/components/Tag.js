import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/tag";

const Tag = ({ style, textStyle, text }) => {
  return (
    <View style={[styles.tagContainer, style]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

export default Tag;
