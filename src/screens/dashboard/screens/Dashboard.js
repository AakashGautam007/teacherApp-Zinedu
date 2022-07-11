import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../../utils/context'
import { width, postAnalytics } from '../../../utils/config'
import styles from '../styles'
import { STYLES } from '../../../appStyles'
import { Badge } from '../components/Badge'

const Dashboard = ({ navigation }) => {

    const { logout } = useContext(AuthContext);


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
                                onPress={() => navigation.navigate('Filter')}
                                style={styles.questionVerificationActiveCard}>
                                <Badge
                                    count={'36'}
                                    viewStyle={{
                                        position: 'absolute',
                                        top: -8,
                                        right: -10,
                                    }}
                                />
                                <Text style={styles.cardText}>
                                    Review Question
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.questionVerificationContainer}>
                            <TouchableOpacity
                                // disabled={true}
                                onPress={() => navigation.navigate('CheckQuestion')}
                                style={styles.questionVerificationInactiveCard} >
                                {/* <Badge
                                    count={'36'}
                                /> */}
                                <Text style={styles.cardInactiveText}>
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

