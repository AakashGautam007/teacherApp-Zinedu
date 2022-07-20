import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { STYLES } from "../../../appStyles";
import { ActivityIndicatorComponent } from "../../../components/ActivityIndicatorComponent";
import HeaderComponent from "../../../components/HeaderComponent";
import MathJax from "../../../components/MathJax";
import ScrollToTop, { scrollToTop } from "../../../components/ScrollToTop";
import { width } from "../../../utils/config";
import {
  APPROVE_QUESTION,
  GET_L3_QUESTION_IDS,
  GET_QUESTION_DETAILS,
  GET_QUESTION_IDS,
  REJECT_QUESTION,
} from "../api";
import CheckQuestionOption from "../components/CheckQuestionOption";
import styles from "../styles/check-question";
import {
  getCurrentLevel,
  getKeyByValueFromMap,
  showApproveMessage,
  showRejectMessage,
} from "../utils";

const response = [
  {
    option: "Option A",
    badge: "9",
    question: "",
    answer: "",
  },
  {
    option: "Option B",
    badge: "9",
    question: "",
    answer: "",
  },
  {
    option: "Option C",
    badge: "9",
    question: "",
    answer: "",
  },
  {
    option: "Option D",
    badge: "9",
    question: "",
    answer: "",
  },
];

