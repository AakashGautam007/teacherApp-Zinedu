import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import styles from '../styles/similar-question'
import Feather from 'react-native-vector-icons/Feather'
import HeaderComponent from '../../../components/HeaderComponent'
import { Badge } from '../../dashboard/components/Badge'
import Accordian from '../components/Accordian'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { STYLES } from '../../../appStyles'
import ScrollToTop from '../../../components/ScrollToTop'
import OptionTag from '../components/OptionTag'
import Option from '../components/Option'

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




const SimilarQuestion = (props) => {
    const { navigation, route } = props
    const prevScreenData = route?.params

    const scrollRef = useRef();

    return (
        <SafeAreaView style={STYLES.safeAreaContainer}>
            <HeaderComponent
                text={'Check Similar Question'}
                onPress={navigation.goBack}
            />
            <ScrollView
                ref={scrollRef}
                scrollsToTop={true}
                contentContainerStyle={styles.parentContainer}
            // nestedScrollEnabled={true}
            >

                <View style={styles.questionBorderContainer}>
                    <View style={styles.container}>
                        <View style={styles.questionContainer}>
                            <View>
                                <Text style={[styles.heading]}>Question</Text>
                            </View>
                            <View style={styles.questionIdTextContainer}>
                                <Text style={styles.questionIdText}>QID 025600</Text>
                            </View>
                        </View>

                        <OptionTag verify={true} style={[styles.tag, { marginVertical: 5, marginBottom: 0, maxWidth: '27%' }]} />

                        <View style={[styles.borderContainer, { borderWidth: 0, padding: 10, paddingHorizontal: 10 }]}>
                            <Text style={styles.questionText}>During water absorption from the soil, the water potential of the root cell is than the soil?</Text>
                        </View>

                    </View>

                    <View style={styles.container}>
                        <View style={styles.questionContainer}>
                            <OptionTag verify={false} style={[styles.tag, { marginVertical: 5, marginBottom: 0, maxWidth: '60%' }]} text='Similar Question' />
                            <View style={[styles.questionIdTextContainer, { height: 25 }]}>
                                <Text style={styles.questionIdText}>QID 025600</Text>
                            </View>
                        </View>


                        <View style={[styles.borderContainer, { borderWidth: 0, padding: 10, paddingHorizontal: 10 }]}>
                            <Text style={styles.questionText}>During water absorption from the soil, the water potential of the root cell is than the soil?</Text>
                        </View>

                    </View>
                </View>

                <FlatList
                    data={response}
                    renderItem={({ item, index }) => {
                        return <Option
                            item={item}
                        />
                    }}
                />

            </ScrollView>

            <ScrollToTop
                scrollRef={scrollRef}
            />

        </SafeAreaView>
    )
}

export default SimilarQuestion;

