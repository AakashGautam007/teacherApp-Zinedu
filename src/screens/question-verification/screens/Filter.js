import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import styles from '../styles/filter'
import Feather from 'react-native-vector-icons/Feather'
import HeaderComponent from '../../../components/HeaderComponent'
import { Badge } from '../../dashboard/components/Badge'
import Accordian from '../components/Accordian'
import { STYLES } from '../../../appStyles'
import ScrollToTop from '../../../components/ScrollToTop'

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

    return (
        <SafeAreaView style={STYLES.safeAreaContainer}>
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
                        count={'36'}
                        viewStyle={styles.badge}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    // alignItems: 'flex-start',
                    // backgroundColor: '#FBFBFB',
                    marginTop: 12
                }}>
                    <Feather name='info' color={'#012C63'} size={20} />
                    <View style={{ flex: 1 }}>
                        <Text style={{
                            marginLeft: 10,
                            color: '#201F1F',
                            fontWeight: '600',
                        }}>To verify questions, select the subject and chapter</Text>
                    </View>
                </View>

                <View>
                    <FlatList
                        data={response}
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

