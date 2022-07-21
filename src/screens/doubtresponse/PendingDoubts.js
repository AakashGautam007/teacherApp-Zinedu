import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  Dimensions,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from "react-native-svg";
import { width, height, ENDPOINT } from "../../utils/config";
import { useAuthFields } from "../../AppUtils/hooks/useAuthFields";
import { STYLES, typography } from "../../appStyles";
import HeaderComponent from "../../components/HeaderComponent";
// const {width,height} = Dimensions.get('window')

const PendingDoubts = ({ navigation }) => {
  const { userToken: token, userName: name } = useAuthFields();
  const isFocused = useIsFocused();

  const [data, setData] = useState([]);

  const a = async () => {
    // const name = await AsyncStorage.getItem('userName')
    // const token = await AsyncStorage.getItem('userToken')
    const response = await fetch(
      `${ENDPOINT}/support/get-alloted-doubts/?teacher_username=${name}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );

    const D = await response.json();
    console.log(D);
    setData(D);
  };

  useEffect(() => {
    if (isFocused) {
      a();
      console.log(data);
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={STYLES.container}>
      <HeaderComponent
        text="Pending Doubts"
        onPress={navigation.goBack}
      />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          {/* <Subject subject='Doubt 1' onPress={()=>navigation.navigate('DoubtsDetailsScreen')} />
    <Subject subject='Chemistry doubt' onPress={()=>navigation.navigate('DoubtsDetailsScreen')} />
    <Subject subject='Maths ch2' onPress={()=>navigation.navigate('DoubtsDetailsScreen')} /> */}

          {/* <Button title="open Doubt" onPress={()=>navigation.navigate('WannaAnsOrNot')}/> */}

          {data.map((item, i) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate("WannaAnsOrNot", { item })}
            >
              <View
                style={{
                  height: height * 0.16,
                  width: width * 0.9,
                  backgroundColor: i % 2 == 0 ? "#1C3687" : "#EB7926",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                  margin: 5,
                  borderRadius: 10,
                  flexDirection: "row",
                }}
              >
                <View style={{ flex: 1, flexDirection: "row" }}>
                  {i % 2 == 0 ? (
                    <Svg
                      width="90"
                      height="89"
                      viewBox="0 0 90 89"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Ellipse
                        opacity="0.07"
                        cx="26.5772"
                        cy="62.5"
                        rx="62.6822"
                        ry="62.5"
                        fill="white"
                      />
                    </Svg>
                  ) : null}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontFamily: typography.montserrat_700,
                      }}
                    >
                      Doubt No : {item.id}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontFamily: typography.montserrat_700,
                        fontSize: 19,
                      }}
                    >
                      {" "}
                      Doubt Status : {item.status}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontFamily: typography.montserrat_700,
                        fontSize: 19,
                      }}
                    >
                      {item.subject}
                    </Text>
                  </View>

                  {i % 2 != 0 ? (
                    <Svg
                      width="78"
                      height="83"
                      viewBox="0 0 78 83"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Ellipse
                        opacity="0.07"
                        cx="62.6822"
                        cy="62.5"
                        rx="62.6822"
                        ry="62.5"
                        fill="white"
                      />
                    </Svg>
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PendingDoubts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
