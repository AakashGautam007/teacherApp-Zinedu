import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { Badge } from '../../dashboard/components/Badge'
import styles from '../styles/accordian'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useNavigation } from '@react-navigation/native'

const SubAccordianList = ({ item }) => {
    const { badge, subject } = item
    const navigation = useNavigation();
    return <TouchableOpacity style={styles.subHeader} onPress={() => {
        navigation.navigate('SimilarQuestion', {
            title: subject
        })
    }}>
        <Text style={styles.subHeaderText}>{subject}</Text>
        <View style={styles.subHeaderBadgeContainer}>
            <Badge
                count={badge}
                viewStyle={[styles.badge, { backgroundColor: '#F2F6FF' }]}
                textStyle={styles.subHeaderBadgeText}
            />
            <Fontisto name='angle-right' size={15} />
        </View>
    </TouchableOpacity>
}

export default SubAccordianList;