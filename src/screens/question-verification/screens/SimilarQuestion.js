import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView, Modal } from 'react-native'
import styles from '../styles/similar-question'
import Feather from 'react-native-vector-icons/Feather'
import HeaderComponent from '../../../components/HeaderComponent'
import { Badge } from '../../dashboard/components/Badge'
import Accordian from '../components/Accordian'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { STYLES } from '../../../appStyles'
import ScrollToTop, { scrollToTop } from '../../../components/ScrollToTop'
import OptionTag from '../components/OptionTag'
import Option from '../components/Option'
import { GET_QUESTION_DETAILS, REJECT_QUESTION } from '../api'
import { width } from '../../../utils/config'
import MathJax from '../../../components/MathJax'
import { ActivityIndicatorComponent } from '../../../components/ActivityIndicatorComponent'
import { showRejectMessage } from '../utils'
import MathJaxSimilarQuestion from '../../../components/MathJaxSimilarQuestion'

const SimilarQuestion = (props) => {
    const { navigation, route } = props
    const prevScreenData = route?.params
    const {
        question_id,
        is_accepted,
        chapter_id,
        tag_ids,
        difficulty,
        feature_type,
        current_level,
        moveToNextQuestion,
        questionObject
    } = prevScreenData
    const scrollRef = useRef();

    const [loading, setLoading] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const [approveModal, setApproveModal] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({});

    const getQuestionDetails = async ({ questionId }) => {
        // console.log({ questionId })
        setLoading(true)
        const response = await GET_QUESTION_DETAILS({ questionId })
        // console.log('getQuestionDetails', JSON.stringify(response))
        // console.log('questionObject', JSON.stringify(questionObject))
        if (response?.status) {
            const { question, option1, option2, option3, option4, is_option1_correct, is_option2_correct, is_option3_correct, is_option4_correct, difficulty_level, question_type, feature_type, tag_ids, tag_names, chapter_name, chapter_assoc_id, duplicate_question_ids, duplicate_question_scores, fill_in_the_blank_answer, correct_option } = response?.payload[0]
            setCurrentQuestion(response?.payload[0])

            //question object is used below since a comparison must be made with respect to previous screen question and not the current question
            let options = []
            if (questionObject?.question_type == '1') {
                // if Objective
                options.push({ html: option1, selected: correct_option === '1', prevQuestionHtml: questionObject?.option1 })
                options.push({ html: option2, selected: correct_option === '2', prevQuestionHtml: questionObject?.option2 })
                options.push({ html: option3, selected: correct_option === '3', prevQuestionHtml: questionObject?.option3 })
                options.push({ html: option4, selected: correct_option === '4', prevQuestionHtml: questionObject?.option4 })
                setOptions(options)
            } else if (questionObject?.question_type == '2') {
                // if Multiple
                options.push({ html: option1, selected: is_option1_correct, prevQuestionHtml: questionObject?.option1 })
                options.push({ html: option2, selected: is_option2_correct, prevQuestionHtml: questionObject?.option2 })
                options.push({ html: option3, selected: is_option3_correct, prevQuestionHtml: questionObject?.option3 })
                options.push({ html: option4, selected: is_option4_correct, prevQuestionHtml: questionObject?.option4 })
                setOptions(options)
            } else if (questionObject?.question_type == '3') {
                // if Fill ups
                options.push({ html: fill_in_the_blank_answer, prevQuestionHtml: questionObject?.fill_in_the_blank_answer, selected: true, isFillUps: true })
                setOptions(options)
            }

            scrollToTop(scrollRef)
        } else {
            alert('Some error occured')
        }
        setLoading(false)
        setInitialLoading(false)
    }

    useEffect(() => {
        getQuestionDetails({ questionId: question_id })
    }, [])

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
                marked_duplicates: [question_id]
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
            const response = await REJECT_QUESTION({ params: bodyData })
            // console.log('similarRejectApi', JSON.stringify(response))

            if (response?.status) {
                showRejectMessage()
                navigation.goBack()
                moveToNextQuestion()
            } else {

            }
            setApproveModal(false)
        } catch (error) {
        }
        setLoading(false)
    }


    return (
        <SafeAreaView style={STYLES.safeAreaContainer}>
            <ActivityIndicatorComponent animating={loading} />
            <HeaderComponent
                text={'Check Similar Question'}
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

                        <Text style={styles.modalText}>Question is marked duplicate and will be rejected. Do you want to continue?</Text>

                        <View style={styles.approveRejectContainer}>
                            <TouchableOpacity style={styles.approveButton} onPress={() => setApproveModal(false)}>
                                <Text style={styles.approveText}>No</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.approveButton, { backgroundColor: '#2B3789', marginLeft: 10 }]} onPress={() => {
                                rejectApi()
                            }}>
                                <Text style={[styles.approveText, { color: 'white' }]}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {!initialLoading && <ScrollView
                ref={scrollRef}
                scrollsToTop={true}
                contentContainerStyle={styles.parentContainer}
            // nestedScrollEnabled={true}
            >

                <View style={{
                    paddingHorizontal: 20,
                    // paddingBottom: 40,
                    marginVertical: 20
                }}>
                    <MathJaxSimilarQuestion
                        questionObject={questionObject}
                        currentQuestion={currentQuestion}
                        options={options}
                    />

                    {/* <View style={styles.questionBorderContainer}>
                        <View style={styles.container}>
                            <View style={styles.questionContainer}>
                                <View>
                                    <Text style={[styles.heading]}>Question</Text>
                                </View>
                                <View style={styles.questionIdTextContainer}>
                                    <Text style={styles.questionIdText}>QID {questionObject?.question_id}</Text>
                                </View>
                            </View>

                            <OptionTag verify={true} style={[styles.tag, { marginVertical: 5, marginBottom: 0, maxWidth: '27%' }]} />

                            <View style={[styles.borderContainer, { borderWidth: 0, padding: 10, paddingHorizontal: 10 }]}>

                                <View style={{
                                    width: width * 0.75
                                }}>
                                    <MathJaxSimilarQuestion
                                        questionObject={questionObject?.question}
                                        currentQuestion={currentQuestion}
                                        options={options}
                                    />
                                </View>
                            </View>

                        </View>

                        <View style={styles.container}>
                            <View style={styles.questionContainer}>
                                <OptionTag verify={false} style={[styles.tag, { marginVertical: 5, marginBottom: 0, maxWidth: '62%' }]} text='Similar Question' />
                                <View style={[styles.questionIdTextContainer, { height: 25 }]}>
                                    <Text style={styles.questionIdText}>QID {question_id}</Text>
                                </View>
                            </View>


                            <View style={[styles.borderContainer, { borderWidth: 0, padding: 10, paddingHorizontal: 10 }]}>
                                <View style={{
                                    width: width * 0.75
                                }}>
                                    <MathJax
                                        content={currentQuestion?.question}
                                    />
                                </View>
                            </View>

                        </View>
                    </View> */}

                    {/* <FlatList
                        data={options}
                        renderItem={({ item, index }) => {
                            return <Option
                                item={item}
                                index={index}
                            />
                        }}
                    /> */}
                </View>
            </ScrollView>}

            {!initialLoading && <View style={{ backgroundColor: 'white', alignItems: 'center', paddingBottom: 10 }}>
                <Text style={[styles.approveText, { color: 'black', marginTop: 10 }]}>Is the question duplicate?</Text>

                <View style={styles.approveRejectContainer}>
                    <TouchableOpacity style={styles.approveButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.approveText}>No</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.approveButton, { backgroundColor: '#2B3789', marginLeft: 40 }]}
                        onPress={() => setApproveModal(true)}>
                        <Text style={[styles.approveText, { color: 'white' }]}>Yes</Text>
                    </TouchableOpacity>
                </View>
            </View>}
            <ScrollToTop
                scrollRef={scrollRef}
                style={{
                    bottom: 100
                }}
            />

        </SafeAreaView>
    )
}

export default SimilarQuestion;
