import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { ENDPOINT, width } from "../../utils/config";
import { useAuthFields } from "../../AppUtils/hooks/useAuthFields";
import { typography } from "../../appStyles";

const AddPpt = ({ navigation, route }) => {
  const { studio, idd } = route.params;
  const { userToken } = useAuthFields();

  const [doc, setDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });
    //   console.log(result.uri);
    //   console.log(result);
    if (!result.cancelled) {
      setDoc(result);
    }
  };

  const sendPpt = async () => {
    setIsLoading(true);
    console.log("send called", idd, studio, doc);
    // const userToken = await AsyncStorage.getItem('userToken')
    const newImageUri = "file:///" + doc.uri.split("file:/").join("");
    let formdata = new FormData();
    formdata.append("class_notes", {
      uri: newImageUri,
      name: doc.name,
      type: "*/*",
    });
    formdata.append("live_class", idd);
    formdata.append("studio_name", studio);

    const response = await fetch(`${ENDPOINT}/teacher/drive-notes-upload/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${userToken}`,
      },
      body: formdata,
    });
    const D = await response.json();
    setIsLoading(false);
    Alert.alert(`${D.Success}`);
    console.log(D);
  };

  // const addNotes = async () => {

  //     setIsUploading(true)

  //     const userToken = await AsyncStorage.getItem('userToken')

  //     const newImageUri =  "file:///" + doc.uri.split("file:/").join("");
  //     let formdata = new FormData();
  //     formdata.append('notes_file',{
  //         uri: newImageUri,
  //         name: 'doc.pdf',
  //         type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  //         })
  //     if(img===null){
  //         formdata.append("notes_icon",null)
  //     }else{
  //         formdata.append("notes_icon",{
  //           uri:img.uri,
  //           name:'my_img.jpg',
  //           type:'image/jpg'
  //         })
  //         }
  //     formdata.append('live_class_id',item.id)
  //     formdata.append('chapter',item.chapter_assoc.id)
  //     formdata.append('notes_desc',txt)

  //     const response = await fetch(`${ENDPOINT}/student/upload-live-class-notes/`,{
  //         body:formdata,
  //         method:'PUT',
  //         headers:{
  //             'Accept':'application/json',
  //             'Content-Type':'multipart/form-data',
  //             'Authorization': `Token ${userToken}`,
  //         }
  //     })
  //     const D = await response.json();
  //     console.log(D,'notes added')
  //     setMessage(D)
  //     if(response.ok){
  //         if(D.Success){
  //             Alert.alert(`${D.Success}`)
  //             // navigation.navigate('LiveClassInfo')
  //             setIsUploading(false)
  //             clearData()
  //             // setMessage(D)
  //         }else{
  //             Alert.alert(`${D}`)
  //             setIsUploading(false)
  //             // setMessage(D)
  //             clearData()
  //         }

  //     }
  //     else{
  //         Alert.alert('something went wrong')
  //         setIsUploading(false)
  //     }

  // }

  useEffect(() => {
    console.log(idd, "item", studio);
    // console.log(doc)
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {/* <Text>sdd</Text> */}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "60%",
            marginVertical: 10,
          }}
        >
          {/* <Button title="console" onPress={()=>console.log(doc)}/>  */}
          <Button title="add doc" onPress={pickDocument} />
          {doc != null && doc.type != "cancel" ? (
            <Ionicons name="checkmark" size={24} color="black" />
          ) : null}
        </View>
        {/* <Button title='send ppt' onPress={()=>doc!==null?sendPpt():Alert.alert('Add .ppt File')}/> */}

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              doc !== null ? sendPpt() : Alert.alert("Add .ppt File")
            }
            style={{
              padding: 10,
              paddingHorizontal: 15,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#EA7A26",
              borderRadius: 25,
              height: 42,
              marginVertical: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: typography.montserrat_600,
              }}
            >
              ADD PPT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddPpt;

const styles = StyleSheet.create({});
