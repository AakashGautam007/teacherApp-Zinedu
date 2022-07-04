import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Picker from '@gregfrench/react-native-wheel-picker'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ENDPOINT, width } from '../../utils/config'
import { useAuthFields } from '../../AppUtils/hooks/useAuthFields';

const Tags = ({ navigation, route }) => {
  const { item } = route.params
  const { userToken } = useAuthFields();

  const liveClassid = item.id

  const [selectedTag, setSelectedTag] = useState([])
  const [tag, setTag] = useState([])
  const [tagModalVisible, setTagModalVisible] = useState(false)
  const [currentTags, setCurrentTags] = useState([])
  const [message, setMessage] = useState()



  const clearTags = () => {

    setTag([])

  }

  const updateTags = async () => {
    console.log(selectedTag, item.id)
    // const userToken = await AsyncStorage.getItem('userToken')
    const formdata = new FormData();
    selectedTag.map((item) => { formdata.append('tag', item) })
    const response = await fetch(`${ENDPOINT}/student/update-scheduled-live-class/${item.id}/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': "multipart/form-data",
        'Authorization': `Token ${userToken}`,

      },
      method: `PUT`,
      body: formdata,
    })
    const D = await response.json();
    console.log(D)
    if (response.ok) {
      Alert.alert(`${D.Success}`)
      setMessage(D)
    }
    else (
      Alert.alert('something went wrong')
    )
  }


  const getTags = async () => {
    // const userToken = await AsyncStorage.getItem('userToken')
    // console.log(userToken)
    let requestOptions = {
      redirect: 'follow',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
    };
    const response = await fetch(`${ENDPOINT}/support/get-tags/?chapter=${item.chapter_assoc.id}`, requestOptions)
    const D = await response.json();
    // console.log('this tag',D)
    setTag(D)

  }

  const getCurrentTags = async () => {
    // const userToken = await AsyncStorage.getItem('userToken')
    // console.log(userToken)
    console.log(item.id)
    let requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
    };
    const response = await fetch(`${ENDPOINT}/student/get-live-class-tags/?id=${item.id}`, requestOptions)
    const D = await response.json();
    console.log(D, 'CurrentTags')
    setCurrentTags(D)

  }



  useEffect(() => {
    // console.log(item,'this item in tag')
    getTags()
    getCurrentTags()
  }, [message])


  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width, height: 70, paddingHorizontal: 30 }} >
        <Text>
          Select New Tags
        </Text>

        <TouchableOpacity onPress={() => {
          setSelectedTag([])
          setTagModalVisible(!tagModalVisible)
          // setChapter(null)
          // setChapterId('')

        }}>
          <View style={{ width: 120, height: 52, backgroundColor: '#ECECEC', justifyContent: 'center', alignItems: 'center', borderRadius: 12 }} >
            <Text>
              {/* {selectedTag.length} */}
              TAG LIST
            </Text>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={tagModalVisible}
            onRequestClose={() => {
              setTagModalVisible(!tagModalVisible);
            }}
          >
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 60 }}>
              {/* <Button title="close" onPress={()=>{
                    setTagModalVisible(!tagModalVisible)
                    clearTags
                  }} /> */}

              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', }}>
                <TouchableOpacity
                  onPress={() => {
                    setTagModalVisible(!tagModalVisible)
                    clearTags
                  }}
                  style={{ padding: 10, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECECEC', borderRadius: 25, height: 42, marginVertical: 15 }} >
                  <Text style={{ color: 'black', textAlign: 'center', fontWeight: '600' }} >
                    Close
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    updateTags()
                    setTagModalVisible(!tagModalVisible)
                    clearTags()
                  }}
                  style={{ padding: 10, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EA7A26', borderRadius: 25, height: 42, marginVertical: 15 }} >
                  <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }} >
                    Update Tags
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView >
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingVertical: 10 }}>
                  {tag.map((value, i) => (
                    <BouncyCheckbox
                      key={i}
                      size={25}
                      fillColor="red"
                      unfillColor="#FFFFFF"
                      text={value.tag_name}
                      iconStyle={{ borderColor: "red" }}
                      // textStyle={{ fontFamily: "JosefinSans-Regular" }}
                      onPress={(isChecked) => {
                        if (isChecked) {
                          var a = selectedTag;
                          a.push(value.id)
                          setSelectedTag(a)
                        }
                        if (!isChecked) {
                          var a = value.id
                          setSelectedTag(() => selectedTag.filter((item) => {
                            return item !== `${value.id}`
                          }))
                        }
                      }}
                    />
                    // <TouchableOpacity  key={i} onPress={()=>{
                    //   // setChapterId(value.chapter_name)
                    //   // getTags(value.id)
                    //   // setChapterModalVisible(!chapterModalVisible)

                    //   }}>
                    //     <View style={{backgroundColor:'pink',margin:5}} >
                    // <Text>{value.tag_name}</Text>
                    //     </View>

                    // </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </Modal>
        </TouchableOpacity>
      </View>
      {/* <ScrollView>
    {item.tags.map((item,i)=>
    <View>
        <Text>

        </Text>
    </View>
    )}
</ScrollView> */}
      {/* <Button title="Update Tag" onPress={updateTags}/> */}

      {/* <TouchableOpacity 
                  onPress={updateTags}
                  style={{padding:10,paddingHorizontal:15,justifyContent:'center',alignItems: 'center',backgroundColor:'#EA7A26',borderRadius:25,height:42,marginVertical:15}} >
                    <Text style={{color:'white',textAlign:'center',fontWeight:'600'}} >
                      Update Tags
                    </Text>
                  </TouchableOpacity> */}

      <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 20 }} >
        <Text style={{ color: 'black', paddingVertical: 5, fontWeight: '700' }}  >Current Tags : </Text>
        {currentTags.map((item, i) =>
          <Text style={{ paddingVertical: 1, color: 'black' }} key={i} >
            {item.name}
          </Text>
        )}
      </View>

    </View>
  )
}

export default Tags

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', flex: 1
  }
})
