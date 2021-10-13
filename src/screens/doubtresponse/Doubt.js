import React, { useEffect, useState, useRef} from 'react'
import { StyleSheet, Text, View,Button, Image, TouchableOpacity,Modal,ImageBackground,Alert } from 'react-native'
import { Camera } from 'expo-camera';
import { ImageManipulator } from 'expo-image-crop'
import { width, height, ENDPOINT} from '../../utils/config'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Doubt = ({navigation,route}) => {

    const{question,id}= route.params


    const [image, setImage] = useState(null);
    const [query,setQuery] = useState('')
    const [isVisible,setIsVisible]=useState(false)

    const [modalVisible, setModalVisible] = useState(false);

    const [hasPermission, setHasPermission] = useState(null);

  const type = Camera.Constants.Type.back

  const cam = useRef();

  const onToggleModal = () => {
    setIsVisible(!isVisible)
}


const updateD = async (img) => {

  console.log('updateDdddddd')

  const token = await AsyncStorage.getItem('userToken')

    let formdata = new FormData();
    formdata.append('status','Solved')
    // formdata.append('solution_image',img)
    formdata.append("solution_image",{
      uri:img.uri,
      name:'my_img.jpg',
      type:'image/jpg'
    })
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
        console.log(D)
        console.log(response.status)
        if(response.ok){
            if(D.Success){
                
                    // Alert.alert(`Success : ${D.Success}`)
                    Alert.alert(
                        "Sucess",
                        `${D.Success}`,
                        [
                          {
                            text: "Enter Dte info",
                            onPress: () => navigation.navigate('DppInfo',{question,image}),
                            style: "default",
                          },
                        ],
                        {
                          cancelable: true,
                          onDismiss: () =>
                            Alert.alert(
                              "This alert was dismissed by tapping outside of the alert dialog."
                            ),
                        }
                      );

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




    const snap = async () => {
        if (cam.current) {
          const options = {quality:0.8,base64:true,skipProcessing:false}
      
          let photo = await cam.current.takePictureAsync(options) 
    
          // console.log(cam.current.getSupportedRatioAsync())
          const source = photo.uri
          
          if(source){
            // cam.current.resumePreview()
            setImage(photo)
            // console.log(photo)
            setModalVisible(!modalVisible)
            setIsVisible(true)
          }
        }    
      };


      // useEffect(() => {
      //   (async () => {
      //     const { status } = await Camera.requestPermissionsAsync();
      //     setHasPermission(status === 'granted');
      //   })();
      // }, []);

      useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      if (hasPermission === null) {
        return <View />;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }


    return (
        <View style={styles.container} >
            <Image source={{uri:question.student_query_assoc.query_file}} style={{height:300,width,resizeMode:'contain'}} />
    
            
            <Button title="open cam" onPress={()=>setModalVisible(!modalVisible)} />
            
            {image!=null?<Button title="submit solution image" onPress={()=>updateD(image)} />:null}
             <View style={styles.container}>
 
         
          {(image!=null)?
            <ImageBackground
              resizeMode="contain"
              style={{
                  justifyContent: 'center', padding: 20, alignItems: 'center', backgroundColor: 'black',flex:1,resizeMode:'contain',width
              }}
              source={image}
          >
              <Button title="Open Image Editor" onPress={()=>setIsVisible(true)} />
              <ImageManipulator
                  photo={ image }
                  isVisible={isVisible}
                  onPictureChoosed={(uriM) => setImage( uriM )}
                  onToggleModal={onToggleModal}
                
                  />
                  </ImageBackground>:null }

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        
          setModalVisible(!modalVisible);
        }}
      >
      <Camera style={styles.camera} 
          ref={cam}
          autoFocus="on"
          type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={()=>{
                snap() 
            }}
            >
            <Text style={styles.text}> CAPTURE </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      </Modal>
           
        </View>
        </View>
    )
}

export default Doubt

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'flex-start',
        alignItems:'center'

    },
    camera: {
        flex: 1,
        // width:width*0.93,marginVertical:15,
      },
      buttonContainer: {
        margin:20,justifyContent:'flex-end',alignItems: 'center',flex:1
      },
      button: {
        flex: 0.28,
        alignSelf: 'flex-end',
        alignItems: 'center',
        
      },
      text: {
        fontSize: 25,
        textAlign:'center',
        color: 'white',
      },
})
