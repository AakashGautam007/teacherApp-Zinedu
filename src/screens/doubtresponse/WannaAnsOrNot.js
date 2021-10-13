import React, { useEffect, useState} from 'react'
import { Button, StyleSheet, Text, View, Alert, Image, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import {width,height, ENDPOINT} from '../../utils/config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';


const WannaAnsOrNot = ({navigation,route}) => {

    const{item:{
        pending_doubt_assoc,
        id
    }}= route.params

    const [ans,setAns]=useState(null)

    const [question,setQuestion]=useState(null)
    const [isLoading,setIsLoading]= useState(true)

    const [modalVisible, setModalVisible] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: `Don't have time`, value: 'dont have time'},
      {label: 'I have a class', value: 'i have a class'},
      {label: 'Wrong question', value: 'wrong question'},
      {label: 'Not comfortable in this topic', value: 'not comfortable in this topic'},
      {label: 'Not my subject', value: 'not my subject'}
    ]);


    
    const response = async (id,ans,value) =>{
        console.log(id,ans,value,'yes response')
        const token = await AsyncStorage.getItem('userToken')
        let formdata = new FormData();
        formdata.append('status','unsolved')
        formdata.append('Response',ans)
        formdata.append('message',value)
        const response = await fetch(`${ENDPOINT}/support/update-alloted-doubt/${id}/`,{
            method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type': "multipart/form-data",
                    'Authorization':`Token ${token}`
                },
                body:formdata,
            });
    
            const D = await response.json();
            console.log(response.status)
            if(response.ok){
                if(D.Success){
                    if(ans=='Rejected'){
                        Alert.alert(`Success : You've Rejected the Question`)
                    }else if(ans=='Accepted'){
                        Alert.alert(`Success : you've Accepted the question`)
                        // navigation.navigate('Doubt')
                    }
                }
                else if (D.Error){
                  Alert.alert(`Error: ${D.Error}`)
                }
                
              }
               else if(!response.ok){
                Alert.alert(`somethin went wrong ${D.Error}`)
               } 
               if(ans=='Rejected'){
                console.log('Rejected')
                navigation.navigate('PendingDoubts')
            }else if(ans=='Accepted'){
                console.log('Accepted , navigating to doubts')
                navigation.navigate('Doubts',{question,id})
            }
            console.log(D)

    }

    const getDoubt = async ()=>{
        // console.log(pending_doubt_assoc)
        const token = await AsyncStorage.getItem('userToken')
        const response = await fetch(`${ENDPOINT}/student/get-pending-doubts/?pending_doubt_id=${pending_doubt_assoc}`,{
            method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':`Token ${token}`

                },
            });
    
            const D = await response.json();
            console.log(D)
            setQuestion(D)
            setIsLoading(false)
    }

    useEffect(() => {
        getDoubt();
        // console.log(question.id)
    },[])

    if(isLoading){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}} >
        <ActivityIndicator size="large" />
      </View>
        )
    }

    if(question!=null){

        return (
            <View style={styles.container}>
                <View style={{flex:1,justifyContent:'center',alignItems: 'center'}} >

                {question.student_query_assoc.query_file==null?
            <Text>
                {question.student_query_assoc.query_text}
            </Text>   
            : 
               <Image source={{uri:question.student_query_assoc.query_file}} style={{height:300,width,resizeMode:'contain'}} />
            }
                </View>
                <View style={{flex:1}} >
                <Text>wanna ans this doubt or not ?</Text>
               <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
    
                <Button title="Yes" onPress={()=>{
                    setAns('Accepted')
                    response(id,'Accepted','-')}} />
                {/* <Button title="no" onPress={()=>{setAns('Rejected')}} /> */}
                <Button title="No" onPress={()=>setModalVisible(!modalVisible)}/>
               </View>
               
               
                {/* {ans==='Rejected'?<DropDownPicker
                labelProps={{title:'selct the reason'}}
                // min={1}
          open={open}
          value={value}
          items={items}
          setValue={()=>{
              setValue
              response(id,ans,value)
            }}
          setItems={setItems}
          setOpen={setOpen}
        //   onClose={()=>)}
        />:null} */}

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <BlurView intensity={70} style={styles.container}>
          <View style={styles.modalView}>
           {items.map((item)=>
    <TouchableOpacity 
    onPress={()=>{
        setModalVisible(!modalVisible)
        setAns('Rejected')
        response(id,'Rejected',item.value)
    }}
    style={styles.modalItems} >
        <Text>
            {item.label}
        </Text>
    </TouchableOpacity>
           )}
           {/* <Button title="Cancel" onPress={()=>setModalVisible(!modalVisible)} /> */}
           <TouchableOpacity 
                 onPress={()=>setModalVisible(!modalVisible)}
                  style={{padding:10,paddingHorizontal:15,justifyContent:'center',alignItems: 'center',backgroundColor:'#EA7A26',margin:15,borderRadius:25}} >
                    <Text style={{...styles.textSel,color:'white',fontWeight:'700'}} >
                      Close
                    </Text>
                  </TouchableOpacity>
          </View>
          </BlurView>
      </Modal>

                </View>
            </View>
        )
    }
  
}

export default WannaAnsOrNot

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        // backgroundColor:''
      },
      modalItems:{
        backgroundColor:'rgba(56, 62, 136, 0.1)',margin:5,width:'100%',padding:8,borderRadius:10,paddingHorizontal:8
      },
  });
