import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { STYLES } from '../../../appStyles'
import HeaderComponent from '../../../components/HeaderComponent'
import ScrollToTop, { scrollToTop } from '../../../components/ScrollToTop'
import CheckQuestionOption from '../components/CheckQuestionOption'
import QuestionListOption from '../components/QuestionListOption'
import styles from '../styles/question-list'
import SimilarQuestionItem from '../components/SimilarQuestionItem'
import AntDesign from 'react-native-vector-icons/AntDesign'
import OptionTag from '../components/OptionTag'
import Tag from '../components/Tag'
import DifficultyLevel from '../components/DifficultyLevel'
import DifficultyLevelModal from '../components/DifficultyLevelModal'
import Title from '../components/Title'
import InfoText from '../components/InfoText'
import FeatureTag from '../components/FeatureTag'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Octicons from 'react-native-vector-icons/Octicons'
import SelectedTag from '../components/SelectedTag'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CheckboxTag from '../components/CheckboxTag'
import DropDownPicker from 'react-native-dropdown-picker'
import { APPROVE_QUESTION, GET_CHAPTER_LIST, GET_QUESTION_DETAILS, GET_QUESTION_IDS, GET_TAG_LIST, REJECT_QUESTION, UPLOAD_FILES } from '../api'
import { FEATURE_TYPE, getCurrentLevel, getKeyByValueFromMap, QUESTION_TYPE } from '../utils'
import MathJax from '../../../components/MathJax'
import { width } from '../../../utils/config'
import { ActivityIndicatorComponent } from '../../../components/ActivityIndicatorComponent'
import { AttachmentButton } from '../components/AttachmentComponents'
import DocumentPicker from 'react-native-document-picker'
import { fileToApiFormat } from '../../../AppUtils/commonUtils'

const response = [
    {
        option: 'Option A',
        badge: '9',
        question: '',
        answer: ''
    },
    {
        option: 'Option B',
        badge: '9',
        question: '',
        answer: ''
    },
    {
        option: 'Option C',
        badge: '9',
        question: '',
        answer: ''
    },
    {
        option: 'Option D',
        badge: '9',
        question: '',
        answer: ''
    }
]

