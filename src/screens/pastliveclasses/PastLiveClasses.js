import React, { useEffect, useState} from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, RefreshControl} from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENDPOINT,width} from '../../utils/config'
import dateFormat from 'dateformat'

const PastLiveClasses = ({navigation}) => {

    const[data,setData]=useState([])
    const [refreshing,setRefreshing]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const isFocused = useIsFocused();

    const getSchedule = async () =>{
        const userToken = await AsyncStorage.getItem('userToken')
        const username = await AsyncStorage.getItem('userName')
        const response = await fetch(`${ENDPOINT}/student/get-past-live-classes/?teacher=${username}`,{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': `Token ${userToken}`,

            },
            method: `GET`
        })
        const D = await response.json();
        console.log(D)
        setData(D)
        setIsLoading(false)
        setRefreshing(false)
    }

    const onRefresh = () =>{
        // setIsLoading(true)
        setRefreshing(true)
        getSchedule()
        
    }

    useEffect(() => {
        if(isFocused){
            getSchedule()
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
            onPress={()=>navigation.navigate('PastLiveClassInfo',{item})}
            style={{width:width*0.9,padding:15,backgroundColor:item.liveclass_assoc.chapter_assoc=='Miscellaneous'?'red':'white',marginVertical:10,borderRadius:14,minHeight:107,elevation:7,shadowColor:'grey',marginHorizontal:0.05*width,justifyContent:'center',alignItems: 'flex-start',
            shadowOffset:{height:7,width:0},
            shadowOpacity:0.25,
            shadowRadius:3.5,}}>
       
            <Text style={styles.txt} >
            Date / Time : {dateFormat(item.liveclass_assoc.start_date,"ddd dd/mm/yyyy   hh:MM tt")}
            </Text>
            <Text style={styles.txt} >
               CH : {item.liveclass_assoc.chapter_assoc}
            </Text>

            {/* <Text style={styles.txt} >
            Subject : {item.chapter_assoc.subject_assoc.subject_name} 
            </Text>  */}
            

          
            </TouchableOpacity>
        )
        }}
        keyExtractor={item => `${item.id}`}
      />
        </SafeAreaView>
    )
}

export default PastLiveClasses

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
