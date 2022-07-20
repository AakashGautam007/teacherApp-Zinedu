import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Picker from "@gregfrench/react-native-wheel-picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ENDPOINT, width } from "../../utils/config";
import { useAuthFields } from "../../AppUtils/hooks/useAuthFields";
import { typography } from "../../appStyles";

const Chapter = ({ navigation, route }) => {
  const { item } = route.params;
  const { userToken } = useAuthFields();

  const [chapter, setChapter] = useState([]);
  const [chapterModalVisible, setChapterModalVisible] = useState(false);
  const [chapterId, setChapterId] = useState("");
  const [chapterName, setChapterName] = useState("");

  const updateChapter = async (ch) => {
    // const userToken = await AsyncStorage.getItem('userToken')
    const formdata = new FormData();
    formdata.append("chapter", ch);
    const response = await fetch(
      `${ENDPOINT}/student/update-scheduled-live-class/${item.id}/`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${userToken}`,
        },
        method: `PUT`,
        body: formdata,
      }
    );
    const D = await response.json();
    console.log(D);
    if (response.ok) {
      Alert.alert(`${D.Success}`);
    } else {
      Alert.alert("something went wrong");
    }
  };

  const getChapters = async () => {
    // const userToken = await AsyncStorage.getItem('userToken')
    console.log(userToken, item.chapter_assoc.subject_assoc);
    var requestOptions = {
      redirect: "follow",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
    };
    const response = await fetch(
      `${ENDPOINT}/support/get-chapters/?subject=${item.chapter_assoc.subject_assoc.id}`,
      requestOptions
    );
    const D = await response.json();
    console.log(D);
    setChapter(D);
  };

  useEffect(() => {
    // console.log(item,'this item in tag')
    getChapters();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width,
          height: 70,
          paddingHorizontal: 30,
        }}
      >
        <Text style={{ fontFamily: typography.montserrat_400 }}>
          Select Chapter
        </Text>

        <TouchableOpacity
          onPress={() => {
            setChapterModalVisible(!chapterModalVisible);
            // setChapter(null)
            // setChapterId('')
          }}
        >
          <View
            style={{
              width: 180,
              height: 52,
              backgroundColor: "#ECECEC",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              padding: 2,
            }}
          >
            <Text style={{ fontFamily: typography.montserrat_400 }}>
              {chapterName}
            </Text>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={chapterModalVisible}
            onRequestClose={() => {
              setChapterModalVisible(!chapterModalVisible);
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 60,
              }}
            >
              <Button
                title="close"
                onPress={() => setChapterModalVisible(!chapterModalVisible)}
              />
              <ScrollView>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  {chapter.map((value, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => {
                        setChapterName(value.chapter_name);
                        setChapterId(value.id);
                        setChapterModalVisible(!chapterModalVisible);
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#ECECEC",
                          margin: 5,
                          marginHorizontal: 15,
                          padding: 5,
                          borderRadius: 10,
                        }}
                      >
                        <Text style={{ fontFamily: typography.montserrat_400 }}>
                          {value.chapter_name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </Modal>
        </TouchableOpacity>
      </View>

      <Button
        title="Update Chapter"
        onPress={() => {
          return chapterId != ""
            ? updateChapter(chapterId)
            : Alert.alert("Select a chapter First");
        }}
      />
    </View>
  );
};

export default Chapter;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
});
