import React, { useEffect, useState, useContext, useRef, useCallback } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import styles from '../styles/filter'
import Feather from 'react-native-vector-icons/Feather'
import HeaderComponent from '../../../components/HeaderComponent'
import { Badge } from '../../dashboard/components/Badge'
import Accordian from '../components/Accordian'
import { STYLES } from '../../../appStyles'
import ScrollToTop from '../../../components/ScrollToTop'
import { GET_CHAPTERS_AND_SUBJECTS } from '../api'
import { generateSubjectList } from '../utils'
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicatorComponent } from '../../../components/ActivityIndicatorComponent'

const response = [
    {
        class: 'Maths XI',
        badge: '9',
        subjects: [
            {
                subject: 'Laws of motion',
                badge: '6'
            },
            {
                subject: 'Integration',
                badge: '3'
            }
        ]
    },
    {
        class: 'Physics XI',
        badge: '5',
        subjects: [
            {
                subject: 'Laws of motion II',
                badge: '3'
            }
        ]
    }
]


const Filter = (props) => {
    const { navigation } = props
    const scrollRef = useRef();

    const [loading, setLoading] = useState(true);
    const [unverifiedCount, setUnverifiedCount] = useState(0);
    const [subjectList, setSubjectList] = useState([]);

    const getChaptersAndSubjects = async () => {
        setLoading(true)
        const response = await GET_CHAPTERS_AND_SUBJECTS()
        if (response?.status) {
            const { L1, L2 } = response?.payload[0]
            // console.log({ L1, L2 })
            const [count, subject] = generateSubjectList([...L1, ...L2])
            if (subject.length > 0) {
                setUnverifiedCount(count)
                setSubjectList(subject)
            } else {
                navigation.replace('Congrats')
            }
        } else {

        }
        setLoading(false)
    }

    useFocusEffect(useCallback(() => {
        getChaptersAndSubjects()
    }, []))

    return (
        <SafeAreaView style={STYLES.safeAreaContainer}>
            <ActivityIndicatorComponent animating={loading} />
            <HeaderComponent
                text='Filters'
                onPress={navigation.goBack}
            />
            <ScrollView
                ref={scrollRef}
                contentContainerStyle={styles.parentContainer}
            >
                <View style={styles.unverifiedCard}>
                    <Text style={styles.unverifiedCardText}>Total unverified questions</Text>
                    <Badge
                        count={unverifiedCount}
                        viewStyle={styles.badge}
                        textStyle={styles.badgeText}
                    />
                </View>

                <View style={styles.infoContainer}>
                    <Feather name='info' color={'#012C63'} size={20} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.unverifiedCardText}>To verify questions, select the subject and chapter</Text>
                    </View>
                </View>

                <View>
                    <FlatList
                        keyExtractor={(item, index) => item?._id}
                        data={subjectList}
                        // nestedScrollEnabled={true}
                        renderItem={({ index, item }) => {
                            return <Accordian
                                item={item}
                            />
                        }}
                    />
                </View>

            </ScrollView>

            <ScrollToTop
                scrollRef={scrollRef}
            />

        </SafeAreaView>
    )
}

export default Filter;

