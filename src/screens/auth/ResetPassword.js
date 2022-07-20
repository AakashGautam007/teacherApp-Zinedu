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
import { typography } from "../../appStyles";
import { width, height, ENDPOINT } from "../../utils/config";

export default function ResetPassword({ navigation, route }) {
  const { username } = route.params;

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = async (newPassword, confirmPassword, otp) => {
    if (newPassword === confirmPassword) {
      var formdata = new FormData();
      formdata.append("password1", newPassword);
      formdata.append("password2", confirmPassword);

      var requestOptions = {
        method: "POST",
        body: formdata,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await fetch(
        `${ENDPOINT}/forgot-password/${otp}/${username}/`,
        requestOptions
      );
      const D = await response.json();
      console.log(D);
      if (response.ok) {
        if (D.Success) {
          Alert.alert(`${D.Success}`);
          navigation.navigate("Login");
        } else {
          Alert.alert(`${D.Error}`);
        }
      } else {
        Alert.alert(`${D.detail}`);
      }
    } else {
      Alert.alert("Password Did not match");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>forget pass screen</Text> */}
      <TextInput
        placeholder="OTP"
        placeholderTextColor="#6A7180"
        style={[styles.textinp, { fontFamily: typography.montserrat_400 }]}
        onChangeText={(text) => setOtp(text)}
        value={otp}
        keyboardType="number-pad"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="New Password"
        placeholderTextColor="#6A7180"
        style={[styles.textinp, { fontFamily: typography.montserrat_400 }]}
        onChangeText={(text) => setNewPassword(text)}
        value={newPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#6A7180"
        style={[styles.textinp, { fontFamily: typography.montserrat_400 }]}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <TouchableOpacity
        onPress={() => {
          otp != "" && newPassword != "" && confirmPassword != ""
            ? resetPassword(newPassword, confirmPassword, otp)
            : Alert.alert("Empty feilds");
        }}
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
          Reset Password
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
