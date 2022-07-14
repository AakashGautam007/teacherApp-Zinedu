import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../../utils/context'
import { width, postAnalytics } from '../../../utils/config'
import styles from '../styles'
import { STYLES } from '../../../appStyles'
import { Badge } from '../components/Badge'
import { useAuthFields } from '../../../AppUtils/hooks/useAuthFields'
import { GET_REVIEW_QUESTION_COUNT, GET_VISIBILITY_CHECK_COUNT } from '../api'

const Dashboard = ({ navigation }) => {

    const { logout } = useContext(AuthContext);
    const [reviewCount, setReviewCount] = useState(0);
    const [visibilityCheckCount, setVisibilityCheckCount] = useState(0);

    const getReviewQuestionCount = async () => {
        const response = await GET_REVIEW_QUESTION_COUNT()
        // console.log('1', JSON.stringify(response))
        setReviewCount(response?.payload[0]?.num_pending_questions)
    }

    const getVisibilityCheckCount = async () => {
        const response = await GET_VISIBILITY_CHECK_COUNT()
        // console.log('2', JSON.stringify(response))
        setVisibilityCheckCount(response?.payload[0]?.num_pending_questions)
    }

    useEffect(() => {
        getReviewQuestionCount()
        getVisibilityCheckCount()
    }, [])

    useEffect(() => {
        postAnalytics('teacher-dashboard', logout)
    }, [])

    return (
        <SafeAreaView style={styles.parentContainer}>
            <View style={{ backgroundColor: '#1C3687', width }} >
                <View style={styles.headerParentContainer} >
                    <View style={styles.headerContainer} >
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
                            <Image source={require('../../../assets/menu.png')} style={{ height: 44, width: 44, marginHorizontal: 8, marginVertical: 14 }} />
                        </TouchableOpacity>
                        <Image source={require('../../../assets/zinedu.png')} style={{ width: 118, height: 26.08, marginLeft: 8 }} />
                    </View>
                    <Image source={require('../../../assets/bell.png')} style={{ width: 22, height: 26, marginRight: 14 }} />
                </View>
            </View>
            <View style={styles.container} >

                <View style={styles.viewScheduleCardParentContainer}>
                    <View style={styles.viewScheduleCardContainer}>
                        <Text style={styles.classesText}>
                            Classes
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('MyScheduleStack')}>
                            <View style={styles.viewSchedule}>
                                <Text style={styles.viewScheduleText} >
                                    View Schedule
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.cardsContainer}>

                    {/* <TouchableOpacity 
                style={{width:'45%',justifyContent:'center',alignItems: 'center',backgroundColor:'#ECECEC',height:157,borderRadius:30}} >
                <View >

                    <Text>
                        DPP
                    </Text>
                </View>
                </TouchableOpacity> */}

                    <TouchableOpacity
                        onPress={() => navigation.navigate('DoubtStack')}
                        style={styles.card}
                    >
                        <Text style={styles.cardText}>
                            Student Doubts
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('PastClassesStack')}
                        style={styles.card}
                    >
                        <Text style={styles.cardText}>
                            My Past Classes
                        </Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.questionVerificationParentContainer}>
                    <Text style={styles.questionVerificationText}>
                        Question Verification
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.questionVerificationContainer}>
                            <TouchableOpacity
                                // onPress={() => navigation.navigate('SearchQuestionStack')}
                                disabled={reviewCount == 0}
                                onPress={() => navigation.navigate('Filter')}
                                style={reviewCount == 0 ? styles.questionVerificationInactiveCard : styles.questionVerificationActiveCard}>
                                <Badge
                                    count={reviewCount}
                                    viewStyle={{
                                        position: 'absolute',
                                        top: -8,
                                        right: -10,
                                    }}
                                />
                                <Text style={reviewCount == 0 ? styles.cardInactiveText : styles.cardText}>
                                    Review Question
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.questionVerificationContainer}>
                            <TouchableOpacity
                                disabled={visibilityCheckCount == 0}
                                onPress={() => navigation.navigate('CheckQuestion')}
                                style={visibilityCheckCount == 0 ? styles.questionVerificationInactiveCard : styles.questionVerificationActiveCard} >
                                <Badge
                                    count={visibilityCheckCount}
                                    viewStyle={{
                                        position: 'absolute',
                                        top: -8,
                                        right: -10,
                                    }}
                                />
                                <Text style={visibilityCheckCount == 0 ? styles.cardInactiveText : styles.cardText}>
                                    Visibility Check
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Dashboard;

