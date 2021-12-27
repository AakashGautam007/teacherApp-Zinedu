import React, { useEffect, useState} from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, RefreshControl, Alert} from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENDPOINT,width} from '../../utils/config'
import dateFormat from 'dateformat'

const TimeTable = ({navigation}) => {

    const[data,setData]=useState([])
    const [refreshing,setRefreshing]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const isFocused = useIsFocused();

    const getSchedule = async () =>{
        const userToken = await AsyncStorage.getItem('userToken')
        const username = await AsyncStorage.getItem('userName')
        const response = await fetch(`${ENDPOINT}/student/get-teacher-live-classes/?teacher_username=${username}`,{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': `Token ${userToken}`,

            },
            method: `GET`
        })
        const D = await response.json();
        console.log(D,'class data')
        setData(D)
        setIsLoading(false)
        setRefreshing(false)
    }

    const getStatus = async () =>{
        const userToken = await AsyncStorage.getItem('userToken')
        const username = await AsyncStorage.getItem('userName')
        const response = await fetch(`${ENDPOINT}/support/check-misc-chapters-in-past-class/?teacher=${username}`,{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': `Token ${userToken}`,

            },
            method: `GET`
        })
        const D = await response.json();
        console.log(D)
        if(D.num_live_classes<=3){
            getSchedule()
        }
        else{
            Alert.alert(`${D.num_live_classes} Classes have misc Chapter please updated them to see Scheduled Live Classes`)
            navigation.navigate('Dashboard')
        }
        // setData(D)
        // setIsLoading(false)
        // setRefreshing(false)
    }



    const onRefresh = () =>{
        // setIsLoading(true)
        setRefreshing(true)
        getSchedule()
        
    }

    useEffect(() => {
        if(isFocused){
           
            getStatus()
        }
    },[isFocused])

    return (
        <SafeAreaView style={styles.container} >
            {/* <Text style={{fontSize:22}} >Live Classes Schedule</Text> */}
            <FlatList
        data={data}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        renderItem={({item,i})=>{
        return(
            <TouchableOpacity 
            onPress={()=>navigation.navigate('LiveClassInfo',{item})}
            style={{width:width*0.9,padding:15,backgroundColor:item.chapter_assoc.chapter_name=='Miscellaneous'?'red':'white',marginVertical:10,borderRadius:14,minHeight:107,elevation:7,shadowColor:'grey',marginHorizontal:0.05*width,justifyContent:'center',alignItems: 'flex-start',
            shadowOffset:{height:7,width:0},
            shadowOpacity:0.25,
            shadowRadius:3.5,}}>
       
            <Text style={{...styles.txt,color:item.chapter_assoc.chapter_name=='Miscellaneous'?'white':'black',fontWeight:item.chapter_assoc.chapter_assoc=='Miscellaneous'?'700':'500'}} >
            Date / Time : {dateFormat(item.start_date,"ddd dd/mm/yyyy   hh:MM tt")}
            </Text>
            <Text style={{...styles.txt,color:item.chapter_assoc.chapter_name=='Miscellaneous'?'white':'black',fontWeight:item.chapter_assoc.chapter_assoc=='Miscellaneous'?'700':'500'}} >
               CH : {item.chapter_assoc.chapter_name}
            </Text>

            <Text style={{...styles.txt,color:item.chapter_assoc.chapter_name=='Miscellaneous'?'white':'black',fontWeight:item.chapter_assoc.chapter_assoc=='Miscellaneous'?'700':'500'}} >
            Subject : {item.chapter_assoc.subject_assoc.subject_name} 
            {/* {item.id} */}
            </Text> 
            

          
            </TouchableOpacity>
        )
        }}
        keyExtractor={item => `${item.id}`}
      />
        </SafeAreaView>
    )
}

export default TimeTable

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'flex-start',
        alignItems: 'center',
        backgroundColor:'white'

    },
    txt:{
        color:'black',paddingVertical:1.8
    }
})
