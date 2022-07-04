import { Dimensions, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../redux/store";

export const { width, height } = Dimensions.get("window");

export const ENDPOINT = `https://ap.zinedu.com`;
export const SMSENDPOINT = `https://sms.zinedu.com`; //production
// export const SMSENDPOINT = `https://smss.zinedu.com`//staging
// export const SMSENDPOINT = `https://smsd.zinedu.com`//qa

//For Testing Staging Base `https://apstaging.zinedu.com/`;

//Production Base `https://ap.zinedu.com/`;

//Dot Net Base `http://nadmin.zinedu.com/`;

//For Dev Base `https://dev.zinedu.com/`;

//For UAT BASE `https://studyuat.zinedu.com/`;
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