const CheckQuestion = (props) => {
  const { navigation, route } = props;
  const prevScreenData = route?.params || {};
  const { title } = prevScreenData;
  const scrollRef = useRef();

  const [loading, setLoading] = useState(true);
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [options, setOptions] = useState([]);
  const [questionObject, setQuestionObject] = useState({});
  const [questionIdsArray, setQuestionIdsArray] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState("");
  const [skipQuestionIdArray, setSkipQuestionIdArray] = useState([]);

  const resetModal = () => {
    setApproveModal(false);
    setRejectModal(false);
  };

  const getQuestionIds = async () => {
    // console.log('getQuestionIds')
    // const response = await GET_QUESTION_IDS({ subjectId: 2, chapterId: 824 })
    const response = await GET_L3_QUESTION_IDS();
    // console.log('getQuestionIds', JSON.stringify(response))
    if (response?.status) {
      let questionIdsArray = [...response?.payload];
      // console.log('getQuestionIds', { questionIdsArray })
      if (questionIdsArray?.length) {
        getQuestionDetails({ questionId: questionIdsArray[0] });
      }
      setQuestionIdsArray([...questionIdsArray]);
      // removing the first index since its used to call the api above, see the skip button onpress
      questionIdsArray.splice(0, 1);
      setSkipQuestionIdArray([...questionIdsArray]);
    } else {
      setLoading(false);
    }
  };

  const getQuestionDetails = async ({ questionId }) => {
    // console.log({ questionId })
    setLoading(true);
    const response = await GET_QUESTION_DETAILS({ questionId });
    // console.log('getQuestionDetails', JSON.stringify(response))
    if (response?.status) {
      const {
        question,
        option1,
        option2,
        option3,
        option4,
        is_option1_correct,
        is_option2_correct,
        is_option3_correct,
        is_option4_correct,
        difficulty_level,
        question_type,
        feature_type,
        tag_ids,
        tag_names,
        chapter_name,
        chapter_assoc_id,
        duplicate_question_ids,
        duplicate_question_scores,
      } = response?.payload[0];
      setQuestionId(questionId);
      setQuestionObject(response?.payload[0]);

      // set options to generate HTML content
      let options = [];
      option1 && options.push({ html: option1, selected: is_option1_correct });
      option2 && options.push({ html: option2, selected: is_option2_correct });
      option3 && options.push({ html: option3, selected: is_option3_correct });
      option4 && options.push({ html: option4, selected: is_option4_correct });
      setOptions(options);

      scrollToTop(scrollRef);
    } else {
      alert("Some error occured");
    }
    setLoading(false);
  };

  useEffect(() => {
    getQuestionIds();
  }, []);

  const moveToNextQuestion = () => {
    questionIdsArray.splice(
      questionIdsArray.indexOf(Number(questionObject?.question_id)),
      1
    );
    if (questionIdsArray.length != 0) {
      if (questionIdsArray?.length) {
        getQuestionDetails({ questionId: questionIdsArray[0] });
      }
      setQuestionIdsArray([...questionIdsArray]);
      // removing the first index since its used to call the api above, see the skip button onpress
      questionIdsArray.splice(0, 1);
      setSkipQuestionIdArray([...questionIdsArray]);
    } else {
      navigation.pop(1);
    }
    resetModal();
  };

  const approveApi = async () => {
    setLoading(true);
    try {
      const params = {
        question_id: questionObject?.question_id,
        is_accepted: true, // TODO: Change backend to accept boolean
        chapter_id: questionObject?.chapter_assoc_id,
        tag_ids: questionObject?.tag_ids,
        difficulty: questionObject?.difficulty_level,
        feature_type: questionObject?.feature_type,
        current_level: "3",
      };
      const response = await APPROVE_QUESTION({ params });
      // console.log('approveApi', JSON.stringify(response))
      if (response?.status) {
        showApproveMessage();
        moveToNextQuestion();
      } else {
      }
    } catch (e) {
      console.log("approve catch", e);
    }
    setLoading(false);
  };

  const rejectApi = async () => {
    setLoading(true);
    try {
      const bodyData = {
        question_id: questionObject?.question_id,
        is_accepted: false,
        chapter_id: questionObject?.chapter_assoc_id,
        tag_ids: questionObject?.tag_ids,
        difficulty: questionObject?.difficulty_level,
        feature_type: questionObject?.feature_type,
        current_level: "3",
      };

      // console.log({ bodyData })

      // if (Array.isArray(data.marked_duplicates) && data.marked_duplicates.length > 0) {
      //     bodyData.marked_duplicates = data.marked_duplicates;
      // }

      const response = await REJECT_QUESTION({ params: bodyData });
      // console.log('rejectApi', JSON.stringify(response))
      if (response?.status) {
        showRejectMessage();
        moveToNextQuestion();
      } else {
      }
    } catch (error) {
      console.log("reject catch", e);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={STYLES.safeAreaContainer}>
      <ActivityIndicatorComponent animating={loading} />
      <HeaderComponent text={"Check Question"} onPress={navigation.goBack} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={approveModal || rejectModal}
        onRequestClose={resetModal}
        // style={{ margin: 0, flex: 1 }}
      >
        <View style={styles.modalParentContainer}>
          <View style={styles.modalContainer}>
            <ActivityIndicatorComponent animating={loading} />

            <Text style={styles.modalText}>
              Are you sure you want to
              {approveModal ? " approve" : " reject"} this question?
            </Text>

            <View style={styles.approveRejectContainer}>
              <TouchableOpacity
                style={styles.approveButton}
                onPress={resetModal}
              >
                <Text style={styles.approveText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.approveButton,
                  { backgroundColor: "#2B3789", marginLeft: 10 },
                ]}
                onPress={() => {
                  if (approveModal) {
                    approveApi();
                  } else {
                    rejectApi();
                  }
                }}
              >
                <Text style={[styles.approveText, { color: "white" }]}>
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView
        ref={scrollRef}
        scrollsToTop={true}
        contentContainerStyle={styles.parentContainer}
        // nestedScrollEnabled={true}
      >
        <View style={styles.container}>
          <View style={styles.questionContainer}>
            <View>
              <Text style={[styles.heading]}>Question</Text>
            </View>
            <View style={styles.questionIdTextContainer}>
              <Text style={styles.questionIdText}>
                QID {questionObject?.question_id}
              </Text>
            </View>
          </View>

          {/* <Text style={styles.questionText}>During water absorption from the soil, the water potential of the root cell is than the soil?</Text> */}
          {questionObject?.question && (
            <View
              style={{
                width: width * 0.75,
              }}
            >
              <MathJax content={questionObject?.question} />
            </View>
          )}
        </View>

        <FlatList
          data={options}
          renderItem={({ item, index }) => {
            return <CheckQuestionOption item={item} index={index} />;
          }}
        />

        <View style={styles.container}>
          <View>
            <Text style={[styles.heading]}>Solution</Text>
          </View>

          {/* <Text style={styles.questionText}>During water absorption from the soil, the water potential of the root cell is than the soil?</Text> */}
          {questionObject?.solution?.length > 0 && (
            <View
              style={{
                width: width * 0.75,
              }}
            >
              <MathJax content={questionObject?.solution} />
            </View>
          )}
        </View>
      </ScrollView>

      <View
        style={{
          backgroundColor: "white",
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        <View style={styles.approveRejectContainer}>
          <TouchableOpacity
            style={styles.approveButton}
            onPress={() => setRejectModal(true)}
          >
            <Text style={styles.approveText}>Reject</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.approveButton,
              { backgroundColor: "#2B3789", marginLeft: 40 },
            ]}
            onPress={() => setApproveModal(true)}
          >
            <Text style={[styles.approveText, { color: "white" }]}>
              Approve
            </Text>
          </TouchableOpacity>
        </View>

        {questionIdsArray.length > 1 && (
          <TouchableOpacity
            onPress={() => {
              let tempArray = [];
              if (skipQuestionIdArray.length) {
                tempArray = [...skipQuestionIdArray];
              } else {
                tempArray = [...questionIdsArray];
              }
              let questionId = tempArray?.splice(0, 1);
              getQuestionDetails({ questionId });
              setSkipQuestionIdArray([...tempArray]);
            }}
          >
            <Text style={styles.approveText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollToTop scrollRef={scrollRef} style={{ bottom: 100 }} />
    </SafeAreaView>
  );
};

export default CheckQuestion;
