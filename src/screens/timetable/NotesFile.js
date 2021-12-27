import React, { useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator, Image, TouchableOpacity, Platform } from 'react-native'
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DocumentPicker from 'react-native-document-picker'
import { Ionicons } from '@expo/vector-icons'; 
import {ENDPOINT,width,height} from '../../utils/config'



const NotesFile = ({navigation,route}) => {

    const {item} = route.params;
    const [itemm,setItemm]=useState(item)
    const [doc,setDoc]=useState(null)
    const [img,setImg]=useState(null)
    const [txt,setTxt]=useState('')
    const [notess,setNotess]=useState([])
    const [message,setMessage]=useState()
    const [isLoading,setIsLoading]= useState(true)
    const [photo, setPhoto] = useState(null);
    const [isUploading,setIsUploading]= useState(false)

    //  pickDocument = async () =>{
    //     const obj = await DocumentPicker.getDocumentAsync({
    //         type: '*/*'
    //     })

    //     if (!obj.cancelled) {
    //         setDoc(obj);
    //       }
    // }

    const clearData = () =>{

        setDoc(null)
        setImg(null)
        setTxt('')
    }

   
    


    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type:'application/pdf'
        });
        //   console.log(result.uri);
        //   console.log(result);
        if (!result.cancelled) {
            setDoc(result)
          }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
        });
        if (!result.cancelled) {
            setImg(result)
          }
    }

    // const pickDocument = async () => {
    // try {
    //     const res = await DocumentPicker.pick({
    //       type: [DocumentPicker.types.pdf],
    //     })
    //     console.log(
    //       res.uri,
    //       res.type, // mime type
    //       res.name,
    //       res.size,
    //     )
    //     setDoc(res)
    //   } catch (err) {
    //     if (DocumentPicker.isCancel(err)) {
    //       // User cancelled the picker, exit any dialogs or menus and move on
    //     } else {
    //       throw err
    //     }
    //   }
    // }

    

    const updateNotes = async () =>{

        setIsLoading(true)

        console.log(notess,'thsi is notess')

        const userToken = await AsyncStorage.getItem('userToken')
        console.log(item.id,item.chapter_assoc)
        let formdata = new FormData();
        // formdata.append('live_class_id',item.id)
        // formdata.append('chapter',item.chapter_assoc)
        formdata.append('notes_desc',txt)
        formdata.append('notes_icon',{
        uri:img.uri,
        name:'my_img.jpeg',
      type:'image/jpeg'
        })
        formdata.append('notes_file',doc)
        
        const response = await fetch(`${ENDPOINT}/support/update-teacher-notes/${notess[0].notes_assoc.id}/`,{
            body:formdata,
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'multipart/form-data',
                'Authorization': `Token ${userToken}`,
            }
        })
        const D = await response.json();
        console.log(D)
        setMessage(D)
        if(response.ok){
            if(D.Success){
                Alert.alert(`${D.Success}`)
                // navigation.navigate('LiveClassInfo')
                setIsLoading(false)
            }else{
                Alert.alert(`${D}`)
                setIsLoading(false)
            }
            
        }
        else{
            Alert.alert('something went wrong')
            setIsLoading(false)
        }  

    }

    const addNotessss = async () =>{


        const userToken = await AsyncStorage.getItem('userToken')
    
        console.log(doc.uri,doc.name,doc.size )
        const newImageUri =  "file:///" + doc.uri.split("file:/").join("");

        let formdata = new FormData();
        formdata.append('notes_file',
                    // doc
        {
                uri: newImageUri,
    name: 'doc.pdf',
    type: `application/pdf`
        }
        )
        formdata.append('live_class_id',item.id)
        formdata.append('chapter',item.chapter_assoc.id)
        formdata.append('notes_desc',txt)
        formdata.append("notes_icon",{
          uri:img.uri,
          name:'my_img.jpg',
          type:'image/jpg'
        })
        const response = await fetch(`${ENDPOINT}/student/upload-live-class-notes/`,{
            method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type': "multipart/form-data",
                    'Authorization':`Token ${userToken}`
                },
                body:formdata,
            });
    
            const D = await response.json();
            console.log(D)
            console.log(response.status)
            if(response.ok){
                if(D.Success){
                    
                        Alert.alert(`Success : ${D.Success}`)
                        // Alert.alert(
                        //     "Sucess",
                        //     `${D.Success}`,
                        //     [
                        //       {
                        //         text: "Enter Dte info",
                        //         onPress: () => navigation.navigate('DppInfo',{question,image}),
                        //         style: "default",
                        //       },
                        //     ],
                        //     {
                        //       cancelable: true,
                        //       onDismiss: () =>
                        //         Alert.alert(
                        //           "This alert was dismissed by tapping outside of the alert dialog."
                        //         ),
                        //     }
                        //   );
    
                    }
                }
                else if (D.Error){
                  Alert.alert(`Error: ${D.Error}`)
                }
                
              
               else if(!response.ok){
                Alert.alert(`somethin went wrong ${D.Error}`)
               } 
            
            console.log(D)

    }


    const addNotes = async () => {

        setIsUploading(true)

        const userToken = await AsyncStorage.getItem('userToken')
        // console.log(item.id,item.chapter_assoc.id,txt,userToken)
        // console.log(img.uri,'img uriii')
        // var imageData = {
        //     uri:img.uri,
        //     name:img.name,
        //     type:img.type
        //    }
        // const newImageUri =  "file:///" + img.uri.split("file:/").join("");
        

        const newImageUri =  "file:///" + doc.uri.split("file:/").join("");
        let formdata = new FormData();
        formdata.append('notes_file',{
            uri: newImageUri,
            name: 'doc.pdf',
            type: `application/pdf`
            })
        if(img===null){
            formdata.append("notes_icon",null)
        }else{
            formdata.append("notes_icon",{
              uri:img.uri,
              name:'my_img.jpg',
              type:'image/jpg'
            })
            }
        formdata.append('live_class_id',item.id)
        formdata.append('chapter',item.chapter_assoc.id)
        formdata.append('notes_desc',txt)
        
        const response = await fetch(`${ENDPOINT}/student/upload-live-class-notes/`,{
            body:formdata,
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'multipart/form-data',
                'Authorization': `Token ${userToken}`,
            }
        })
        const D = await response.json();
        console.log(D,'notes added')
        setMessage(D)
        if(response.ok){
            if(D.Success){
                Alert.alert(`${D.Success}`)
                // navigation.navigate('LiveClassInfo')
                setIsUploading(false)
                clearData()
                // setMessage(D)
            }else{
                Alert.alert(`${D}`)
                setIsUploading(false)
                // setMessage(D)
                clearData()
            }
            
        }
        else{
            Alert.alert('something went wrong')
            setIsUploading(false)
        }
        
    }

    const deleteNotes = async () =>{
        setIsLoading(true)
        console.log(notess[0].notes_assoc.id)
        const userToken = await AsyncStorage.getItem('userToken')
        let request_params = {
            method: 'DELETE',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userToken
            },
        }

        const response = await fetch(`${ENDPOINT}/support/delete-teacher-notes/${notess[0].notes_assoc.id}/`,request_params)
        const D = await response.json()
        setMessage(D)
        if(response.ok){
            if(D.Success){
                Alert.alert(`${D.Success}`)
                // navigation.navigate('LiveClassInfo')
                setIsLoading(false)
            }else{
                Alert.alert(`${D}`)
                setIsLoading(false)
            }
            
        }
        else{
            Alert.alert('something went wrong')
            setIsLoading(false)
        }
    }

    const onNotes = async () =>{
        setIsLoading(true)
        const userToken = await AsyncStorage.getItem('userToken')
        let request_params = {
            method: 'GET',
            redirect:'follow',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userToken
            },
        }

        const response = await fetch(`${ENDPOINT}/student/get-live-class-notes/?live_class_id=${item.id}`,request_params)
        const D = await response.json()
        console.log(D,'set Notes')
        setNotess(D)
        setIsLoading(false)
    }


    useEffect(() => {
        console.log(item.id)
        onNotes()
    },[message])

    if(isLoading){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
                <ActivityIndicator size='large' color='black' />
            </View>
        )
    }

    if(isUploading){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
                <Text>Notes uploading please wait Do not leave this page</Text>
                <ActivityIndicator size='large' color='black' />
            </View>
        )
    }


    return (
        <View style={styles.container}>
            {notess.length==0?
            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'flex-start',marginTop:20}} >
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'60%',marginVertical:10}}>
            <Button title="Add Notes File" onPress={pickDocument}/> 
            {doc!=null?<Ionicons name="checkmark" size={24} color="black" /> :null}
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'60%',marginVertical:10}}>
            <View style={{flexDirection:'row',alignItems: 'center'}} >
            <Button title="add image" onPress={pickImage} /> 
            <Text style={{paddingHorizontal:8}} >(Optional)</Text>
                </View>
            {/* <Button title="add image" onPress={handleChoosePhoto} /> */}
            
            {img!=null?<Ionicons name="checkmark" size={24} color="black" />:null}
            </View>
            <TextInput placeholderTextColor="grey" placeholder='Notes Decsription (compulsary)' style={styles.inp} value={txt} onChangeText={setTxt} />

            {/* <Button title="add Notes" onPress={()=>doc!=null&&txt!=''?addNotes():Alert.alert('Enter All Details')} /> */}

                <View style={{width:'100%',justifyContent:'center',alignItems: 'center',}}>
            <TouchableOpacity 
                  onPress={()=>doc!=null&&txt!=''?addNotes():Alert.alert('Enter All Details')}
                  style={{padding:10,paddingHorizontal:15,justifyContent:'center',alignItems: 'center',backgroundColor:'#EA7A26',borderRadius:25,height:42,marginVertical:15}} >
                    <Text style={{color:'white',textAlign:'center',fontWeight:'600'}} >
                      ADD NOTES
                    </Text>
                  </TouchableOpacity>
                </View>

            {/* <Button title="add Notes" onPress={()=>doc!=null&&img!=null&&txt!=''?addNotessss():Alert.alert('Enter All Details')} /> */}
            </View>
            :
            <View>
                <TouchableOpacity onPress={()=>navigation.navigate('NotesView',{file:notess[0].notes_assoc.notes_file})}>
                <Image source={{uri:notess[0].notes_assoc.notes_icon}} style={{resizeMode:'contain',width:width*0.85,height:height*0.38}} />
                </TouchableOpacity>
                <Text style={{flexWrap:'wrap',width:width*0.85,marginBottom:20}} >
                   Notes Decsription : {notess[0].notes_assoc.notes_desc}
                </Text>
            {/* <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'60%'}}>
            <Button title="add file" onPress={pickDocument}/> 
            {doc!=null?<Ionicons name="checkmark" size={24} color="black" />:null}
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'60%'}}>
            <Button title="add image" onPress={pickImage} />{img!=null?<Ionicons name="checkmark" size={24} color="black" />:null}
            </View>
            <TextInput placeholderTextColor="grey" placeholder='Notes Decsription' style={styles.inp} value={txt} onChangeText={setTxt} /> */}
                {/* <Text>
                    {notess[0].notes_assoc.notes_icon}
                </Text> */}
            {/* <Button title="Update Notes" onPress={()=>doc!=null&&img!=null&&txt!=''?updateNotes():Alert.alert('Enter All Details')} /> */}

            {/* <Button title="Delete Notes" onPress={deleteNotes} /> */}
            <TouchableOpacity 
                 onPress={deleteNotes}
                  style={{padding:10,paddingHorizontal:15,justifyContent:'center',alignItems: 'center',backgroundColor:'#EA7A26',borderRadius:25,height:42,marginVertical:15}} >
                    <Text style={{color:'white',textAlign:'center',fontWeight:'600'}} >
                      DELETE NOTES
                    </Text>
                  </TouchableOpacity>
            </View>
            }


            

        </View>
    )
}

export default NotesFile

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    inp:{
        width:(width*0.85),
        height:40,
        borderBottomWidth:1,
        borderBottomColor:'#DADFEB',
        textAlign:'left',
        marginTop:30,
        backgroundColor: '#CECECE',
        paddingHorizontal:10,
        marginVertical:10,borderRadius:12
    }
})
