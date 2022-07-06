import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import styles from '../styles/filter'
import Feather from 'react-native-vector-icons/Feather'
import HeaderComponent from '../../../components/HeaderComponent'
import { Badge } from '../../dashboard/components/Badge'
import Accordian from '../components/Accordian'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { STYLES } from '../../../appStyles'
import ScrollToTop from '../../../components/ScrollToTop'
import Tag from '../components/Tag'
import Option from '../components/Option'
import optionStyles from '../styles/option'

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
    const { title } = prevScreenData

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
                    <View style={optionStyles.container}>
                        <View style={styles.questionContainer}>
                            <View>
                                <Text style={[optionStyles.heading]}>Question</Text>
                            </View>
                            <View style={styles.questionIdText}>
                                <Text>QID 025600</Text>
                            </View>
                        </View>

                        <Tag verify={true} style={[optionStyles.tag, { marginVertical: 5, marginBottom: 0, maxWidth: '27%' }]} />

                        <View style={[optionStyles.borderContainer, { borderWidth: 0, padding: 10, paddingHorizontal: 10 }]}>
                            <Text style={optionStyles.questionText}>During water absorption from the soil, the water potential of the root cell is than the soil?</Text>
                        </View>

                    </View>

                    <View style={optionStyles.container}>
                        <View style={styles.questionContainer}>
                            <Tag verify={false} style={[optionStyles.tag, { marginVertical: 5, marginBottom: 0, maxWidth: '60%' }]} text='Similar Question' />
                            <View style={[styles.questionIdText, { height: 25 }]}>
                                <Text>QID 025600</Text>
                            </View>
                        </View>


                        <View style={[optionStyles.borderContainer, { borderWidth: 0, padding: 10, paddingHorizontal: 10 }]}>
                            <Text style={optionStyles.questionText}>During water absorption from the soil, the water potential of the root cell is than the soil?</Text>
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

