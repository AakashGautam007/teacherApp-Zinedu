import React,{ useEffect, useState} from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENDPOINT,width} from '../../utils/config'

const SubjectEdit = ({navigation,route}) => {

    const{item,subj}= route.params



    const [subList,setSubList]=useState([])
    const [allSubList,setAllSubList]=useState([])
    const [viewAll,setViewAll]=useState(false)

    const [subjectId,setSubjectId]=useState(null)
    const[subjectName,setSubjectName]=useState(subj)
    const [chapterList,setChapterList]=useState([])
    const [subjectModalVisible,setSubjectModalVisible]=useState(false)

    const [chapter,setChapter]=useState([])
    const [chapterModalVisible,setChapterModalVisible]=useState(false)
    const [chapterId,setChapterId]=useState(null)
    const [chapterName,setChapterName]=useState('')

    // const [chapterId,setChapterId]=useState'')
    // const [chapterName,setChapterName]=useState('')

    const getChapters = async(subbb)=>{
        const userToken = await AsyncStorage.getItem('userToken')
        // console.log(userToken,item.chapter_assoc.subject_assoc)
        var requestOptions = {
          redirect: 'follow',
          method:'GET',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${userToken}`
          },
        };
    const response = await fetch(`${ENDPOINT}/support/get-chapters/?subject=${subbb}`,requestOptions)
    const D = await response.json();
    console.log(D)
    setChapterList(D)

      }

    const getMainSubject = async()=>{
        const userToken = await AsyncStorage.getItem('userToken')
        // console.log(userToken,item.chapter_assoc.subject_assoc)
        var requestOptions = {
          redirect: 'follow',
          method:'GET',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${userToken}`
          },
        };
    const response = await fetch(`${ENDPOINT}/student/get-subject-list-by-liveclass/?id=${item.id}`,requestOptions)
    const D = await response.json();
    console.log(D.subject_list)
    setSubList(D.subject_list)

      }

      const getAllMainSubject = async()=>{
        const userToken = await AsyncStorage.getItem('userToken')
        // console.log(userToken,item.chapter_assoc.subject_assoc)
        var requestOptions = {
          redirect: 'follow',
          method:'GET',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${userToken}`
          },
        };
    const response = await fetch(`${ENDPOINT}/support/get-subjects/?is_main_subject=True`,requestOptions)
    const D = await response.json();
    console.log(D,'All sub')
    setAllSubList(D)

      }


      const updateChapter = async (ch) =>{

        const userToken = await AsyncStorage.getItem('userToken')
        const formdata= new FormData();
        formdata.append('chapter',ch)
        const response = await fetch(`${ENDPOINT}/student/update-scheduled-live-class/${item.id}/`,{
        headers:{
            'Accept':'application/json',
            'Content-Type': "multipart/form-data",
            'Authorization': `Token ${userToken}`,

        },
        method: `PUT`,
        body:formdata,
    })
    const D = await response.json();
    console.log(D)
    if(response.ok){
        Alert.alert(`${D.Success}`)
    }
    else{
      Alert.alert('something went wrong')
    }
    
    }


      useEffect(() => {
        getMainSubject()
        getAllMainSubject()
        // console.log(item.id,'liv')
      },[])



      return (
        <View style={styles.container}>
    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width,height:70,paddingHorizontal:30}} >
  <Text>
     Select Subject
  </Text>
  
  <TouchableOpacity onPress={()=>{
    setSubjectModalVisible(!subjectModalVisible)
    setChapterName('')
    setChapterId(null)
    
    }}>
    <View style={{width:180,height:52,backgroundColor:'#ECECEC',justifyContent:'center',alignItems: 'center',borderRadius:12,padding:2}} >
     <Text>
     {subjectName}
       </Text> 
    </View>
    <Modal
        animationType="slide"
        transparent={false}
        visible={subjectModalVisible}
        onRequestClose={() => {
          setSubjectModalVisible(!subjectModalVisible);
        }}
      >  
      <View style={{flex:1,justifyContent:'center',alignItems: 'center',paddingTop:60,}}>
                  <Button title="close" onPress={()=>setSubjectModalVisible(!subjectModalVisible)}/>
                <ScrollView style={{flex:1}}>
                
                  <View style={{flex:1,justifyContent:'flex-start',alignItems: 'flex-start',paddingVertical:20,width:'100%'}}>
                  <Text style={{paddingVertical:10,fontSize:18,color:'black'}}>
  Class Subject List
  </Text>
{subList.map((value, i) => (
            <TouchableOpacity  key={i} onPress={()=>{
            //   setChapterName(value.chapter_name)
            //   setChapterId(value.id)
            //   setChapterModalVisible(!chapterModalVisible)
            setSubjectName(value.subject_name)
            setSubjectId(value.id)
            setSubjectModalVisible(!subjectModalVisible)
              }}>
                <View style={{backgroundColor:'#ECECEC',marginVertical:5,marginHorizontal:15,padding:5,borderRadius:10}} >
            <Text>{value.subject_name}</Text>
                </View>

            </TouchableOpacity>
          ))}
<Text style={{paddingVertical:10,fontSize:18,color:'black',marginTop:20}}>
  All Subject List
  </Text>
  <TouchableOpacity 
  style={{width:180,height:52,backgroundColor:'#ECECEC',justifyContent:'center',alignItems: 'center',borderRadius:12,marginVertical:10}}
  onPress={()=>setViewAll(!viewAll)}>
    <Text>
    {!viewAll?`View All`:`View Less`}
    </Text>
    </TouchableOpacity>
  {viewAll===true?
  <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
{allSubList.map((value, i) => (
            <TouchableOpacity  key={i} onPress={()=>{
            //   setChapterName(value.chapter_name)
            //   setChapterId(value.id)
            //   setChapterModalVisible(!chapterModalVisible)
            setSubjectName(value.subject_name)
            setSubjectId(value.id)
            setSubjectModalVisible(!subjectModalVisible)
              }}>
                <View style={{backgroundColor:'#ECECEC',margin:5,marginHorizontal:15,padding:5,borderRadius:10}} >
            <Text>{value.subject_name}</Text>
                </View>

            </TouchableOpacity>
          ))}
          </View>
          :null}
          </View>
          </ScrollView>
          </View>
</Modal>
  </TouchableOpacity>


</View>

{subjectId!==null&&<View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width,height:70,paddingHorizontal:30}} >
  <Text>
     Select Chapter
  </Text>
  
  <TouchableOpacity onPress={()=>{
    getChapters(subjectId)
    setChapterModalVisible(!chapterModalVisible)
    setChapterName('')
    setChapterId(null)
    
    }}>
    <View style={{width:180,height:52,backgroundColor:'#ECECEC',justifyContent:'center',alignItems: 'center',borderRadius:12,padding:2}} >
     <Text>
     {chapterName}
       </Text> 
    </View>
    <Modal
        animationType="slide"
        transparent={false}
        visible={chapterModalVisible}
        onRequestClose={() => {
          setChapterModalVisible(!chapterModalVisible);
        }}
      >  
      <View style={{flex:1,justifyContent:'center',alignItems: 'center',paddingTop:60}}>
                  <Button title="close" onPress={()=>setChapterModalVisible(!chapterModalVisible)}/>
                <ScrollView >
                  <View style={{flex:1,justifyContent:'flex-start',alignItems: 'flex-start'}}>
{chapterList.map((value, i) => (
            <TouchableOpacity  key={i} onPress={()=>{
              setChapterName(value.chapter_name)
              setChapterId(value.id)
              setChapterModalVisible(!chapterModalVisible)
              }}>
                <View style={{backgroundColor:'#ECECEC',margin:5,marginHorizontal:15,padding:5,borderRadius:10}} >
            <Text>{value.chapter_name}</Text>
                </View>

            </TouchableOpacity>
          ))}
          </View>
          </ScrollView>
          </View>
</Modal>
  </TouchableOpacity>

  
</View>}


<Button title="Update Chapter" onPress={()=>{
    return(
        chapterId!=null?updateChapter(chapterId):Alert.alert('Select a chapter First')
    )
}
    } />
        </View>
    )
}

export default SubjectEdit

const styles = StyleSheet.create({
    container:{
      justifyContent: 'flex-start',alignItems: 'center',backgroundColor:'white',flex:1
    }
  })
