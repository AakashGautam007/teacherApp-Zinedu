import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ScrollView, Button, SafeAreaView, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Picker} from '@react-native-picker/picker';
import Picker from '@gregfrench/react-native-wheel-picker'
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { width, height, ENDPOINT } from '../../utils/config'
import { useAuthFields } from '../../AppUtils/hooks/useAuthFields';


var PickerItem = Picker.Item;


const DppInfo = ({ navigation, route }) => {

  const { question, image } = route.params
  const { userToken } = useAuthFields();


  const [exrcNo, setExrcNo] = useState('')
  const [quesNo, setQuesNo] = useState('')
  const [tags, setTags] = useState('')


  const [languageId, setLanguageId] = useState('')
  const [ClassId, setClassId] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [bookId, setBookId] = useState('')
  const [chapterId, setChapterId] = useState('')
  const [difLvlId, setDifLvlId] = useState('')
  const [typeId, setTypeId] = useState('')
  const [tagId, setTagId] = useState('')
  const [dtpId, setDtpId] = useState('')

  const [lang_id, setLang_id] = useState('')
  const [class_id, setClass_id] = useState('')
  const [subject_id, setSubject_id] = useState('')
  const [book_id, setBook_id] = useState('')
  const [dtp_id, setDtp_id] = useState('')
  const [chapter_id, setChapter_id] = useState('')
  const [difLvl_id, setDifLvl_id] = useState('')
  const [tag_id, setTag_id] = useState('')



  const [selectedTag, setSelectedTag] = useState([])

  const [lang, setLang] = useState(null)
  const [Class, setClass] = useState(null)
  const [subject, setSubject] = useState(null)
  const [book, setBook] = useState(null)
  const [chapter, setChapter] = useState(null)
  const [difLvl, setDifLvl] = useState(null)
  const [tag, setTag] = useState(null)
  const [dtp, setDtp] = useState(null)


  const [langModalVisible, setLangModalVisible] = useState(false)
  const [ClassModalVisible, setClassModalVisible] = useState(false)
  const [subjectModalVisible, setSubjectModalVisible] = useState(false)
  const [bookModalVisible, setBookModalVisible] = useState(false)
  const [chapterModalVisible, setChapterModalVisible] = useState(false)
  const [difLvlModalVisible, setDifLvlModalVisible] = useState(false)
  const [typeModalVisible, setTypeModalVisible] = useState(false)
  const [tagModalVisible, setTagModalVisible] = useState(false)
  const [dtpModalVisible, setDtpModalVisible] = useState(false)


  const clearForm = () => {


    setExrcNo('')
    setQuesNo('')
    setTags('')
    setLanguageId('')
    setClassId('')
    setSubjectId('')
    setBookId('')
    setChapterId('')
    setDifLvlId('')
    setTypeId('')
    setTagId('')
    setDtpId('')
    setLang_id('')
    setClass_id('')
    setSubject_id('')
    setBook_id('')
    setDtp_id('')
    setChapter_id('')
    setDifLvl_id('')
    setTag_id('')
    setSelectedTag([])

    setLang(null)
    setClass(null)
    setSubject(null)
    setBook(null)
    setChapter(null)
    setDifLvl(null)
    setTag(null)
    setDtp(null)




  }




  const getLanguage = async () => {
    // const userToken = await AsyncStorage.getItem('userToken')
    console.log(userToken)
    var requestOptions = {
      redirect: 'follow',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
    };
    const response = await fetch(`${ENDPOINT}/support/get-languages/`, requestOptions)
    const D = await response.json();
    console.log(D)
    setLang(D)
  }

  const getClass = async () => {
    // const userToken = await AsyncStorage.getItem('userToken')
    console.log(userToken)
    var requestOptions = {
      redirect: 'follow',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
    };
    const response = await fetch(`${ENDPOINT}/support/get-class/`, requestOptions)
    const D = await response.json();
    console.log(D)
    setClass(D)

  }

  const getSubject = async (id) => {
    // const userToken = await AsyncStorage.getItem('userToken')
    console.log(userToken)
    var requestOptions = {
      redirect: 'follow',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
    };
    const response = await fetch(`${ENDPOINT}/support/get-subject-class-binding/?class_id=${id}&is_main_subject=true`, requestOptions)
    const D = await response.json();
    console.log(D)
    setSubject(D)
  }



  const getBook = async (sub, class_id) => {
    // const userToken = await AsyncStorage.getItem('userToken')
    var requestOptions = {
      redirect: 'follow',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
    };
    const response = await fetch(`${ENDPOINT}/support/get-books-info/?class=${class_id}&subject=${sub}`, requestOptions)
    const D = await response.json();
    console.log(D)
    setBook(D)
  }




  const getChapter = async (sub) => {
    // const userToken = await AsyncStorage.getItem('userToken')
    console.log(userToken)
    var requestOptions = {
      redirect: 'follow',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
    };
    const response = await fetch(`${ENDPOINT}/support/get-chapters/?subject=${sub}`, requestOptions)
    const D = await response.json();
    console.log(D)
    setChapter(D)
  }




  const getDifLvl = async () => {
    // const userToken = await AsyncStorage.getItem('userToken')
    console.log(userToken)
    var requestOptions = {
      redirect: 'follow',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
    };
    const response = await fetch(`${ENDPOINT}/support/get-difficulty/`, requestOptions)
    const D = await response.json();
    console.log(D)
    setDifLvl(D)
  }


  const getTags = async (ch) => {
    // const userToken = await AsyncStorage.getItem('userToken')
    console.log(userToken)
    var requestOptions = {
      redirect: 'follow',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
    };
    const response = await fetch(`${ENDPOINT}/support/get-tags/?chapter=${ch}`, requestOptions)
    const D = await response.json();
    console.log(D)
    setTag(D)
  }





  const getDtpInfo = async (ch) => {
    // const userToken = await AsyncStorage.getItem('userToken')
    console.log(userToken)
    var requestOptions = {
      redirect: 'follow',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
    };
    const response = await fetch(`${ENDPOINT}/users/get-data-entry-users/`, requestOptions)
    const D = await response.json();
    console.log(D)
    setDtp(D)
  }




  //not complete
  const sendToDtp = async () => {
    let formdata = new FormData();
    let l = 1
    formdata.append('language', l)
    formdata.append('question_number', '1'
      // quesNo
    )
    formdata.append('exercise_number', '1'
      // exrcNo
    )
    formdata.append('class', class_id)
    formdata.append('subject', subject_id)
    formdata.append('book', '21'
      // book_id
    )
    formdata.append('chapter', '15'
      // chapter_id
    )
    formdata.append('message', 'abc')
    formdata.append('pending_doubt_id', question.id)
    formdata.append('dte_id', dtp_id)
    formdata.append('level', typeId)
    formdata.append('difficulty', difLvl_id)
    // selectedTag.map((item)=>{ formdata.append('tag',item)})
    formdata.append('tag', '1')
    const response = await fetch(`${ENDPOINT}/support/allot-pending-doubt-dte/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': "multipart/form-data",
      },
      body: formdata,
    })
    const D = await response.json();
    console.log(D)
    clearForm()
    if (response.ok) {
      if (D.Success) {
        Alert.alert(`${D.Success}`)
        navigation.navigate('PendingDoubts')
      } else if (D.Error) {
        Alert.alert(`${D.Error}`)
      }
    } else {
      Alert.alert(`${D.Error}`)
    }

  }


  const getData = async () => {
    getLanguage()
    getClass()
    // getSubject()
    // getBook('1')
    // getChapter()
    getDifLvl()
    getDtpInfo()
    // getType()
  }




  useEffect(() => {
    getData()
  }, [])


  return (
    // <ScrollView>
    <SafeAreaView style={styles.container}>

      {/* <Text>Enter Dpp info</Text> */}
      {/* <TextInput style={styles.inp} value={} onChangeText={} />
            <TextInput style={styles.inp} value={} onChangeText={} />
            <TextInput style={styles.inp} value={} onChangeText={} /> */}



      <View style={styles.viewOuter} >
        <View style={styles.viewInner}>
          <Text style={styles.textSel} >
            Select lang
          </Text>
          {lang != null && lang !== [] ?
            <TouchableOpacity style={styles.touchableStyle}
              onPress={() => setLangModalVisible(!langModalVisible)}>
              <Text style={styles.textSel} >
                {languageId}
              </Text>
              <Modal
                animationType="slide"
                transparent={false}
                visible={langModalVisible}
                onRequestClose={() => {
                  setLangModalVisible(!langModalVisible);
                }}
              >
                <ScrollView >
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60, paddingHorizontal: 7 }}>

                    <TouchableOpacity
                      onPress={() => setLangModalVisible(!langModalVisible)}
                      style={{ padding: 10, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(56, 62, 136, 0.1)', margin: 15, borderRadius: 25 }} >
                      <Text>
                        Close
                      </Text>
                    </TouchableOpacity>
                    {lang.map((value, i) => (
                      <TouchableOpacity key={i}
                        style={styles.modalItems}
                        onPress={() => {
                          setLanguageId(value.language)
                          setLang_id(value.id)
                          setLangModalVisible(!langModalVisible)
                        }}>

                        <Text>{value.language}</Text>


                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </Modal>
            </TouchableOpacity>
            : null}
        </View>
      </View>




      <View style={styles.viewOuter} >
        <View style={styles.viewInner}>
          <Text style={styles.textSel} >
            Select Class
          </Text>
          {Class != null && Class !== [] ?
            <TouchableOpacity style={styles.touchableStyle}
              onPress={() => {
                setClassModalVisible(!ClassModalVisible)
                setSubjectId('')
                setSubject(null)

              }}>

              <Text style={styles.textSel} >
                {ClassId}
              </Text>

              <Modal
                animationType="slide"
                transparent={false}
                visible={ClassModalVisible}
                onRequestClose={() => {
                  setClassModalVisible(!ClassModalVisible);

                }}
              >
                <ScrollView >
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60, paddingHorizontal: 7 }}>

                    <TouchableOpacity
                      onPress={() => setClassModalVisible(!ClassModalVisible)}
                      style={{ padding: 10, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(56, 62, 136, 0.1)', margin: 15, borderRadius: 25 }} >
                      <Text>
                        Close
                      </Text>
                    </TouchableOpacity>
                    {Class.map((value, i) => (
                      <TouchableOpacity
                        style={styles.modalItems}
                        key={i} onPress={() => {
                          setClassId(value.class_name)
                          setClass_id(value.id)
                          setSubject_id(value.id)
                          getSubject(value.id)
                          setClassModalVisible(!ClassModalVisible)
                        }}>
                        <Text>{value.class_name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </Modal>
            </TouchableOpacity>
            : null}
        </View>
      </View>





      {subject != null && Class != null && ClassId !== '' ?
        <View style={styles.viewOuter} >
          <View style={styles.viewInner}>
            <Text style={styles.textSel} >
              Select subject
            </Text>
            <TouchableOpacity style={styles.touchableStyle}
              onPress={() => {
                setSubjectModalVisible(!subjectModalVisible)
                setBook(null)
                setBookId('')
              }}>
              <Text style={styles.textSel} >
                {subjectId}
              </Text>
              <Modal
                animationType="slide"
                transparent={false}
                visible={subjectModalVisible}
                onRequestClose={() => {
                  setSubjectModalVisible(!subjectModalVisible);
                }}
              >
                <ScrollView >
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60, paddingHorizontal: 7 }}>

                    <TouchableOpacity
                      onPress={() => setSubjectModalVisible(!subjectModalVisible)}
                      style={{ padding: 10, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(56, 62, 136, 0.1)', margin: 15, borderRadius: 25 }} >
                      <Text>
                        Close
                      </Text>
                    </TouchableOpacity>
                    {subject.map((value, i) => (
                      <TouchableOpacity
                        style={styles.modalItems}
                        key={i} onPress={() => {
                          setSubjectId(value.subject_name)
                          setSubject_id(value.id)
                          getBook(value.id, class_id)
                          setSubjectModalVisible(!subjectModalVisible)
                        }}>

                        <Text>{value.subject_name}</Text>

                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </Modal>
            </TouchableOpacity>
          </View>
        </View>
        : null}



      {/* 
<View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width,height:70,paddingHorizontal:30}} >
  <Text>
     Select Book
  </Text>
  {book!=null&&subject!=null&&subjectId!==''&&ClassId!=''?
  <TouchableOpacity onPress={()=>{
    setBookModalVisible(!bookModalVisible)
    setChapter(null)
    setChapterId('')
    
    }}>
    <View style={{width:120,height:52,backgroundColor:'red',justifyContent:'center',alignItems: 'center',borderRadius:12}} >
     <Text>
     {bookId}
       </Text> 
    </View>
    <Modal
        animationType="slide"
        transparent={false}
        visible={bookModalVisible}
        onRequestClose={() => {
          setBookModalVisible(!bookModalVisible);
        }}
      >  
                <ScrollView >
                  <View style={{flex:1,justifyContent:'center',alignItems: 'center',paddingTop:60}}>
                  <Button title="close" onPress={()=>setBookModalVisible(!bookModalVisible)}/>
{book.map((value, i) => (
            <TouchableOpacity  key={i} onPress={()=>{
              setBookId(value.book_name)
              setBook_id(value.id)
              getChapter(subject_id)
              setBookModalVisible(!bookModalVisible)
              }}>
                <View style={{backgroundColor:'pink',margin:5}} >
            <Text>{value.book_name}</Text>
                </View>

            </TouchableOpacity>
          ))}
          </View>
          </ScrollView>
</Modal>
  </TouchableOpacity>
  :null}
</View>
      



<View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width,height:70,paddingHorizontal:30}} >
  <Text>
     Select Chapter
  </Text>
  {chapter!=null&&book!=null&&bookId!==''&&subjectId!=''&&ClassId!=''?
  <TouchableOpacity onPress={()=>{
    setChapterModalVisible(!chapterModalVisible)
    // setChapter(null)
    // setChapterId('')
    
    }}>
    <View style={{width:120,height:52,backgroundColor:'red',justifyContent:'center',alignItems: 'center',borderRadius:12}} >
     <Text>
     {chapterId}
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
                <ScrollView >
                  <View style={{flex:1,justifyContent:'center',alignItems: 'center',paddingTop:60}}>
                  <Button title="close" onPress={()=>setChapterModalVisible(!chapterModalVisible)}/>
{chapter.map((value, i) => (
            <TouchableOpacity  key={i} onPress={()=>{
              setChapterId(value.chapter_name)
              setChapter_id(value.id)
              getTags(value.id)
              setChapterModalVisible(!chapterModalVisible)
              }}>
                <View style={{backgroundColor:'pink',margin:5}} >
            <Text>{value.chapter_name}</Text>
                </View>

            </TouchableOpacity>
          ))}
          </View>
          </ScrollView>
</Modal>
  </TouchableOpacity>
  :null}
</View>





<View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width,height:70,paddingHorizontal:30}} >
  <Text>
     Select tag
  </Text>
  {tag!=null&&book!=null&&bookId!==''&&subjectId!=''&&ClassId!=''&&chapterId!=''?
  <TouchableOpacity onPress={()=>{
    setTagModalVisible(!chapterModalVisible)
    setSelectedTag([])
    // setChapter(null)
    // setChapterId('')
    
    }}>
    <View style={{width:120,height:52,backgroundColor:'red',justifyContent:'center',alignItems: 'center',borderRadius:12}} >
     <Text>
     {selectedTag.length}
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
                <ScrollView >
                  <View style={{flex:1,justifyContent:'center',alignItems: 'center',paddingTop:60}}>
                  <Button title="close" onPress={()=>setTagModalVisible(!tagModalVisible)}/>
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
                  if(isChecked){
                    var a = selectedTag;
                    a.push(value.tag_name)
                    setSelectedTag(a)
                  }
                  if(!isChecked){
                      var a = value.tag_name
                      setSelectedTag(()=>selectedTag.filter((item)=>{
                        return item!==`${value.tag_name}`
                      }))
                  }
                  console.log()
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
</Modal>
  </TouchableOpacity>
  :null}
</View>
 */}





      <View style={styles.viewOuter} >
        <View style={styles.viewInner}>
          <Text style={styles.textSel} >

            Select Difficulty level
          </Text>
          {difLvl != null ?
            <TouchableOpacity style={styles.touchableStyle}
              onPress={() => {
                setDifLvlModalVisible(!difLvlModalVisible)
                // setChapter(null)
                // setChapterId('')

              }}>

              <Text style={styles.textSel} >
                {difLvlId}
              </Text>

              <Modal
                animationType="slide"
                transparent={false}
                visible={difLvlModalVisible}
                onRequestClose={() => {
                  setDifLvlModalVisible(!difLvlModalVisible);
                }}
              >
                <ScrollView >
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60, paddingHorizontal: 7 }}>

                    <TouchableOpacity
                      onPress={() => setDifLvlModalVisible(!difLvlModalVisible)}
                      style={{ padding: 10, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(56, 62, 136, 0.1)', margin: 15, borderRadius: 25 }} >
                      <Text>
                        Close
                      </Text>
                    </TouchableOpacity>
                    {difLvl.map((value, i) => (
                      <TouchableOpacity
                        style={styles.modalItems}
                        key={i} onPress={() => {
                          setDifLvlId(value.difficulty_level)
                          setDifLvl_id(value.id)
                          setDifLvlModalVisible(!difLvlModalVisible)
                        }}>

                        <Text>{value.difficulty_level}</Text>


                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </Modal>
            </TouchableOpacity>
            : null}
        </View>
      </View>



      <View style={styles.viewOuter} >
        <View style={styles.viewInner}>
          <Text style={styles.textSel} >

            Select type
          </Text>
          <TouchableOpacity style={styles.touchableStyle}
            onPress={() => {
              setTypeModalVisible(!typeModalVisible)
              // setChapter(null)
              // setChapterId('')

            }}>

            <Text style={styles.textSel} >
              {typeId}
            </Text>

            <Modal
              animationType="slide"
              transparent={false}
              visible={typeModalVisible}
              onRequestClose={() => {
                setTypeModalVisible(!typeModalVisible);
              }}
            >
              <ScrollView >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60, paddingHorizontal: 7 }}>
                  <TouchableOpacity
                    onPress={() => setTypeModalVisible(!typeModalVisible)}
                    style={{ padding: 10, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(56, 62, 136, 0.1)', margin: 15, borderRadius: 25 }} >
                    <Text>
                      Close
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalItems}
                    onPress={() => {
                      setTypeId('Conceptual')
                      // getChapter(value.id)
                      setTypeModalVisible(!typeModalVisible)
                    }}>

                    <Text>Conceptual</Text>

                  </TouchableOpacity>


                  <TouchableOpacity
                    style={styles.modalItems}
                    onPress={() => {
                      setTypeId('Analytical')
                      // getChapter(value.id)
                      setTypeModalVisible(!typeModalVisible)
                    }}>

                    <Text>Analytical</Text>

                  </TouchableOpacity>


                  <TouchableOpacity
                    style={styles.modalItems}
                    onPress={() => {
                      setTypeId('Memory')
                      // getChapter(value.id)
                      setTypeModalVisible(!typeModalVisible)
                    }}>

                    <Text>Memory</Text>

                  </TouchableOpacity>


                </View>
              </ScrollView>
            </Modal>
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.viewOuter} >
        <View style={styles.viewInner}>
          <Text style={styles.textSel} >

            Select Dtp
          </Text>
          {dtp != null ?
            <TouchableOpacity style={styles.touchableStyle}
              onPress={() => {
                setDtpModalVisible(!dtpModalVisible)
                // setChapter(null)
                // setChapterId('')

              }}>
              <Text style={styles.textSel} >
                {dtpId}
              </Text>
              <Modal
                animationType="slide"
                transparent={false}
                visible={dtpModalVisible}
                onRequestClose={() => {
                  setDtpModalVisible(!dtpModalVisible);
                }}
              >
                <ScrollView >
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60, paddingHorizontal: 7 }}>
                    {/* <Button title="close" /> */}
                    <TouchableOpacity
                      onPress={() => setDtpModalVisible(!dtpModalVisible)}
                      style={{ padding: 10, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(56, 62, 136, 0.1)', margin: 15, borderRadius: 25 }} >
                      <Text>
                        Close
                      </Text>
                    </TouchableOpacity>
                    {dtp.map((value, i) => (
                      <TouchableOpacity
                        style={styles.modalItems}
                        key={i} onPress={() => {
                          setDtpId(value.name)
                          setDtp_id(value.id)
                          setDtpModalVisible(!dtpModalVisible)
                          console.log(value.id)
                        }}>

                        <Text>Dtp Name : {value.name}</Text>
                        <Text>Mobile Number : {value.mobile_number}</Text>
                        <Text>Subject : {value.subject}</Text>
                        <Text>Email id : {value.email}</Text>
                        {/* <Text>{value.id}</Text> */}


                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </Modal>
            </TouchableOpacity>
            : null}
        </View>
      </View>




      {/* <TextInput placeholder="Enter Exercise Number" style={styles.inp} value={exrcNo} onChangeText={setExrcNo}/> */}
      {/* <TextInput placeholder="Enter Question Number" style={styles.inp} value={quesNo} onChangeText={setQuesNo}/> */}


      {/* <Button title="Sent to Dtp"  /> */}

      <TouchableOpacity
        onPress={sendToDtp}
        style={{ padding: 10, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2A304E', margin: 15, borderRadius: 25, height: 50 }} >
        <Text style={styles.textSel} >
          Send To DTP
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
    // </ScrollView>
  )
}

export default DppInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inp: {
    width: width * 0.85,
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    marginVertical: 8
  },
  modalItems: {
    backgroundColor: 'rgba(56, 62, 136, 0.1)', margin: 5, width: '100%', padding: 8, borderRadius: 10, paddingHorizontal: 8
  },
  viewOuter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 70, paddingHorizontal: 30, backgroundColor: 'white'
  },
  viewInner: {
    flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#EA7A26', borderRadius: 25, paddingLeft: 10
  },
  touchableStyle: {
    flex: 1, height: 52, backgroundColor: '#2A304E', justifyContent: 'center', alignItems: 'center', borderRadius: 25
  },
  textSel: {
    paddingHorizontal: 12, color: 'white', fontWeight: '700'
  },

});
