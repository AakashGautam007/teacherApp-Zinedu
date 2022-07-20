import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { width, height, ENDPOINT } from "../../utils/config";
import { typography } from "../../appStyles";

export default function ForgetPassword({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState("");

  const requestOTP = async (mobileNumber) => {
    if (mobileNumber != "") {
      var formdata = new FormData();
      formdata.append("username", mobileNumber);

      var requestOptions = {
        method: "POST",
        body: formdata,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await fetch(
        `${ENDPOINT}/forgot-password-request/`,
        requestOptions
      );
      const D = await response.json();
      console.log(D);
      if (response.ok) {
        if (D.Success) {
          Alert.alert(`${D.Success}`);
          navigation.navigate("ResetPassword", { username: mobileNumber });
        } else if (D.Error) {
          Alert.alert(`${D.Error}`);
        }
      } else {
        Alert.alert(`${D.Error}`);
      }
    } else {
      Alert.alert("Enter Mobile Number");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>forget pass screen</Text> */}
      <TextInput
        placeholder="Mobile Number"
        placeholderTextColor="#6A7180"
        style={[styles.textinp, { fontFamily: typography.montserrat_400 }]}
        onChangeText={(text) => setMobileNumber(text)}
        value={mobileNumber}
        keyboardType="number-pad"
        autoCapitalize="none"
      />

      <TouchableOpacity
        onPress={() => requestOTP(mobileNumber)}
        style={{
          width: width * 0.8,
          height: 48,
          justifyContent: "center",
          borderRadius: 8,
          backgroundColor: "#EA7A26",
          marginTop: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 18,
            fontFamily: typography.montserrat_600,
          }}
        >
          Request OTP
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    width,
    height,
  },
  textinp: {
    width: width * 0.85,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#DADFEB",
    textAlign: "left",
    marginTop: 30,
  },
  smallbutton: {},
});
