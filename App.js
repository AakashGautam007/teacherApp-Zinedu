import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState,useMemo,useContext, useReducer} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, LogBox, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNav from './src/nav/DrawerNav'
// import Doubt from './src/screens/doubtresponse/Doubt'
import Login from './src/screens/auth/Login'
import {AuthContext} from './src/utils/context'
import {ENDPOINT} from './src/utils/config'
import InternetConnectionAlert from "react-native-internet-connection-alert";
import Toast from 'react-native-simple-toast';
import AuthStack from './src/nav/AuthStack';

LogBox.ignoreAllLogs();

export default function App() {


  const initaialLoginState={
    isLoading:true,
    userName:null,
    userToken:null,
  };
  
  const loginReducer =(prevState,action)=>{
    switch(action.type){
      case 'RETRIVE_TOKEN':
        return {...prevState,
        isLoading:false,
        userToken:action.token,
      };
      case 'SIGNIN':
        return {...prevState,
          userToken:action.token,
          userName:action.username,
          isLoading:false};
        case 'LOGOUT':
        return {...prevState,
          userToken:null,
          userName:null,
          isLoading:false};
    }
  };
  
  
  const [loginState,dispatch]=useReducer(loginReducer,initaialLoginState)
  
  
  const authContext=useMemo(()=>({
  
    signin: async(username,password)=>{
  
      
      const response = await fetch(
        `${ENDPOINT}/login/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password,
            returnSecureToken: true
          })
        });
        
  
        // if (!response.ok) {
        //   const errorResData = await response.json();
        //   const errorId = errorResData.error.message;
        //   let message = 'Something went wrong!';
        //   if (errorId === 'EMAIL_NOT_FOUND') {
        //     message = 'This email could not be found!';
        //   } else if (errorId === 'INVALID_PASSWORD') {
        //     message = 'This password is not valid!';
        //   }
        //   throw new Error(errorId);
        // }
        
        // const resData = await response.json();
        //  console.log(resData);
        //  console.log(resData.token)
        // const token = await resData.token;
        //   if (token!==undefined)
        // try {
        //   await AsyncStorage.setItem('userToken', resData.token)
        //   await AsyncStorage.setItem('userName', username)
        // } catch (e) {
        //   // saving error
        //   console.log(e)
        // }


        if(response.status===400){
          Alert.alert("Invalid credentials")
          // Toast.show(`Invalid credentials`, Toast.SHORT);
        }
  
        // if (!response.ok) {
          
        //   const errorId = errorResData.error.message;
          
        //   if (errorId === 'EMAIL_NOT_FOUND') {
        //     message = 'This email could not be found!';
        //   } else if (errorId === 'INVALID_PASSWORD') {
        //     message = 'This password is not valid!';
        //   }
        //   Toast.show(`${message}`, Toast.SHORT);
        //   throw new Error(errorId);
        // }

        
        if(response.ok){
          const resData = await response.json();
         console.log(resData);
         console.log(resData.token)
        const token = await resData.token;
          if (token!==undefined)
        try {
          await AsyncStorage.setItem('userToken', resData.token)
          await AsyncStorage.setItem('userName', username)
        } catch (e) {
          // saving error
          console.log(e)
        }
  
        // setUserToken(resData.token)
        // setIsLoading(false)
          dispatch({type:'SIGNIN',username:username,token:token})
          Toast.show('Logged In', Toast.SHORT);}
  },
  
  logout:async()=>{
  
    try {
      await AsyncStorage.removeItem('userToken')
    } catch (e) {
      // saving error
      console.log(e)
    }
  
    dispatch({type:'LOGOUT'})
  // setUserToken(null)
  // setIsLoading(false)
  Toast.show('Logged Out', Toast.SHORT);
  }
  
  }),[]);
  
  
  useEffect(() => {
    setTimeout(async()=>{
  
      let userToken = null
      let userName = null
      try {
       
       userToken = await AsyncStorage.getItem('userToken')
       userName = await AsyncStorage.getItem('userName')
      } catch (e) {
        // saving error
        console.log(e)
      }
      dispatch({type:'RETRIVE_TOKEN',username:userName,token:userToken})
      // setIsLoading(false)
    },1000);
  }, []);
  
  
  
  if(loginState.isLoading){
    // if(isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
        <ActivityIndicator size="large" />
      </View>
    )
  }





  return (

    <InternetConnectionAlert
  onChange={(connectionState) => {
    console.log("Connection State: ", connectionState);
  }}
>
  {/* {... Your whole application should be here ... } */}
<AuthContext.Provider value={authContext} >
<NavigationContainer>
<StatusBar style="auto" hidden={true} />
  {(loginState.userToken!==null) ?(
  <DrawerNav/>
  // <Doubt/>
  ):

 <AuthStack/>

  }
</NavigationContainer>
</AuthContext.Provider>
</InternetConnectionAlert>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
