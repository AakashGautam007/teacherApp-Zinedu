import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { typography } from "../../appStyles";
// import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window");

export default function SignUp({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{ position: "absolute", top: height * 0.1, left: width * 0.1 }}
        >
          <Text
            style={{
              fontSize: 30,
              color: "#1C3687",
              fontFamily: typography.montserrat_700,
              padding: 2,
            }}
          >
            Sign up
          </Text>
          <Text
            style={{
              fontSize: 17,
              color: "#6A7180",
              fontFamily: typography.montserrat_400,
              padding: 2,
            }}
          >
            To create account
          </Text>
        </View>

        <View>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#6A7180"
            style={styles.textinp}
          />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#6A7180"
            style={styles.textinp}
          />
          <TextInput
            placeholder="Enter Mobile No."
            placeholderTextColor="#6A7180"
            style={styles.textinp}
          />
          <TextInput
            placeholder="Email Id"
            placeholderTextColor="#6A7180"
            style={styles.textinp}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#6A7180"
            style={styles.textinp}
          />
          <TextInput
            placeholder="City"
            placeholderTextColor="#6A7180"
            style={styles.textinp}
          />
        </View>

        <View style={{ paddingTop: 50 }}>
          <LinearGradient
            colors={["#00AEEF", "#1C3687"]}
            style={{ borderRadius: 8 }}
          >
            <TouchableOpacity
              style={{
                width: width * 0.85,
                height: 48,
                justifyContent: "center",
                borderRadius: 8,
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
                Create Account
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "baseline",
              padding: 20,
            }}
          >
            <Text
              style={{ fontSize: 16, fontFamily: typography.montserrat_400 }}
            >
              Already have an account?
            </Text>
            <Button
              title="Login"
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width,
    height,
  },
  textinp: {
    width: width * 0.85,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#DADFEB",
    textAlign: "left",
    marginTop: 20,
    fontFamily: typography.montserrat_400,
  },
  smallbutton: {},
});
