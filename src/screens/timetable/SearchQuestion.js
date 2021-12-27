import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Button,
  SafeAreaView,
  Alert,
  Switch,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {Picker} from '@react-native-picker/picker';
import Picker from "@gregfrench/react-native-wheel-picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RenderHtml from "react-native-render-html";
import dateFormat from 'dateformat'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 


import { width, height, ENDPOINT } from "../../utils/config";

var PickerItem = Picker.Item;

const SearchQuestion = ({ navigation, route }) => {
  //   const{question,image}= route.params

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // const [exrcNo, setExrcNo] = useState("");
  // const [quesNo, setQuesNo] = useState("");
  // const [tags, setTags] = useState("");

  const [isLoading,setIsLoading]= useState(false)

  const [languageId, setLanguageId] = useState("");
  const [ClassId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [difLvlId, setDifLvlId] = useState("");
  const [typeId, setTypeId] = useState("");


  const [lang_id, setLang_id] = useState("");
  const [class_id, setClass_id] = useState("");
  const [subject_id, setSubject_id] = useState("");
  const [chapter_id, setChapter_id] = useState("");
  const [difLvl_id, setDifLvl_id] = useState("");
 



  const [lang, setLang] = useState(null);
  const [Class, setClass] = useState(null);
  const [subject, setSubject] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [difLvl, setDifLvl] = useState(null);


  const [langModalVisible, setLangModalVisible] = useState(false);
  const [ClassModalVisible, setClassModalVisible] = useState(false);
  const [subjectModalVisible, setSubjectModalVisible] = useState(false);
  const [chapterModalVisible, setChapterModalVisible] = useState(false);
  const [difLvlModalVisible, setDifLvlModalVisible] = useState(false);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
 


  const [questionBank, setQuestionBank] = useState();

  const clearForm = () => {

    setLanguageId("");
    setClassId("");
    setSubjectId("");
    setChapterId("");
    setDifLvlId("");
    setTypeId("");
    setLang_id("");
    setClass_id("");
    setSubject_id("");
    setChapter_id("");
    setDifLvl_id("");
    
    setIsEnabled(false)

    // setLang(null);
    // setClass(null);
    // setSubject(null);
    // setChapter(null);
    // setDifLvl(null);
 
  };

  const getLanguage = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken);
    var requestOptions = {
      redirect: "follow",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
    };
    const response = await fetch(
      `${ENDPOINT}/support/get-languages/`,
      requestOptions
    );
    const D = await response.json();
    console.log(D);
    setLang(D);
  };

  const getClass = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken);
    var requestOptions = {
      redirect: "follow",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
    };
    const response = await fetch(
      `${ENDPOINT}/support/get-class/`,
      requestOptions
    );
    const D = await response.json();
    console.log(D);
    setClass(D);
  };

  const getSubject = async (id) => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken);
    var requestOptions = {
      redirect: "follow",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
    };
    const response = await fetch(
      `${ENDPOINT}/support/get-subject-class-binding/?class_id=${id}&is_main_subject=true`,
      requestOptions
    );
    const D = await response.json();
    console.log(D);
    setSubject(D);
  };

  const getBook = async (sub, class_id) => {
    const userToken = await AsyncStorage.getItem("userToken");
    var requestOptions = {
      redirect: "follow",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
    };
    const response = await fetch(
      `${ENDPOINT}/support/get-books-info/?class=${class_id}&subject=${sub}`,
      requestOptions
    );
    const D = await response.json();
    console.log(D);
    setBook(D);
  };

  const getChapter = async (sub) => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken);
    var requestOptions = {
      redirect: "follow",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
    };
    const response = await fetch(
      `${ENDPOINT}/support/get-chapters/?subject=${sub}`,
      requestOptions
    );
    const D = await response.json();
    console.log(D);
    setChapter(D);
  };

  const getDifLvl = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken);
    var requestOptions = {
      redirect: "follow",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
    };
    const response = await fetch(
      `${ENDPOINT}/support/get-difficulty/`,
      requestOptions
    );
    const D = await response.json();
    console.log(D);
    setDifLvl(D);
  };

  const getTags = async (ch) => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken);
    var requestOptions = {
      redirect: "follow",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
    };
    const response = await fetch(
      `${ENDPOINT}/support/get-tags/?chapter=${ch}`,
      requestOptions
    );
    const D = await response.json();
    console.log(D);
    setTag(D);
  };

  //   const getDtpInfo=async(ch)=>{
  //     const userToken = await AsyncStorage.getItem('userToken')
  //     console.log(userToken)
  //     var requestOptions = {
  //       redirect: 'follow',
  //       method:'GET',
  //       headers:{
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //           'Authorization': `Token ${userToken}`
  //       },
  //     };
  // const response = await fetch(`${ENDPOINT}/users/get-data-entry-users/`,requestOptions)
  // const D = await response.json();
  // console.log(D)
  // setDtp(D)
  //   }

  //not complete
  const sendToDtp = async () => {
    let formdata = new FormData();
    let l = 1;
    formdata.append("language", l);
    formdata.append(
      "question_number",
      "1"
      // quesNo
    );
    formdata.append(
      "exercise_number",
      "1"
      // exrcNo
    );
    formdata.append("class", class_id);
    formdata.append("subject", subject_id);
    formdata.append(
      "book",
      "21"
      // book_id
    );
    formdata.append(
      "chapter",
      "15"
      // chapter_id
    );
    formdata.append("message", "abc");
    formdata.append("pending_doubt_id", question.id);
    formdata.append("dte_id", dtp_id);
    formdata.append("level", typeId);
    formdata.append("difficulty", difLvl_id);
    // selectedTag.map((item)=>{ formdata.append('tag',item)})
    formdata.append("tag", "1");
    const response = await fetch(
      `${ENDPOINT}/support/allot-pending-doubt-dte/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formdata,
      }
    );
    const D = await response.json();
    console.log(D);
    clearForm();
    if (response.ok) {
      if (D.Success) {
        Alert.alert(`${D.Success}`);
        navigation.navigate("PendingDoubts");
      } else if (D.Error) {
        Alert.alert(`${D.Error}`);
      }
    } else {
      Alert.alert(`${D.Error}`);
    }
  };

  const getData = async () => {
    getLanguage();
    getClass();
    getDifLvl();
    // getSubject()
    // getBook('1')
    // getChapter()
    // getDtpInfo();
    // getType()
  };

  const getQuestionBank = async (ch) => {
    setIsLoading(true)
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      console.log(userToken);
      var requestOptions = {
        redirect: "follow",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
      };
      if(isEnabled){
        const response = await fetch(
          `${ENDPOINT}/student/get-objective-exam-questions-per-chapter/?chapter=${ch}&language=${lang_id}&difficulty_level=${difLvl_id}&question_type=${typeId}&verified=true&solution_video=true`,
          requestOptions
        );
        const D = await response.json();
        console.log(D, "quesBank");
        setQuestionBank(D);
        setIsLoading(false)
      }else{
        const response = await fetch(
          `${ENDPOINT}/student/get-objective-exam-questions-per-chapter/?chapter=${ch}&language=${lang_id}&difficulty_level=${difLvl_id}&question_type=${typeId}&verified=true`,
          requestOptions
        );
        const D = await response.json();
        console.log(D, "quesBank");
        setQuestionBank(D);
        setIsLoading(false)
      }
      // const D = await response.json();
      // console.log(D, "quesBank");
      // setQuestionBank(D);
    } catch (err) {
      Alert.alert(`${err}`);
      setIsLoading(false)
    }
  };

  


  useEffect(() => {
    getData();
  }, []);

  if(isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
        <ActivityIndicator size='large' color='blue'/>
        </View>
    )
  }

  if (questionBank != null && questionBank.length == 0) {
    return (
      <View style={styles.container}>
        <View style={{width:'100%',justifyContent:'center',alignItems:'flex-end'}} >
        <TouchableOpacity 
        onPress={() => setQuestionBank(null)}
        style={{padding:5}} >
        <Entypo name="circle-with-cross" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* <Button title="back" onPress={() => setQuestionBank(null)} /> */}
        <Text>No Questions Found</Text>
      </View>
    );
  }

  if (questionBank != null && questionBank.length != 0) {
    return (
      <View style={styles.container}>

        <View style={{width:'100%',justifyContent:'center',alignItems:'flex-end'}} >
        <TouchableOpacity 
        onPress={() => setQuestionBank(null)}
        style={{padding:5}} >
        <Entypo name="circle-with-cross" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* <Button title="back" onPress={() => setQuestionBank(null)} /> */}
        <ScrollView style={{flex:1}}>
        {questionBank.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                borderWidth: 2,
                borderColor: "black",
                marginVertical:3,
                paddingVertical:5
              }}
            >
              <Text>Question {index+1} : </Text>
              <RenderHtml
                contentWidth={width-10}
                source={{ html: item.question_text }}
                // ignoredStyles={["font-family"]}
                ignoredDomTags={['font']}

              />
              {item.correct_option === "1" ? (
                <View style={{ borderWidth: 1, borderColor: "green" ,width:'96%',marginHorizontal:'2%',justifyContent:'center',alignItems: 'center',}}>
                  <RenderHtml
                    contentWidth={width-10}
                    source={{ html: item.option1_text }}
                    // ignoredStyles={["font-family"]}
                    ignoredDomTags={['font']}

                  />
                </View>
              ) : (
                <View style={{ borderWidth: 1, borderColor: "red" ,width:'96%',marginHorizontal:'2%',justifyContent:'center',alignItems: 'center',}}>
                  <RenderHtml
                    contentWidth={width-10}
                    source={{ html: item.option1_text }}
                    // ignoredStyles={["font-family"]}
                    ignoredDomTags={['font']}

                  />
                </View>
              )}

              {/* <RenderHtml
                contentWidth={width}
                source={{ html: item.option2_text }}
                ignoredStyles={["font-family"]}
              /> */}
              {item.correct_option === "2" ? (
                <View style={{ borderWidth: 1, borderColor: "green" ,width:'96%',marginHorizontal:'2%',justifyContent:'center',alignItems: 'center',}}>
                  <RenderHtml
                    contentWidth={width-10}
                    source={{ html: item.option2_text }}
                    // ignoredStyles={["font-family"]}
                    ignoredDomTags={['font']}

                  />
                </View>
              ) : (
                <View style={{ borderWidth: 1, borderColor: "red" ,width:'96%',marginHorizontal:'2%',justifyContent:'center',alignItems: 'center',}}>
                  <RenderHtml
                    contentWidth={width-10}
                    source={{ html: item.option2_text }}
                    // ignoredStyles={["font-family"]}
                    ignoredDomTags={['font']}

                  />
                </View>
              )}

              {/* <RenderHtml
                contentWidth={width}
                source={{ html: item.option3_text }}
                ignoredStyles={["font-family"]}
              /> */}

              {item.correct_option === "3" ? (
                <View style={{ borderWidth: 1, borderColor: "green" ,width:'96%',marginHorizontal:'2%',justifyContent:'center',alignItems: 'center',}}>
                  <RenderHtml
                    contentWidth={width-10}
                    source={{ html: item.option3_text }}
                    // ignoredStyles={["font-family"]}
                    ignoredDomTags={['font']}

                  />
                </View>
              ) : (
                <View style={{ borderWidth: 1, borderColor: "red" ,width:'96%',marginHorizontal:'2%',justifyContent:'center',alignItems: 'center',}}>
                  <RenderHtml
                    contentWidth={width-10}
                    source={{ html: item.option3_text }}
                    // ignoredStyles={["font-family"]}
                    ignoredDomTags={['font']}

                  />
                </View>
              )}
              
              {/* <RenderHtml
                contentWidth={width}
                source={{ html: item.option4_text }}
                ignoredStyles={["font-family"]}
              /> */}
              {item.correct_option === "4" ? (
                <View style={{ borderWidth: 1, borderColor: "green" ,width:'96%',marginHorizontal:'2%',justifyContent:'center',alignItems: 'center',}}>
                  <RenderHtml
                    contentWidth={width-10}
                    source={{ html: item.option4_text }}
                    // ignoredStyles={["font-family"]}
                    ignoredDomTags={['font']}

                  />
                </View>
              ) : (
                <View style={{ borderWidth: 1, borderColor: "red" ,width:'96%',marginHorizontal:'2%',justifyContent:'center',alignItems: 'center',}}>
                  <RenderHtml
                    contentWidth={width-10}
                    source={{ html: item.option4_text }}
                    // ignoredStyles={["font-family"]}
                    ignoredDomTags={['font']}
                  />
                </View>
              )}

            <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start',marginTop:5}} >
              <Text>Difficulty : {item.difficulty_level}</Text> 
              <Text>Concept Id : {item.level_i}</Text> 
              <Text>Created on : {dateFormat(item.created_on)}</Text>  
              <Text>Chapter Name : {item.chapter_name}</Text> 
              <Text>Tags : </Text>
              <View style={{flex:1,justifyContent:'flex-start',alignItems: 'flex-start',}} >
              {item.tags.map((Item)=>(
                                        <Text>
                                            {Item.tag_name}
                                        </Text>
                                    ))}
                                    </View>
              </View>
              {item.solution_video!=null?
              // <Button title='view video solution' onPress={()=>
                
              //     navigation.navigate('ViewRecording',{link:item.solution_video})
              //     // console.log('go to recording')
              // } />
              <TouchableOpacity 
              onPress={()=>navigation.navigate('ViewRecording',{link:item.solution_video})}
              style={{justifyContent:'center',alignItems: 'center',padding:6,paddingHorizontal:20,backgroundColor:'rgba(56, 62, 136, 0.1)',borderRadius: 25,marginVertical:5}} >
                <Text>
                  View Video Solution
                </Text>
                </TouchableOpacity>
              :null}
            </View>
          );
        }
        )}
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView >
    <SafeAreaView style={styles.container}>
      {/* <Text>Enter Dpp info</Text> */}
      {/* <TextInput style={styles.inp} value={} onChangeText={} />
            <TextInput style={styles.inp} value={} onChangeText={} />
            <TextInput style={styles.inp} value={} onChangeText={} /> */}
      
      <View style={{width:'100%',justifyContent:'center',alignItems:'flex-end'}} >
        <TouchableOpacity 
        onPress={() =>clearForm() }
        style={{padding:8}} >
        <Ionicons name="refresh" size={30} color="black" />
          </TouchableOpacity>
        </View>

      <View style={styles.viewOuter}>
        <View style={styles.viewInner}>
          <Text style={styles.textSel}>Select lang</Text>
          {lang != null && lang !== [] ? (
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={() => setLangModalVisible(!langModalVisible)}
            >
              <Text style={styles.textSel}>{languageId}</Text>
              <Modal
                animationType="slide"
                transparent={false}
                visible={langModalVisible}
                onRequestClose={() => {
                  setLangModalVisible(!langModalVisible);
                }}
              >
                <ScrollView>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 60,
                      paddingHorizontal: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setLangModalVisible(!langModalVisible)}
                      style={{
                        padding: 10,
                        paddingHorizontal: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(56, 62, 136, 0.1)",
                        margin: 15,
                        borderRadius: 25,
                      }}
                    >
                      <Text>Close</Text>
                    </TouchableOpacity>
                    {lang.map((value, i) => (
                      <TouchableOpacity
                        key={i}
                        style={styles.modalItems}
                        onPress={() => {
                          setLanguageId(value.language);
                          setLang_id(value.id);
                          setLangModalVisible(!langModalVisible);
                        }}
                      >
                        <Text>{value.language}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </Modal>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.viewOuter}>
        <View style={styles.viewInner}>
          <Text style={styles.textSel}>Select Class</Text>
          {Class != null && Class !== [] ? (
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={() => {
                setClassModalVisible(!ClassModalVisible);
                setSubjectId("");
                setSubject(null);
              }}
            >
              <Text style={styles.textSel}>{ClassId}</Text>

              <Modal
                animationType="slide"
                transparent={false}
                visible={ClassModalVisible}
                onRequestClose={() => {
                  setClassModalVisible(!ClassModalVisible);
                }}
              >
                <ScrollView>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 60,
                      paddingHorizontal: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setClassModalVisible(!ClassModalVisible)}
                      style={{
                        padding: 10,
                        paddingHorizontal: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(56, 62, 136, 0.1)",
                        margin: 15,
                        borderRadius: 25,
                      }}
                    >
                      <Text>Close</Text>
                    </TouchableOpacity>
                    {Class.map((value, i) => (
                      <TouchableOpacity
                        style={styles.modalItems}
                        key={i}
                        onPress={() => {
                          setClassId(value.class_name);
                          setClass_id(value.id);
                          setSubject_id(value.id);
                          getSubject(value.id);
                          setClassModalVisible(!ClassModalVisible);
                        }}
                      >
                        <Text>{value.class_name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </Modal>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {subject != null && Class != null && ClassId !== "" ? (
        <View style={styles.viewOuter}>
          <View style={styles.viewInner}>
            <Text style={styles.textSel}>Select Subject</Text>
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={() => {
                setSubjectModalVisible(!subjectModalVisible);
                setChapter(null);
                setChapterId("");
                setChapter_id("");
              }}
            >
              <Text style={styles.textSel}>{subjectId}</Text>
              <Modal
                animationType="slide"
                transparent={false}
                visible={subjectModalVisible}
                onRequestClose={() => {
                  setSubjectModalVisible(!subjectModalVisible);
                }}
              >
                <ScrollView>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 60,
                      paddingHorizontal: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        setSubjectModalVisible(!subjectModalVisible)
                      }
                      style={{
                        padding: 10,
                        paddingHorizontal: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(56, 62, 136, 0.1)",
                        margin: 15,
                        borderRadius: 25,
                      }}
                    >
                      <Text>Close</Text>
                    </TouchableOpacity>
                    {subject.map((value, i) => (
                      <TouchableOpacity
                        style={styles.modalItems}
                        key={i}
                        onPress={() => {
                          setSubjectId(value.subject_name);
                          setSubject_id(value.id);
                          // getBook(value.id,class_id)
                          getChapter(value.id);
                          setSubjectModalVisible(!subjectModalVisible);
                        }}
                      >
                        <Text>{value.subject_name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </Modal>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {/* <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width,height:70,paddingHorizontal:30}} >
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
</View> */}

      {chapter != null && subjectId != "" && ClassId != "" ? (
        <View style={styles.viewOuter}>
          <View style={styles.viewInner}>
            <Text style={styles.textSel}>Select Chapter</Text>
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={() => {
                setChapterModalVisible(!chapterModalVisible);
                // setChapter(null)
                // setChapterId('')
              }}
            >
              {/* <View style={{width:120,height:52,backgroundColor:'red',justifyContent:'center',alignItems: 'center',borderRadius:12}} > */}
              <Text style={styles.textSel}>{chapterId}</Text>

              {/* </View> */}
              <Modal
                animationType="slide"
                transparent={false}
                visible={chapterModalVisible}
                onRequestClose={() => {
                  setChapterModalVisible(!chapterModalVisible);
                }}
              >
                <ScrollView>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 60,
                      paddingHorizontal: 7,
                    }}
                  >
                    <Button
                      title="close"
                      onPress={() =>
                        setChapterModalVisible(!chapterModalVisible)
                      }
                    />
                    {chapter.map((value, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          setChapterId(value.chapter_name);
                          setChapter_id(value.id);
                          // getTags(value.id)
                          setChapterModalVisible(!chapterModalVisible);
                        }}
                        style={styles.modalItems}
                      >
                        <Text>{value.chapter_name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </Modal>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {/* </View> */}

      {/* 
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
</View> */}

      <View style={styles.viewOuter}>
        <View style={styles.viewInner}>
          <Text style={styles.textSel}>Select Difficulty level</Text>
          {difLvl != null ? (
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={() => {
                setDifLvlModalVisible(!difLvlModalVisible);
                // setChapter(null)
                // setChapterId('')
              }}
            >
              <Text style={styles.textSel}>{difLvlId}</Text>

              <Modal
                animationType="slide"
                transparent={false}
                visible={difLvlModalVisible}
                onRequestClose={() => {
                  setDifLvlModalVisible(!difLvlModalVisible);
                }}
              >
                <ScrollView>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 60,
                      paddingHorizontal: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                      setDifLvlModalVisible(!difLvlModalVisible)
                      setDifLvl_id('');
                      setDifLvlId('')
                      }}
                      style={{
                        padding: 10,
                        paddingHorizontal: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(56, 62, 136, 0.1)",
                        margin: 15,
                        borderRadius: 25,
                      }}
                    >
                      <Text>Close</Text>
                    </TouchableOpacity>
                    {difLvl.map((value, i) => (
                      <TouchableOpacity
                        style={styles.modalItems}
                        key={i}
                        onPress={() => {
                          setDifLvlId(value.difficulty_level);
                          setDifLvl_id(value.id);
                          setDifLvlModalVisible(!difLvlModalVisible);
                        }}
                      >
                        <Text>{value.difficulty_level}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </Modal>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.viewOuter}>
        <View style={styles.viewInner}>
          <Text style={styles.textSel}>Select Concept Id</Text>
          <TouchableOpacity
            style={styles.touchableStyle}
            onPress={() => {
              setTypeModalVisible(!typeModalVisible);
              // setChapter(null)
              // setChapterId('')
            }}
          >
            <Text style={styles.textSel}>{typeId}</Text>

            <Modal
              animationType="slide"
              transparent={false}
              visible={typeModalVisible}
              onRequestClose={() => {
                setTypeModalVisible(!typeModalVisible);
              }}
            >
              <ScrollView>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 60,
                    paddingHorizontal: 7,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                    setTypeModalVisible(!typeModalVisible)
                    setTypeId('')
                    }}
                    style={{
                      padding: 10,
                      paddingHorizontal: 15,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(56, 62, 136, 0.1)",
                      margin: 15,
                      borderRadius: 25,
                    }}
                  >
                    <Text>Close</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalItems}
                    onPress={() => {
                      setTypeId("Conceptual");
                      // getChapter(value.id)
                      setTypeModalVisible(!typeModalVisible);
                    }}
                  >
                    <Text>Conceptual</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalItems}
                    onPress={() => {
                      setTypeId("Analytical");
                      // getChapter(value.id)
                      setTypeModalVisible(!typeModalVisible);
                    }}
                  >
                    <Text>Analytical</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalItems}
                    onPress={() => {
                      setTypeId("Memory");
                      // getChapter(value.id)
                      setTypeModalVisible(!typeModalVisible);
                    }}
                  >
                    <Text>Memory</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Modal>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'center',paddingHorizontal:'5%',width:'100%',alignItems: 'center',marginVertical:7}} >
        <Text style={{fontWeight:'600',marginRight:15}} >
          Video Solution Compulsary ?
          </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#EA7A26" }}
        thumbColor={isEnabled ? "#2A304E" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>

      {/* <View style={styles.viewOuter} >
  <View style={styles.viewInner}>    
  <Text style={styles.textSel} >

     Select Dtp
  </Text>
  {dtp!=null?
   <TouchableOpacity style={styles.touchableStyle}  
    onPress={()=>{
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
                  <View style={{flex:1,justifyContent:'center',alignItems: 'center',paddingTop:60,paddingHorizontal:7}}>
                
                  <TouchableOpacity 
                  onPress={()=>setDtpModalVisible(!dtpModalVisible)}
                  style={{padding:10,paddingHorizontal:15,justifyContent:'center',alignItems: 'center',backgroundColor:'rgba(56, 62, 136, 0.1)',margin:15,borderRadius:25}} >
                    <Text>
                      Close
                    </Text>
                  </TouchableOpacity>
{dtp.map((value, i) => (
            <TouchableOpacity 
            style={styles.modalItems}
             key={i} onPress={()=>{
              setDtpId(value.name)
              setDtp_id(value.id)
              setDtpModalVisible(!dtpModalVisible)
              console.log(value.id)
              }}>

            <Text>Dtp Name : {value.name}</Text>
            <Text>Mobile Number : {value.mobile_number}</Text>
            <Text>Subject : {value.subject}</Text>
            <Text>Email id : {value.email}</Text>
           
   

            </TouchableOpacity>
          ))}
          </View>
          </ScrollView>
</Modal>
  </TouchableOpacity>
  :null}
  </View>
</View> */}

      {/* <TextInput placeholder="Enter Exercise Number" style={styles.inp} value={exrcNo} onChangeText={setExrcNo}/> */}
      {/* <TextInput placeholder="Enter Question Number" style={styles.inp} value={quesNo} onChangeText={setQuesNo}/> */}

      {/* <Button title="Sent to Dtp"  /> */}

      <TouchableOpacity
        onPress={() =>
          chapter_id != ""
            ? getQuestionBank(chapter_id)
            : Alert.alert("select a chapter first")
        }
        style={{
          padding: 10,
          paddingHorizontal: 15,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2A304E",
          margin: 15,
          borderRadius: 25,
          height: 50,
        }}
      >
        <Text style={styles.textSel}>Search Question</Text>
      </TouchableOpacity>
     
    </SafeAreaView>
    </ScrollView>
  );
};

export default SearchQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inp: {
    width: width * 0.85,
    backgroundColor: "#E9E9E9",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    marginVertical: 8,
  },
  modalItems: {
    backgroundColor: "rgba(56, 62, 136, 0.1)",
    margin: 5,
    width: "100%",
    padding: 8,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  viewOuter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 70,
    paddingHorizontal: 30,
    backgroundColor: "white",
  },
  viewInner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EA7A26",
    borderRadius: 25,
    paddingLeft: 10,
  },
  touchableStyle: {
    flex: 1,
    height: 52,
    backgroundColor: "#2A304E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  textSel: {
    paddingHorizontal: 12,
    color: "white",
    fontWeight: "700",
  },
});
