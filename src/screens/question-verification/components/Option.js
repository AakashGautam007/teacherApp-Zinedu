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
import OptionTag from "./OptionTag";

const Option = ({ item, index }) => {
  const { option, html, prevQuestionHtml, isFillUps } = item;
  // console.log({ item })
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {isFillUps ? "Correct Answer" : getOptionName(index)}
      </Text>

      <OptionTag verify={true} style={styles.tag} />

      <View style={styles.borderContainer}>
        {/* <Text style={styles.questionText}>A stem, that’s the question i.e. a problem or an incomplete statement - Make sure that you create a crisp, grammatically error-free and simple stem which has relevant information.</Text> */}
        {/* <View style={{ width: width * 0.75 }}> */}
        {/* <MathJax
                    style={{
                        opacity: 0.99,
                        minHeight: 1,
                        width: width * 0.75,
                        alignItems: "center",
                        alignSelf: "center",
                    }}
                    content={html}
                /> */}
        {/* </View> */}

        <View
          style={{
            width: width * 0.75,
          }}
        >
          <MathJax content={html} />
        </View>
      </View>

      <OptionTag verify={false} style={styles.tag} />
      <View style={styles.borderContainer}>
        {/* <Text style={styles.questionText}>Haier</Text> */}
        <View
          style={{
            width: width * 0.75,
          }}
        >
          <MathJax content={prevQuestionHtml} />
        </View>
      </View>
    </View>
  );
};

export default Option;
