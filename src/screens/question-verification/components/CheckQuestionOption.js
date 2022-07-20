import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import MathJax from "../../../components/MathJax";
import { width } from "../../../utils/config";
import styles from "../styles/option";
import { getOptionName } from "../utils";
import Tag from "./Tag";

const CheckQuestionOption = ({ item, index }) => {
  const { html, selected, isFillUps } = item;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {isFillUps ? "Correct Answer" : getOptionName(index)}
      </Text>

      <View style={[styles.borderContainer, { marginTop: 10 }]}>
        {/* <Text style={styles.questionText}>A stem, that’s the question i.e. a problem or an incomplete statement - Make sure that you create a crisp, grammatically error-free and simple stem which has relevant information.</Text> */}
        <View
          style={{
            width: width * 0.75,
          }}
        >
          <MathJax content={html} />
        </View>
      </View>
    </View>
  );
};

export default CheckQuestionOption;
