import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENDPOINT,width} from '../../utils/config'
import dateFormat from 'dateformat'
import { useAuthFields } from '../../AppUtils/hooks/useAuthFields';

const NotesAdd = ({navigation}) => {

    const[data,setData]=useState([])
    const { userToken, userName } = useAuthFields();

    const getSchedule = async () =>{
        // const userToken = await AsyncStorage.getItem('userToken')
        // const username = await AsyncStorage.getItem('userName')
        const response = await fetch(`${ENDPOINT}/student/get-teacher-live-classes/?teacher_username=${username}`,{
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
    }

    useEffect(() => {
        getSchedule()
    },[])

    return (
        <SafeAreaView style={styles.container} >
        {/* <Text style={{fontSize:20}} ></Text> */}
        <FlatList
    data={data}
    renderItem={({item,i})=>{
    return(
        <TouchableOpacity
        style={{}}
        onPress={()=>navigation.navigate('NotesFile',{item})}
        >
    <View style={{justifyContent:'center',alignItems: 'center',width:width*0.9,padding:15,backgroundColor:'white',marginVertical:10,borderRadius:14,minHeight:107,elevation:7,shadowColor:'grey',
        shadowOffset:{height:7,width:0},
        shadowOpacity:0.25,
        shadowRadius:3.5,}}>
        <Text>
            {item.chapter_assoc}
        </Text>
        <Text>
        {dateFormat(item.start_date,"ddd mm/dd/yyyy HH:MM tt")}
        </Text>
        </View>
        </TouchableOpacity>
    )
    }}
    keyExtractor={item => `${item.id}`}
  />
    </SafeAreaView>
    )
}

export default NotesAdd

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})
