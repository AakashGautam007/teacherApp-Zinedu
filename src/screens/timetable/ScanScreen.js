import React, { useState } from "react";

import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Alert,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

// import CameraKitCameraScreen
import { CameraScreen } from "react-native-camera-kit";
import { TouchableOpacity } from "react-native-gesture-handler";
import { width } from "../../utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENDPOINT } from "../../utils/config";
import { useAuthFields } from "../../AppUtils/hooks/useAuthFields";

export default function ScanScreen({ navigation, route }) {
  const { item } = route.params;
  const { userToken } = useAuthFields();
  const [foundUrl, setUrlFound] = useState("");
  const [isScanning, setIsScanning] = useState(true);
  const [isUpload, setIsUpload] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");
  const getUpload = async () => {
    setIsUpload(true);
    // const userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken, " token");
    console.log(item, "liveClassID");
    var formdata = new FormData();
    formdata.append("class_notes", foundUrl);
    var requestOptions = {
      redirect: "follow",
      method: "POST",
      body: formdata,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${userToken}`,
      },
    };
    const response = await fetch(
      `${ENDPOINT}/teacher/upload-notes-byqr/${item}/`,
      requestOptions
    );
    const D = await response.json();
    if (response.ok) {
      setUploadDone(true);
      setIsUpload(false);
      setFinalMessage(D.Success);
      if (D.Error != undefined) {
        Alert.alert(`${D.Error}`);
      }
      if (D.message != undefined) {
        Alert.alert(`${D.message}`);
      }
    } else {
      if (D.Error != undefined) {
        Alert.alert(`${D.Error}`);
      }
      if (D.message != undefined) {
        Alert.alert(`${D.message}`);
      }
      setUploadDone(false);
      setFinalMessage(D.Error);
      setIsUpload(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isScanning == true ? (
        <CameraScreen
          // ref={(ref) => (this.camera = ref)}
          // cameraType={CameraType.Back} // front/back(default)
          actions={{ rightButtonText: "Done", leftButtonText: "Cancel" }}
          scanBarcode={true}
          onBottomButtonPressed={(event) => {}}
          onReadCode={(event) => {
            setIsScanning(false);
            setUrlFound(event.nativeEvent.codeStringValue);
          }} // optional
          showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
          laserColor="red" // (default red) optional, color of laser in scanner frame
          frameColor="white" // (default white) optional, color of border of scanner frame
        />
      ) : (
        <View style={{ marginHorizontal: 20 }}>
          {uploadDone == false ? (
            <View>
              {isUpload == false ? (
                <TouchableOpacity
                  onPress={() => {
                    getUpload();
                  }}
                  style={{
                    width: width * 0.8,
                    backgroundColor: "orange",
                    padding: 20,
                    margin: 10,
                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text>Upload Now</Text>
                </TouchableOpacity>
              ) : (
                <ActivityIndicator
                  size={"large"}
                  color="orange"
                ></ActivityIndicator>
              )}
            </View>
          ) : (
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {finalMessage}
            </Text>
          )}
          <Text>{item}</Text>
          <Text>{foundUrl}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  textStyle: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: "white",
    backgroundColor: "green",
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: "white",
    textAlign: "center",
  },
  textLinkStyle: {
    color: "blue",
    paddingVertical: 20,
  },
});
