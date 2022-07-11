import React, { useRef, useState } from 'react'
import { FlatList, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { STYLES } from '../../../appStyles'
import HeaderComponent from '../../../components/HeaderComponent'
import ScrollToTop from '../../../components/ScrollToTop'
import CheckQuestionOption from '../components/CheckQuestionOption'
import styles from '../styles/check-question'

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

const CheckQuestion = (props) => {
    const { navigation, route } = props
    const prevScreenData = route?.params || {}
    const { title } = prevScreenData

    const [approveModal, setApproveModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);

    const scrollRef = useRef();

    const resetModal = () => {
        setApproveModal(false);
        setRejectModal(false);
    }

    return (
        <SafeAreaView style={STYLES.safeAreaContainer}>
            <HeaderComponent
                text={'Check Question'}
                onPress={navigation.goBack}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={approveModal || rejectModal}
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
                            <Text style={styles.questionIdText}>QID 025600</Text>
                        </View>
                    </View>

                    <Text style={styles.questionText}>During water absorption from the soil, the water potential of the root cell is than the soil?</Text>

                </View>



                <FlatList
                    data={response}
                    renderItem={({ item, index }) => {
                        return <CheckQuestionOption
                            item={item}
                        />
                    }}
                />

                <View style={styles.container}>
                    <View>
                        <Text style={[styles.heading]}>Solution</Text>
                    </View>

                    <Text style={styles.questionText}>During water absorption from the soil, the water potential of the root cell is than the soil?</Text>
                </View>

            </ScrollView>

            <ScrollToTop
                scrollRef={scrollRef}
                style={{ bottom: 60 }}
            />

            <View style={styles.approveRejectContainer}>
                <TouchableOpacity style={styles.approveButton} onPress={() => setRejectModal(true)}>
                    <Text style={styles.approveText}>Reject</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.approveButton, { backgroundColor: '#2B3789', marginLeft: 40 }]}
                    onPress={() => setApproveModal(true)}>
                    <Text style={[styles.approveText, { color: 'white' }]}>Approve</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default CheckQuestion;

