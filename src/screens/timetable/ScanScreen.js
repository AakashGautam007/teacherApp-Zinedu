import React, { useState } from "react";

import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from "react-native";

// import CameraKitCameraScreen
import { CameraScreen } from "react-native-camera-kit";

export default function ScanScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CameraScreen
        // ref={(ref) => (this.camera = ref)}
        // cameraType={CameraType.Back} // front/back(default)
        actions={{ rightButtonText: "Done", leftButtonText: "Cancel" }}
        scanBarcode={true}
        onBottomButtonPressed={(event) => {}}
        onReadCode={(event) => Alert.alert("QR code found")} // optional
        showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
        laserColor="red" // (default red) optional, color of laser in scanner frame
        frameColor="white" // (default white) optional, color of border of scanner frame
      />
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
