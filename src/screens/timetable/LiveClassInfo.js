import React,{ useEffect, useState} from 'react'
import { StyleSheet, Text, View , TouchableOpacity, SafeAreaView, RefreshControl, ActivityIndicator, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import dateFormat from 'dateformat'
import {width,ENDPOINT} from '../../utils/config'


const LiveClassInfo = ({navigation,route}) => {

    const{item}= route.params
    // const [itemm,setItemm]=useState(item)
    const [isLoading,setIsLoading]=useState(true)
    const[liveClass,setLiveClass]=useState([])
    const[data,setData]=useState([])
    const isFocused = useIsFocused();

    const getSchedule = async () =>{
        const userToken = await AsyncStorage.getItem('userToken')
        const username = await AsyncStorage.getItem('userName')
        const response = await fetch(`${ENDPOINT}/student/get-teacher-live-class/?id=${item.id}`,{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': `Token ${userToken}`,

            },
            method: `GET`
        })
        const D = await response.json();
        console.log('clas data',D)
        setLiveClass(D)
        setIsLoading(false)
    }

    const getStudioInfo = async () => {
        const response = await fetch(`https://sms.zinedu.com/get-studio-by-liveclass?id=${item.id}`,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            }
        })
        const D = await response.json();
        console.log(D,'studio')
        setData(D)
        // setIsLoading(false)
        

    }


    useEffect(() => {
        console.log(item.id)
        // console.log('this is item',item)
        if(isFocused){
            getSchedule()
        getStudioInfo()}
    },[isFocused])

    if(isLoading){
        <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems: 'center'}}>
            <ActivityIndicator size='large' color="black" />
        </View>
    }

    return (
         <SafeAreaView style={styles.container} >
           {liveClass.length!=0&& <View style={{width:width*0.9,padding:15,backgroundColor:'white',marginVertical:10,borderRadius:14,minHeight:107,elevation:7,shadowColor:'grey',marginHorizontal:0.05*width,justifyContent:'center',alignItems: 'flex-start',
            shadowOffset:{height:7,width:0},
            shadowOpacity:0.25,
            shadowRadius:3.5}}>
            <Text style={styles.txt} >
               CH : {liveClass.chapter_assoc.chapter_name}
            </Text>
            <Text style={styles.txt} >
            Subject : {liveClass.chapter_assoc.subject_assoc.subject_name}
            </Text>
            <Text style={styles.txt} >
            Date/Time : {dateFormat(liveClass.start_date,"ddd dd/mm/yyyy hh:MM tt")}
            </Text>
            {data.status?
            
            <Text style={styles.txt}>
                Studio : {data.data.studio_name}
            </Text>
            
            :
            <Text style={styles.txt}>
            Studio : 
                </Text>}
            <Text>Batches : </Text>
                <View style={{width:'100%',height:100,borderColor:'black',borderWidth:1,borderRadius:15,marginVertical:5,}}>
            <ScrollView style={{flex:1,borderRadius:12,padding:6}} >
            {data.status?data.data.batches.map((item,i)=>
            <Text key={i} style={styles.txt}>
                {item.name}
            </Text>
            ):null}
            </ScrollView>
            </View>
            </View>}
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'90%',marginVertical:10,marginTop:20}}>

        {liveClass.length!=0&& <TouchableOpacity 
        onPress={()=>navigation.navigate('NotesFile',{item:liveClass})}
            style={{width:'45%',justifyContent:'center',alignItems: 'center',backgroundColor:'#ECECEC',height:157,borderRadius:30}} >
  

                {liveClass.note_info.length!=0?
                <Text style={styles.txt} >
                    UPDATE NOTES
                </Text>
                :
                <Text style={styles.txt} >
                    ADD NOTES
                </Text>
                }
               {/* <Text style={styles.txt} >
                    {liveClass.note_info.length}
                </Text> */}
     
            </TouchableOpacity> }

            <TouchableOpacity 
            onPress={()=>navigation.navigate('Tags',{item:liveClass})}
            style={{width:'45%',justifyContent:'center',alignItems: 'center',backgroundColor:'#ECECEC',height:157,borderRadius:30}} >
            <View >

                <Text style={styles.txt} >
                    TAGS
                </Text>
            </View>
            </TouchableOpacity>


        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'90%',marginVertical:10,marginTop:20}}>

        <TouchableOpacity 
            onPress={()=>navigation.navigate('Chapter',{item:liveClass})}
            style={{width:'45%',justifyContent:'center',alignItems: 'center',backgroundColor:'#ECECEC',height:157,borderRadius:30}} >
            
            <View >
                <Text style={styles.txt} >
                    EDIT CHAPTER
                </Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={()=>navigation.navigate('SubjectEdit',{item:liveClass})}
            style={{width:'45%',justifyContent:'center',alignItems: 'center',backgroundColor:'#ECECEC',height:157,borderRadius:30}} >
            
            <View >
                <Text style={styles.txt} >
                    EDIT SUBJECT
                </Text>
            </View>
            </TouchableOpacity>

        </View>
        
    </SafeAreaView>
    )
}

export default LiveClassInfo

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    txt:{
        color:'black',paddingVertical:1.8
    }
})


 