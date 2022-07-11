import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styles from '../styles/option'
import Tag from './Tag'

const CheckQuestionOption = ({ item }) => {
    const { option } = item
    return <View style={styles.container}>
        <Text style={styles.heading}>{option}</Text>

        <View style={[styles.borderContainer, { marginTop: 10 }]}>
            <Text style={styles.questionText}>A stem, that’s the question i.e. a problem or an incomplete statement - Make sure that you create a crisp, grammatically error-free and simple stem which has relevant information.</Text>
        </View>

    </View>
}


export default CheckQuestionOption;