const QuestionList = (props) => {
    const { navigation, route } = props
    const prevScreenData = route?.params || {}
    const { title, subjectId, chapterId } = prevScreenData

    const [loading, setLoading] = useState(false);
    const [L1, setL1] = useState([]);
    const [L2, setL2] = useState([]);
    const [attachmentFiles, setAttachmentFiles] = useState([]);
    const [approveModal, setApproveModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [tagModal, setTagModal] = useState(false);
    const [selectedDifficulty, setSelectedDifficulty] = useState(1);
    const [modalSelectedDifficulty, setModalSelectedDifficulty] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [rejectReasonText, setRejectReasonText] = useState('');
    const [questionIdsArray, setQuestionIdsArray] = useState([]);
    const [skipQuestionIdArray, setSkipQuestionIdArray] = useState([]);
    const [questionId, setQuestionId] = useState('');
    const [featureList, setFeatureList] = useState([]);
    const [selectedFeature, setSelectedFeature] = useState('');
    const [modalSelectedFeature, setModalSelectedFeature] = useState('');
    const [selectedModalFeature, setSelectedModalFeature] = useState('');
    const [questionObject, setQuestionObject] = useState({});
    const [options, setOptions] = useState([]);
    const [duplicateQuestions, setDuplicateQuestions] = useState([]);
    const [visitedQuestionObject, setVisitedQuestionObject] = useState({});
    // const [tagList, setTagList] = useState([]);

    const [modalSelectedTags, setModalSelectedTags] = useState([]);
    const [modalTagList, setModalTagList] = useState([]);
    const [fullModalTagList, setFullModalTagList] = useState([]);
    const [tempModalSelectedTags, setTempModalSelectedTags] = useState({});

    const [chapterName, setChapterName] = useState('');
    const [modalChapterName, setModalChapterName] = useState('');
    const [selectedChapterId, setSelectedChapterId] = useState();
    const [modalSelectedChapterId, setModalSelectedChapterId] = useState();
    const [modalChapterList, setModalChapterList] = useState([]);
    // console.log({ subjectId, chapterId })

    const scrollRef = useRef();

    const resetModal = () => {
        setApproveModal(false);
        setRejectModal(false);
    }


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Chapter 1', value: 'Chapter 1' },
        { label: 'Chapter 2', value: 'Chapter 2' }
    ]);

    const getQuestionIds = async () => {
        // console.log({ subjectId, chapterId })
        const response = await GET_QUESTION_IDS({ subjectId, chapterId })
        // console.log('getQuestionIds', JSON.stringify(response))
        if (response?.status) {
            const { L1, L2 } = response?.payload[0]
            let questionIdsArray = [...L1, ...L2]
            setL1(L1)
            setL2(L2)
            // console.log('getQuestionIds', { questionIdsArray })
            if (questionIdsArray?.length) {
                getQuestionDetails({ questionId: questionIdsArray[0] })
            }
            setQuestionIdsArray([...questionIdsArray])
            // removing the first index since its used to call the api above, see the skip button onpress
            questionIdsArray.splice(0, 1)
            setSkipQuestionIdArray([...questionIdsArray])
        }

    }

    const getChapterList = async () => {
        const response = await GET_CHAPTER_LIST({ subjectId })
        if (response?.status) {
            const { chapter_ids, chapter_names } = response?.payload[0]
            // setting chapter array
            let chapters = []
            chapters = chapter_ids?.map((item, index) => {
                return {
                    label: chapter_names[index],
                    value: item,
                }
            })
            setModalChapterList(chapters)
        }

    }

    const getTagList = async ({ chapterId }) => {
        const response = await GET_TAG_LIST({ chapterId })
        // console.log('getTagList', JSON.stringify(response))
        if (response?.status) {
            const { tag_ids, tag_names } = response?.payload[0]
            // setting chapter array
            let tags = []
            tags = tag_ids?.map((item, index) => {
                return {
                    name: tag_names[index],
                    id: item,
                }
            })
            setModalTagList(tags)
            setFullModalTagList(tags)
        }
    }

    const getQuestionDetails = async ({ questionId }) => {
        // console.log({ questionId })
        setLoading(true)
        const response = await GET_QUESTION_DETAILS({ questionId })
        // console.log('1', JSON.stringify(response))
        if (response?.status) {
            const { question, option1, option2, option3, option4, is_option1_correct, is_option2_correct, is_option3_correct, is_option4_correct, difficulty_level, question_type, feature_type, tag_ids, tag_names, chapter_name, chapter_assoc_id, duplicate_question_ids, duplicate_question_scores } = response?.payload[0]
            setQuestionId(questionId)
            setQuestionObject(response?.payload[0])
            setSelectedDifficulty(difficulty_level)
            setModalSelectedDifficulty(difficulty_level)
            setChapterName(chapter_name)
            setModalChapterName(chapter_name)
            setSelectedChapterId(chapter_assoc_id)
            setModalSelectedChapterId(chapter_assoc_id)
            // set options to generate HTML content
            let options = []
            option1 && options.push({ html: option1, selected: is_option1_correct })
            option2 && options.push({ html: option2, selected: is_option2_correct })
            option3 && options.push({ html: option3, selected: is_option3_correct })
            option4 && options.push({ html: option4, selected: is_option4_correct })
            setOptions(options)

            // setting tags array
            let tags = []
            tags = tag_ids?.map((item, index) => {
                return {
                    id: item,
                    name: tag_names[index]
                }
            })
            setSelectedTags(tags)
            setModalSelectedTags(tags)

            // setting feature type
            const { feature_types } = response?.payload[1]
            // console.log('feature types', Object.values(feature_types))
            setFeatureList(Object.values(feature_types))
            setSelectedFeature(FEATURE_TYPE.get(feature_type == 0 ? '1' : feature_type))
            setModalSelectedFeature(FEATURE_TYPE.get(feature_type == 0 ? '1' : feature_type))

            // duplicate questions array
            let duplicateQuestions = []
            duplicateQuestions = duplicate_question_ids?.map((item, index) => {
                return {
                    id: item,
                    score: duplicate_question_scores[index]
                }
            })
            setDuplicateQuestions(duplicateQuestions)

            scrollToTop(scrollRef)
        } else {
            alert('Some error occured')
        }
        setLoading(false)
    }

    useEffect(() => {
        getQuestionIds()
        getChapterList()
    }, [])

    useEffect(() => {
        if (modalSelectedChapterId) {
            getTagList({ chapterId: modalSelectedChapterId })
            setModalSelectedTags([])
        }
    }, [modalSelectedChapterId])

    const validateEditQuestion = () => {
        let validated = true
        // if (modalSelectedTags.length == 0) {
        //     alert('Please select atleast one tag')
        //     validated = false
        // }
        !validated && setLoading(false)
        return validated
    }

    const validateRejectModal = () => {
        let validated = true
        if (rejectReasonText.trim().length < 3) {
            alert('Please enter valid reason')
            validated = false
        }
        !validated && setLoading(false)
        return validated
    }

    const moveToNextQuestion = () => {
        questionIdsArray.splice(questionIdsArray.indexOf(Number(questionObject?.question_id)), 1)
        if (questionIdsArray.length != 0) {
            if (questionIdsArray?.length) {
                getQuestionDetails({ questionId: questionIdsArray[0] })
            }
            setQuestionIdsArray([...questionIdsArray])
            // removing the first index since its used to call the api above, see the skip button onpress
            questionIdsArray.splice(0, 1)
            setSkipQuestionIdArray([...questionIdsArray])
            resetModal()
        } else {
            navigation.pop(2)
        }
    }

    const approveApi = async (params) => {
        setLoading(true)
        const response = await APPROVE_QUESTION({ params })
        console.log('approveApi', JSON.stringify(response))
        if (response?.status) {
            moveToNextQuestion()
        } else {

        }
        setLoading(false)
    }

    const rejectApi = async () => {
        setLoading(true);
        try {
            let fileUrls = [];
            if (attachmentFiles.length > 0) {
                const formData = new FormData();

                for (const file of attachmentFiles) {
                    formData.append("file", fileToApiFormat(file));
                }

                const uploadFilesRes = await UPLOAD_FILES({ params: formData });

                if (uploadFilesRes.status && Array.isArray(uploadFilesRes.payload)) {
                    const uploadFilesUrls = uploadFilesRes.payload;

                    fileUrls = [...uploadFilesUrls];
                }
            }

            const bodyData = {
                question_id: questionObject.question_id,
                is_accepted: false,
                chapter_id: selectedChapterId,
                tag_ids: selectedTags.map(item => item?.id),
                difficulty: selectedDifficulty,
                feature_type: getKeyByValueFromMap({ map: FEATURE_TYPE, searchValue: selectedFeature }),
                current_level: getCurrentLevel({ L1, L2, questionId: questionObject?.question_id }),
            };

            if (rejectReasonText) {
                bodyData.faculty_feedback_text = rejectReasonText;
            }

            if (fileUrls.length > 0) {
                bodyData.faculty_feedback_images = fileUrls;
            }

            console.log({ bodyData })

            // if (Array.isArray(data.marked_duplicates) && data.marked_duplicates.length > 0) {
            //     bodyData.marked_duplicates = data.marked_duplicates;
            // }

            const response = await REJECT_QUESTION({ params: bodyData })
            // console.log('rejectApi', JSON.stringify(response))
            if (response?.status) {
                moveToNextQuestion()
            } else {

            }

        } catch (error) {
        }
        setLoading(false)
    }

    return (
        <SafeAreaView style={STYLES.safeAreaContainer}>
            <ActivityIndicatorComponent animating={loading} />
            <HeaderComponent
                text={questionObject?.chapter_name || title}
                onPress={navigation.goBack}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={approveModal}
                onRequestClose={resetModal}
            // style={{ margin: 0, flex: 1 }}
            >
                <View style={styles.modalParentContainer}>
                    <View style={styles.modalContainer}>

                        <Text style={styles.modalText}>Are you sure you want to
                            {approveModal ? ' approve' : ' reject'} this question?</Text>

                        <View style={styles.approveRejectContainer}>
                            <TouchableOpacity style={styles.approveButton} onPress={resetModal}>
                                <Text style={styles.approveText}>No</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.approveButton, { backgroundColor: '#2B3789', marginLeft: 10 }]} onPress={() => {
                                const params = {
                                    question_id: questionObject?.question_id,
                                    is_accepted: true, // TODO: Change backend to accept boolean
                                    chapter_id: selectedChapterId,
                                    tag_ids: selectedTags.map(item => Number(item?.id)),
                                    difficulty: selectedDifficulty,
                                    feature_type: getKeyByValueFromMap({ map: FEATURE_TYPE, searchValue: selectedFeature }),
                                    current_level: getCurrentLevel({ L1, L2, questionId: questionObject?.question_id }),
                                };
                                // console.log('params', params)
                                approveApi(params)
                            }}>
                                <Text style={[styles.approveText, { color: 'white' }]}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={editModal}
                onRequestClose={() => setEditModal(false)}
            // style={{ margin: 0, flex: 1 }}
            >
                <View style={styles.editModalParentContainer}>
                    <View style={styles.editModalContainer}>
                        <Text style={[styles.subHeading, { marginTop: 30, marginBottom: 0, fontSize: 16, marginLeft: 20, fontWeight: '600' }]}>Edit Question Properties</Text>
                        <ScrollView
                            nestedScrollEnabled={true}
                            contentContainerStyle={{ width: '100%', paddingHorizontal: 20 }}>

                            <View style={[styles.subHeadingContainer, { marginTop: 10 }]}>
                                <Text style={styles.subHeading}>Question Type</Text>
                                <Text style={styles.subHeadingGray}>Single correct</Text>
                            </View>

                            <View style={styles.subHeadingContainer}>
                                <Text style={styles.subHeading}>Subject Name</Text>
                                <Text style={styles.subHeadingGray}>Maths</Text>
                            </View>

                            <View style={styles.subHeadingContainer}>
                                <Title text={'Chapter name'} mandatory={true} />

                                {/* <TouchableOpacity style={[styles.selectedTagContainer, { alignItems: 'center', paddingBottom: 10 }]} onPress={() => {
                                    // setEditModal(false)
                                    // setTimeout(() => {
                                    //     setTagModal(true)
                                    // }, 500)
                                }}>
                                    <Text style={{ flex: 1 }}>Laws of motion</Text>
                                    <Fontisto name='angle-down' size={10} color={'#343434'} />
                                </TouchableOpacity> */}

                                <DropDownPicker
                                    open={open}
                                    value={modalSelectedChapterId}
                                    items={modalChapterList}
                                    setOpen={setOpen}
                                    setValue={(value) => {
                                        (value != modalSelectedChapterId) && setModalSelectedChapterId(value)
                                    }}
                                    setItems={setModalChapterList}
                                    searchable={true}
                                    searchPlaceholder={'Search Chapter'}
                                    flatListProps={{
                                        nestedScrollEnabled: true
                                    }}
                                />

                            </View>

                            <InfoText text={'You have changed the chapter'} />

                            <View style={styles.subHeadingContainer}>
                                <Title text={'Tags'} mandatory={true} />

                                <TouchableOpacity style={[styles.selectedTagContainer, modalSelectedTags.length == 0 ? { alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10 } : {}]} onPress={() => {
                                    let temp = {}
                                    modalSelectedTags.map(item => {
                                        temp[item?.id] = item?.name
                                    })
                                    setTempModalSelectedTags({ ...temp })
                                    setModalTagList(fullModalTagList)
                                    setSearchKey('')
                                    setEditModal(false)
                                    setTimeout(() => {
                                        setTagModal(true)
                                    }, 500)
                                }}>
                                    {modalSelectedTags.length > 0 ? <FlatList
                                        data={modalSelectedTags}
                                        contentContainerStyle={styles.flatlistContentContainer}
                                        renderItem={({ index, item }) => {
                                            return <SelectedTag
                                                text={item?.name}
                                                index={index}
                                                selectedTags={modalSelectedTags}
                                                setSelectedTags={setModalSelectedTags}
                                            />
                                        }}
                                    />
                                        :
                                        <Text style={styles.subHeadingGray}>No Tags Selected</Text>}
                                    <Fontisto name='angle-right' size={10} color={'#343434'} />
                                </TouchableOpacity>

                            </View>

                            <InfoText text={'You have changed the tags'} />

                            <View style={styles.subHeadingContainer}>
                                <Title text={'Difficulty level'} mandatory={true} />
                                <FlatList
                                    data={[1, 2, 3, 4, 5]}
                                    contentContainerStyle={styles.flatlistContentContainer}
                                    // numColumns={5}
                                    // horizontal={true}
                                    renderItem={({ index, item }) => {
                                        return <DifficultyLevelModal
                                            text={item}
                                            index={index}
                                            selectedDifficulty={modalSelectedDifficulty}
                                            setSelectedDifficulty={setModalSelectedDifficulty}
                                        />
                                    }}
                                />
                            </View>

                            <InfoText text={'You have changed the difficulty level'} />

                            <View style={styles.subHeadingContainer}>
                                <Title text={'Feature Type'} mandatory={true} />
                                <FlatList
                                    data={featureList}
                                    contentContainerStyle={styles.flatlistContentContainer}
                                    renderItem={({ index, item }) => {
                                        return <FeatureTag
                                            text={item}
                                            selectedFeature={modalSelectedFeature}
                                            setSelectedFeature={setModalSelectedFeature}
                                        />
                                    }}
                                />
                            </View>

                            <InfoText text={'You have changed the feature type'} />
                        </ScrollView>

                        <TouchableOpacity style={[styles.approveButton, { backgroundColor: '#2B3789', marginLeft: 20, width: '22%', marginVertical: 10 }]} onPress={() => {
                            if (validateEditQuestion()) {
                                setEditModal(false)
                                setSelectedDifficulty(modalSelectedDifficulty)
                                setSelectedFeature(modalSelectedFeature)
                                setSelectedTags(modalSelectedTags)
                                setChapterName(modalChapterList.find(item => item?.value == modalSelectedChapterId)?.label)
                                setSelectedChapterId(modalSelectedChapterId)
                            }

                        }}>
                            <Text style={[styles.approveText, { color: 'white' }]}>Save</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={tagModal}
                onRequestClose={() => setTagModal(false)}
            >
                <View style={styles.editModalParentContainer}>
                    <View style={styles.editModalContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name='arrow-back' size={25}
                                onPress={() => {
                                    setTagModal(false)
                                    setTimeout(() => {
                                        setEditModal(true)
                                    }, 500)
                                }}
                                style={{ marginLeft: 20, marginTop: 30, }}
                            />
                            <Text style={[styles.subHeading, { marginTop: 30, marginBottom: 0, fontSize: 16, marginLeft: 20, fontWeight: '600' }]}>Select Tags</Text>
                        </View>
                        <View style={styles.searchBarContainer}>
                            <Feather name='search' size={20} color='#858585' />
                            <TextInput
                                value={searchKey}
                                onChangeText={value => {
                                    let temp = fullModalTagList.filter(item => item?.name?.includes(value))
                                    setModalTagList([...temp])
                                    setSearchKey(value)
                                }}
                                style={styles.textInput}
                                placeholder={'Search tags here'}
                                placeholderTextColor={'#858585'}
                            />
                        </View>

                        <ScrollView contentContainerStyle={{ width: '100%', paddingHorizontal: 20 }}>

                            <FlatList
                                data={modalTagList}
                                renderItem={({ item, index }) => {
                                    return <CheckboxTag
                                        item={item}
                                        index={index}
                                        selectedItemsObject={tempModalSelectedTags}
                                        onPress={(isChecked) => {
                                            let temp = { ...tempModalSelectedTags }
                                            if (!temp[item?.id]) {
                                                temp[item?.id] = item?.name
                                            } else {
                                                delete temp[item?.id]
                                            }
                                            setTempModalSelectedTags({ ...temp })
                                        }}
                                    />
                                }}
                            />

                        </ScrollView>

                        <TouchableOpacity style={[styles.approveButton, { backgroundColor: '#2B3789', marginLeft: 20, width: '22%', marginVertical: 10 }]} onPress={() => {
                            let keys = Object.keys(tempModalSelectedTags)
                            let tempList = []
                            if (keys.length) {
                                let values = Object.values(tempModalSelectedTags)
                                tempList = keys.map((item, index) => {
                                    return {
                                        id: item,
                                        name: values[index]
                                    }
                                })
                            }
                            setModalSelectedTags([...tempList])
                            setTempModalSelectedTags({})
                            setTagModal(false)
                            setTimeout(() => {
                                setEditModal(true)
                            }, 500)
                        }}>
                            <Text style={[styles.approveText, { color: 'white' }]}>Save</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={rejectModal}
                onRequestClose={() => {
                    setRejectModal(false)
                    setAttachmentFiles([])
                }}
                onDismiss={() => {
                    setAttachmentFiles([])
                }}
            >
                <View style={styles.editModalParentContainer}>
                    <View style={styles.rejectModalContainer}>
                        <Text style={[styles.subHeading, { marginTop: 30, marginBottom: 0, fontSize: 16, marginLeft: 20, fontWeight: '600' }]}>What do you want to change in the question?</Text>
                        <View style={styles.rejectReasonContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    value={rejectReasonText}
                                    onChangeText={setRejectReasonText}
                                    style={styles.rejectTextInput}
                                    placeholder={'Type your reason here'}
                                    placeholderTextColor={'#787878'}
                                />
                                <AttachmentButton
                                    fileList={attachmentFiles}
                                    setFileList={fileList => {
                                        // setLoading(true)
                                        // uploadFileApi(fileList)
                                        console.log('AttachmentButton', [...fileList])
                                        setAttachmentFiles(fileList)
                                    }}
                                    text={'Upload Files'}
                                    multiple={true}
                                    maxFilesCount={10}
                                    // here max size is sent as 3mb
                                    maxAllowedFileSize={3145728}
                                    onlyImage={true}
                                    // customComponent={() => {
                                    //     return <FontAwesome name='camera' size={25} color='#787878' />
                                    // }}
                                    allowedFileTypes={[
                                        DocumentPicker.types.images,
                                    ]}
                                    customComponent={<FontAwesome name='camera' size={25} color='#787878' />}
                                />
                            </View>

                            <ScrollView
                                horizontal
                                contentContainerStyle={styles.flatlistContentContainer}>
                                {attachmentFiles.map((item, index) => {
                                    return <View style={styles.screenshotContainer}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Feather name='image' size={20} color='#606060' />
                                            <Text numberOfLines={1} style={styles.screenshotText}>{item?.fileName}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            let temp = [...attachmentFiles]
                                            temp.splice(index, 1)
                                            setAttachmentFiles([...temp])
                                        }}>
                                            <AntDesign name='close' size={25} color='#012C63'
                                            />
                                        </TouchableOpacity>
                                    </View>
                                })}
                            </ScrollView>

                        </View>


                        <TouchableOpacity style={[styles.approveButton, { backgroundColor: '#2B3789', marginLeft: 20, marginVertical: 10 }]} onPress={() => {
                            if (validateRejectModal()) {
                                rejectApi()
                            }
                        }}>
                            <Text style={[styles.approveText, { color: 'white' }]}>Reject</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>


            <ScrollView
                ref={scrollRef}
                scrollsToTop={true}
                contentContainerStyle={styles.parentContainer}
            // nestedScrollEnabled={true}
            >
                <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>



                    <View style={styles.container}>
                        <View style={styles.questionContainer}>
                            <View>
                                <Text style={[styles.heading]}>Question</Text>
                            </View>
                            <View style={styles.questionIdTextContainer}>
                                <Text style={styles.questionIdText}>QID {questionId}</Text>
                            </View>
                        </View>

                        {/* <Text style={styles.questionText}>During water absorption from the soil, the water potential of the root cell is than the soil?</Text> */}

                        {questionObject?.question && <View style={{
                            width: width * 0.75
                        }}>
                            <MathJax
                                content={questionObject?.question}
                            />
                        </View>}

                        <FlatList
                            style={{ marginTop: 10 }}
                            data={options}
                            renderItem={({ item, index }) => {
                                return <QuestionListOption
                                    item={item}
                                    index={index}
                                />
                            }}
                        />

                    </View>

                    <View style={styles.container}>
                        <View>
                            <Text style={[styles.heading]}>Solution</Text>
                        </View>

                        {questionObject?.solution && <View style={{
                            width: width * 0.75
                        }}>
                            <MathJax
                                content={questionObject?.solution}
                            />
                        </View>}
                        {/* <Text style={styles.questionText}>During water absorption from the soil, the water potential of the root cell is than the soil?</Text> */}
                    </View>

                    {duplicateQuestions.length > 0 && <View style={styles.container}>
                        <Text style={[styles.heading]}>Check similar Questions</Text>

                        <FlatList
                            style={{ marginTop: 10 }}
                            data={duplicateQuestions}
                            renderItem={({ item, index }) => {
                                return <SimilarQuestionItem
                                    item={item}
                                    index={index}
                                    isVisited={Boolean(visitedQuestionObject[item?.id])}
                                    onPress={() => {
                                        let temp = { ...visitedQuestionObject }
                                        if (!temp[item?.id]) {
                                            temp[item?.id] = item?.score
                                        }
                                        setVisitedQuestionObject({ ...temp })
                                        navigation.navigate('SimilarQuestion', {
                                            question_id: item?.id,
                                            is_accepted: false,
                                            chapter_id: selectedChapterId,
                                            tag_ids: selectedTags.map(item => item?.id),
                                            difficulty: selectedDifficulty,
                                            feature_type: getKeyByValueFromMap({ map: FEATURE_TYPE, searchValue: selectedFeature }),
                                            current_level: getCurrentLevel({ L1, L2, questionId: questionObject?.question_id }),
                                            moveToNextQuestion: moveToNextQuestion,
                                            questionObject
                                        })
                                    }}
                                />
                            }}
                        />

                    </View>}

                    <View style={styles.container}>
                        <View style={styles.questionPropertiesContainer}>
                            <Text style={[styles.heading]}>Question Properties</Text>
                            <TouchableOpacity style={styles.editContainer} onPress={() => setEditModal(true)}>
                                <Text style={styles.editText}>Edit</Text>
                                <AntDesign name='edit' size={15} color={'#1B3687'} style={styles.editIcon} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.subHeadingContainer}>
                            <Text style={styles.subHeading}>Question Type</Text>
                            <Text style={styles.subHeadingGray}>{QUESTION_TYPE.get(questionObject?.question_type) || ''}</Text>
                        </View>

                        <View style={styles.subHeadingContainer}>
                            <Text style={styles.subHeading}>Subject Name</Text>
                            <Text style={styles.subHeadingGray}>{questionObject?.subject_name || ''}</Text>
                        </View>

                        <View style={styles.subHeadingContainer}>
                            <Text style={styles.subHeading}>Chapter Name</Text>
                            <Text style={styles.subHeadingGray}>{chapterName || ''}</Text>
                        </View>


                        <View style={styles.subHeadingContainer}>
                            <Text style={styles.subHeading}>Tags</Text>
                            {selectedTags?.length > 0 ? <FlatList
                                data={selectedTags}
                                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                                renderItem={({ index, item }) => {
                                    return <Tag text={item?.name} />
                                }}
                            /> :
                                <Text style={styles.subHeadingGray}>No Tags Selected</Text>}
                        </View>


                        <View style={styles.subHeadingContainer}>
                            <Text style={styles.subHeading}>Difficulty Level</Text>
                            <FlatList
                                data={[1, 2, 3, 4, 5]}
                                contentContainerStyle={styles.flatlistContentContainer}
                                // numColumns={5}
                                // horizontal={true}
                                renderItem={({ index, item }) => {
                                    return <DifficultyLevel
                                        text={item}
                                        index={index}
                                        selectedLevel={selectedDifficulty}
                                    />
                                }}
                            />
                        </View>

                        <View style={styles.subHeadingContainer}>
                            <Text style={styles.subHeading}>Feature Type</Text>
                            <Tag text={selectedFeature} />
                            {/* <FlatList
                                data={FEATURE_TYPE.get(questionObject?.feature_type) ? [FEATURE_TYPE.get(questionObject?.feature_type)] : ['Analytical']}
                                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                                renderItem={({ index, item }) => {
                                    return <Tag text={item} />
                                }}
                            /> */}
                        </View>

                    </View>



                </View>


                <View style={{ backgroundColor: 'white', alignItems: 'center', paddingBottom: 10 }}>
                    <View style={styles.approveRejectContainer}>
                        <TouchableOpacity style={styles.approveButton} onPress={() => setRejectModal(true)}>
                            <Text style={styles.approveText}>Reject</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.approveButton, { backgroundColor: '#2B3789', marginLeft: 40 }]}
                            onPress={() => setApproveModal(true)}>
                            <Text style={[styles.approveText, { color: 'white' }]}>Approve</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => {
                        let tempArray = []
                        if (skipQuestionIdArray.length) {
                            tempArray = [...skipQuestionIdArray]
                        } else {
                            tempArray = [...questionIdsArray]
                        }
                        let questionId = tempArray?.splice(0, 1)
                        getQuestionDetails({ questionId })
                        setSkipQuestionIdArray([...tempArray])
                    }}>
                        <Text style={styles.approveText}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <ScrollToTop
                scrollRef={scrollRef}
                style={{ bottom: 100 }}
            />


        </SafeAreaView>
    )
}

export default QuestionList;