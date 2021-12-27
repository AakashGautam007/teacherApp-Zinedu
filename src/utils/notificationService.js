import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENDPOINT} from './config'


export async function requestUserPermission(token) {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken(token)
  }
}

const postToken = async (tokenFcm,token) =>{
  console.log('in post fcm Token:',token,' fcemtoke :',tokenFcm)
  try{
    var formdata1 = new FormData();
    formdata1.append('fcm_token',`${tokenFcm}`)
    const response = await fetch(`${ENDPOINT}/users/add-fcm-token/`,{
      headers:{
        'Content-Type':'multipart/form-data',
        'Accept':'application/json',
        'Authorization':`Token ${token}`
      },
      method:'POST',
      body:formdata1,
    })
    const D = await response.json()
    console.log(D)
  }catch(err){
    console.log(err,'post fcm err')
  }
}

const getFcmToken = async(token) => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log(fcmToken," the old Token")
    
    if(!fcmToken){
        try{
            const fcmToken = await messaging().getToken()
            if(fcmToken){
                console.log(fcmToken," the new token")
                await AsyncStorage.setItem('fcmToken',fcmToken)
              postToken(fcmToken,token)
            }
        }catch(err){
            console.log(err," error in fcmToken")
        }
    }else{
      postToken(fcmToken,token)
    }
}

export const notificationListner = async() =>{
  messaging().onNotificationOpenedApp(remoteMessage=>{
    console.log('Notifications caused app to open from background state',remoteMessage.notification)
  })

  messaging().onMessage(async remoteMessage=>{
    console.log('recieved in foreground',remoteMessage)
  })

  messaging().getInitialNotification().then(remoteMessage=>{
    if(remoteMessage){
      console.log('notifications caused app to open from quit state',remoteMessage.notification)
    }
  })
}