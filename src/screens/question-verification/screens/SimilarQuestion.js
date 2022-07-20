import React, { useEffect, useState, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import styles from "../styles/similar-question";
import Feather from "react-native-vector-icons/Feather";
import HeaderComponent from "../../../components/HeaderComponent";
import { Badge } from "../../dashboard/components/Badge";
import Accordian from "../components/Accordian";
import Fontisto from "react-native-vector-icons/Fontisto";
import { STYLES } from "../../../appStyles";
import ScrollToTop, { scrollToTop } from "../../../components/ScrollToTop";
import OptionTag from "../components/OptionTag";
import Option from "../components/Option";
import { GET_QUESTION_DETAILS, REJECT_QUESTION } from "../api";
import { width } from "../../../utils/config";
import MathJax from "../../../components/MathJax";
import { ActivityIndicatorComponent } from "../../../components/ActivityIndicatorComponent";
import { showRejectMessage } from "../utils";

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

const SimilarQuestion = (props) => {
  const { navigation, route } = props;
  const prevScreenData = route?.params;
  const {
    question_id,
    is_accepted,
    chapter_id,
    tag_ids,
    difficulty,
    feature_type,
    current_level,
    moveToNextQuestion,
    questionObject,
  } = prevScreenData;
  const scrollRef = useRef();

  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [approveModal, setApproveModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});

  const getQuestionDetails = async ({ questionId }) => {
    // console.log({ questionId })
    setLoading(true);
    const response = await GET_QUESTION_DETAILS({ questionId });
    console.log("1", JSON.stringify(response));
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
      setCurrentQuestion(response?.payload[0]);

      // set options to generate HTML content
      let options = [];
      option1 &&
        options.push({
          html: option1,
          selected: is_option1_correct,
          prevQuestionHtml: questionObject?.option1,
        });
      option2 &&
        options.push({
          html: option2,
          selected: is_option2_correct,
          prevQuestionHtml: questionObject?.option2,
        });
      option3 &&
        options.push({
          html: option3,
          selected: is_option3_correct,
          prevQuestionHtml: questionObject?.option3,
        });
      option4 &&
        options.push({
          html: option4,
          selected: is_option4_correct,
          prevQuestionHtml: questionObject?.option4,
        });
      setOptions(options);

      scrollToTop(scrollRef);
    } else {
      alert("Some error occured");
    }
    setLoading(false);
  };

  useEffect(() => {
    getQuestionDetails({ questionId: question_id });
  }, []);

  const rejectApi = async () => {
    setLoading(true);
    try {
      // let fileUrls = [];
      // if (attachmentFiles.length > 0) {
      //     const formData = new FormData();

      //     for (const file of attachmentFiles) {
      //         formData.append("file", file);
      //     }

      //     const uploadFilesRes = await UPLOAD_FILES({ params: formData });

      //     if (uploadFilesRes.status && Array.isArray(uploadFilesRes.payload)) {
      //         const uploadFilesUrls = uploadFilesRes.payload;

      //         fileUrls = [...uploadFilesUrls];
      //     }
      // }

      const bodyData = {
        question_id: questionObject.question_id,
        is_accepted,
        chapter_id,
        tag_ids,
        difficulty,
        feature_type,
        current_level,
        marked_duplicates: [question_id],
      };

      // if (rejectReasonText) {
      //     bodyData.faculty_feedback_text = rejectReasonText;
      // }

      // if (fileUrls.length > 0) {
      //     bodyData.faculty_feedback_images = fileUrls;
      // }

      // if (Array.isArray(data.marked_duplicates) && data.marked_duplicates.length > 0) {
      //     bodyData.marked_duplicates = [question_id]
      // }
      // console.log({ bodyData })
      const response = await REJECT_QUESTION({ params: bodyData });
      // console.log('similarRejectApi', JSON.stringify(response))

      if (response?.status) {
        showRejectMessage();
        navigation.goBack();
        moveToNextQuestion();
      } else {
      }
      setApproveModal(false);
    } catch (error) {}
    setLoading(false);
  };

  return (
    <SafeAreaView style={STYLES.safeAreaContainer}>
      <HeaderComponent
        text={"Check Similar Question"}
        onPress={navigation.goBack}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={approveModal}
        onRequestClose={() => setApproveModal(false)}
        // style={{ margin: 0, flex: 1 }}
      >
        <View style={styles.modalParentContainer}>
          <View style={styles.modalContainer}>
            <ActivityIndicatorComponent animating={loading} />

            <Text style={styles.modalText}>
              Question is marked duplicate and will be rejected. Do you want to
              continue?
            </Text>

            <View style={styles.approveRejectContainer}>
              <TouchableOpacity
                style={styles.approveButton}
                onPress={() => setApproveModal(false)}
              >
                <Text style={styles.approveText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.approveButton,
                  { backgroundColor: "#2B3789", marginLeft: 10 },
                ]}
                onPress={() => {
                  rejectApi();
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
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
        >
          <View style={styles.questionBorderContainer}>
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

              <OptionTag
                verify={true}
                style={[
                  styles.tag,
                  { marginVertical: 5, marginBottom: 0, maxWidth: "27%" },
                ]}
              />

              <View
                style={[
                  styles.borderContainer,
                  { borderWidth: 0, padding: 10, paddingHorizontal: 10 },
                ]}
              >
                {/* <Text style={styles.questionText}>During water absorption from the soil, the water potential of the root cell is than the soil?</Text> */}

                <View
                  style={{
                    width: width * 0.75,
                  }}
                >
                  <MathJax content={questionObject?.question} />
                </View>
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.questionContainer}>
                <OptionTag
                  verify={false}
                  style={[
                    styles.tag,
                    { marginVertical: 5, marginBottom: 0, maxWidth: "60%" },
                  ]}
                  text="Similar Question"
                />
                <View style={[styles.questionIdTextContainer, { height: 25 }]}>
                  <Text style={styles.questionIdText}>QID {question_id}</Text>
                </View>
              </View>

              <View
                style={[
                  styles.borderContainer,
                  { borderWidth: 0, padding: 10, paddingHorizontal: 10 },
                ]}
              >
                {/* <Text style={styles.questionText}>During water absorption from the soil, the water potential of the root cell is than the soil?</Text> */}
                <View
                  style={{
                    width: width * 0.75,
                  }}
                >
                  <MathJax content={currentQuestion?.question} />
                </View>
              </View>
            </View>
          </View>

          <FlatList
            data={options}
            renderItem={({ item, index }) => {
              return <Option item={item} index={index} />;
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          <Text style={[styles.approveText, { color: "black" }]}>
            Is the question duplicate?
          </Text>

          <View style={styles.approveRejectContainer}>
            <TouchableOpacity
              style={styles.approveButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.approveText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.approveButton,
                { backgroundColor: "#2B3789", marginLeft: 40 },
              ]}
              onPress={() => setApproveModal(true)}
            >
              <Text style={[styles.approveText, { color: "white" }]}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ScrollToTop scrollRef={scrollRef} />
    </SafeAreaView>
  );
};

export default SimilarQuestion;
