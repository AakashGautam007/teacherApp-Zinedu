import React, { useRef, useState } from 'react'
import { FlatList, Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { STYLES } from '../../../appStyles'
import HeaderComponent from '../../../components/HeaderComponent'
import ScrollToTop from '../../../components/ScrollToTop'
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
    const { title } = prevScreenData

    const [approveModal, setApproveModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [tagModal, setTagModal] = useState(false);
    const [selectedDifficulty, setSelectedDifficulty] = useState(1);
    const [selectedFeature, setSelectedFeature] = useState('');
    const [selectedTags, setSelectedTags] = useState(['Conceptual', 'Analytical', 'Memory based', 'Memoir', 'Dummy']);
    const [searchKey, setSearchKey] = useState('');
    const [rejectReasonText, setRejectReasonText] = useState('');

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


    return (
        <SafeAreaView style={STYLES.safeAreaContainer}>
            <HeaderComponent
                text={title}
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

                            <TouchableOpacity style={[styles.approveButton, { backgroundColor: '#2B3789', marginLeft: 10 }]} onPress={resetModal}>
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
                        <ScrollView contentContainerStyle={{ width: '100%', paddingHorizontal: 20 }}>

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
                                    value={value}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setItems}
                                    searchable={true}
                                    searchPlaceholder={'Search Chapter'}
                                />

                            </View>

                            <InfoText text={'You have changed the chapter'} />

                            <View style={styles.subHeadingContainer}>
                                <Title text={'Tags'} mandatory={true} />

                                <TouchableOpacity style={styles.selectedTagContainer} onPress={() => {
                                    setEditModal(false)
                                    setTimeout(() => {
                                        setTagModal(true)
                                    }, 500)
                                }}>
                                    <FlatList
                                        data={selectedTags}
                                        contentContainerStyle={styles.flatlistContentContainer}
                                        renderItem={({ index, item }) => {
                                            return <SelectedTag
                                                text={item}
                                                index={index}
                                                selectedTags={selectedTags}
                                                setSelectedTags={setSelectedTags}
                                            />
                                        }}
                                    />
                                    <Fontisto name='angle-right' size={10} color={'#343434'} />
                                </TouchableOpacity>

                            </View>

                            <InfoText text={'You have changed the tags'} />

                            <View style={styles.subHeadingContainer}>
                                <Title text={'Difficulty level'} mandatory={true} />
                                <FlatList
                                    data={[1, 2, 3, 4, 5]}
                                    contentContainerStyle={styles.flatlistContentContainer}
                                    renderItem={({ index, item }) => {
                                        return <DifficultyLevelModal
                                            text={item}
                                            index={index}
                                            selectedDifficulty={selectedDifficulty}
                                            setSelectedDifficulty={setSelectedDifficulty}
                                        />
                                    }}
                                />
                            </View>

                            <InfoText text={'You have changed the difficulty level'} />

                            <View style={styles.subHeadingContainer}>
                                <Title text={'Feature Type'} mandatory={true} />
                                <FlatList
                                    data={['Conceptual', 'Analytical', 'Memory based', 'Memoir', 'Dummy']}
                                    contentContainerStyle={styles.flatlistContentContainer}
                                    renderItem={({ index, item }) => {
                                        return <FeatureTag
                                            text={item}
                                            selectedDifficulty={selectedFeature}
                                            setSelectedDifficulty={setSelectedFeature}
                                        />
                                    }}
                                />
                            </View>

                            <InfoText text={'You have changed the feature type'} />
                        </ScrollView>

                        <TouchableOpacity style={[styles.approveButton, { backgroundColor: '#2B3789', marginLeft: 20, width: '22%', marginVertical: 10 }]} onPress={() => setEditModal(false)}>
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
                                onChangeText={setSearchKey}
                                style={styles.textInput}
                                placeholder={'Search tags here'}
                                placeholderTextColor={'#858585'}
                            />
                        </View>

                        <ScrollView contentContainerStyle={{ width: '100%', paddingHorizontal: 20 }}>

                            <FlatList
                                data={['Sexual reproduction in flowering plants', '1st Law of motion', 'Sexual reproduction in flowering plants', '2nd Law of motion', 'Tag 5', 'Tag 6']}
                                renderItem={({ item, index }) => {
                                    return <CheckboxTag
                                        text={item}
                                        index={index}
                                    />
                                }}
                            />

                        </ScrollView>

                        <TouchableOpacity style={[styles.approveButton, { backgroundColor: '#2B3789', marginLeft: 20, width: '22%', marginVertical: 10 }]} onPress={() => {
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
                onRequestClose={() => setRejectModal(false)}
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
                                <FontAwesome name='camera' size={25} color='#787878' />
                            </View>


                            <View style={styles.screenshotContainer}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Feather name='image' size={20} color='#606060' />
                                    <Text style={styles.screenshotText}>Screenshot 123456</Text>
                                </View>
                                <AntDesign name='close' size={25} color='#012C63'
                                />
                            </View>
                        </View>


                        <TouchableOpacity style={[styles.approveButton, { backgroundColor: '#2B3789', marginLeft: 20, marginVertical: 10 }]} onPress={() => setRejectModal(false)}>
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
                                <Text style={styles.questionIdText}>QID 025600</Text>
                            </View>
                        </View>

                        <Text style={styles.questionText}>During water absorption from the soil, the water potential of the root cell is than the soil?</Text>

                        <FlatList
                            style={{ marginTop: 10 }}
                            data={response}
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

                        <Text style={styles.questionText}>During water absorption from the soil, the water potential of the root cell is than the soil?</Text>
                    </View>

                    <View style={styles.container}>
                        <Text style={[styles.heading]}>Check similar Questions</Text>

                        <FlatList
                            style={{ marginTop: 10 }}
                            data={response}
                            renderItem={({ item, index }) => {
                                return <SimilarQuestionItem
                                    item={item}
                                    index={index}
                                />
                            }}
                        />

                    </View>

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
                            <Text style={styles.subHeadingGray}>Single correct</Text>
                        </View>

                        <View style={styles.subHeadingContainer}>
                            <Text style={styles.subHeading}>Subject Name</Text>
                            <Text style={styles.subHeadingGray}>Maths</Text>
                        </View>

                        <View style={styles.subHeadingContainer}>
                            <Text style={styles.subHeading}>Chapter Name</Text>
                            <Text style={styles.subHeadingGray}>Laws of motion</Text>
                        </View>


                        <View style={styles.subHeadingContainer}>
                            <Text style={styles.subHeading}>Tags</Text>
                            <FlatList
                                data={['Newtons Laws', 'Algorithms', 'Newtons Laws', 'Algorithms']}
                                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                                renderItem={({ index, item }) => {
                                    return <Tag text={item} />
                                }}
                            />
                        </View>


                        <View style={styles.subHeadingContainer}>
                            <Text style={styles.subHeading}>Difficulty Level</Text>
                            <FlatList
                                data={[1, 2, 3, 4, 5]}
                                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}
                                renderItem={({ index, item }) => {
                                    return <DifficultyLevel
                                        text={item}
                                        index={index}
                                    />
                                }}
                            />
                        </View>

                        <View style={styles.subHeadingContainer}>
                            <Text style={styles.subHeading}>Feature Type</Text>
                            <FlatList
                                data={['Analytical']}
                                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                                renderItem={({ index, item }) => {
                                    return <Tag text={item} />
                                }}
                            />
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

                    <TouchableOpacity onPress={() => { }}>
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