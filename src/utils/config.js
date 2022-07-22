import { Dimensions, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../redux/store";

export const { width, height } = Dimensions.get("window");

//For Testing Staging Base 
// export const ENDPOINT = `https://apstaging.zinedu.com`;

//Production Base 
// export const ENDPOINT = `https://ap.zinedu.com`;

//Dot Net Base 
// export const ENDPOINT = `http://nadmin.zinedu.com`;

//For Dev Base 
export const ENDPOINT = `https://apdev.myclassroom.digital`;

//For UAT BASE 
// export const ENDPOINT = `https://studyuat.zinedu.com`;

//For QA 
// export const ENDPOINT = `https://apqa.zinedu.com`;

// export const SMSENDPOINT = `https://sms.zinedu.com`; //production
// export const SMSENDPOINT = `https://smss.zinedu.com`//staging
export const SMSENDPOINT = `https://smsd.zinedu.com`//qa


export const postAnalytics = async (page, logout) => {
    var formdata = new FormData();
    try {
        // const token = await AsyncStorage.getItem("userToken");
        const token = store?.getState()?.authReducer?.userToken
        console.log("Token :", token);
        formdata.append("page_name", page);
        var requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
                Authorization: "Token " + token,
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
        };
        const response = await fetch(
            `${ENDPOINT}/users/post-analytics/`,
            requestOptions
        );
        if (response.status === 401) {
            logout();
            Alert.alert("you're logged into another device");
        }
        const D = await response.json();
        console.log(D);
    } catch (error) {
        console.error(error);
    }
};
