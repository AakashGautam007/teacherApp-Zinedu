import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENDPOINT, width } from "../../utils/config";
import dateFormat from "dateformat";
import ClassCard from "../common/ClassCard";
import { useAuthFields } from "../../AppUtils/hooks/useAuthFields";
import HeaderComponent from "../../components/HeaderComponent";
import { STYLES } from "../../appStyles";

const PastLiveClasses = ({ navigation }) => {
  const { userToken, userName: username } = useAuthFields();
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const getSchedule = async () => {
    console.log("inside GETTTtttttttttttttttttt");

    // const userToken = await AsyncStorage.getItem('userToken')
    // const username = await AsyncStorage.getItem('userName')
    console.log(username, userToken);
    const response1 = await fetch(
      `${ENDPOINT}/users/get-user-id-base-on-username/?username=${username}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        method: `GET`,
      }
    );
    const D1 = await response1.json();

    console.log("Sattdouegdievdiouhekdjgeogdeodbe", D1.payload.user_id);

    const response = await fetch(
      `${ENDPOINT}/student/get-live-class-for-a-faculty/?is_upcoming=false&faculty_user_id=${D1.payload.user_id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        method: `GET`,
      }
    );
    const D = await response.json();
    if (response.ok) {
      // if (D.status === false) {
      //   alert(D.payload.message);
      // } else {
      //   console.log(D.payload.liveclasses, "Past classes data");
      //   setData(D.payload.liveclasses);
      // }

      if (D?.payload?.liveclasses) {
        console.log(D.payload.liveclasses, "Past classes data");
        setData(D.payload.liveclasses);
      } else {
        alert(D?.payload?.message);
      }
    } else {
      alert("Some error occured");
    }

    setIsLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    // setIsLoading(true)
    setRefreshing(true);
    getSchedule();
  };

  useEffect(() => {
    if (isFocused) {
      getSchedule();
    }
  }, [isFocused]);

  if (isLoading) {
    // if(isLoading){
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (data.length == 0) {
    return (
      <SafeAreaView
      style={STYLES.safeAreaContainer}
      >
        <HeaderComponent
          text="Past Classes"
          onPress={navigation.goBack}
        />
        <View style={styles.container}>
          <Text style={{ fontSize: 16 }}>No Past Classes!!!!!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={STYLES.safeAreaContainer}
    >
      <HeaderComponent
        text="Past Classes"
        onPress={navigation.goBack}
      />
      <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item, i }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("PastLiveClassInfo", { item })}
              >
                <ClassCard item={item} isPastClassPage={true} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => `${item.live_class_id}`}
        />
    </SafeAreaView>
  );
};

export default PastLiveClasses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    color: "black",
    paddingVertical: 1.8,
  },
});
