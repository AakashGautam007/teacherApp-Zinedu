import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styles from '../styles/question-list-option'
import Tag from './Tag'

const QuestionListOption = ({ item, index }) => {
    const { option } = item
    return <TouchableOpacity style={[styles.container, index == 0 ? { backgroundColor: '#E3FFDA', borderWidth: 1, borderColor: '#2EB100'  } : {}]}>

        <View style={[styles.borderContainer, { marginTop: 5 }]}>
            <Text style={styles.heading}>{option}</Text>
            <Text style={styles.questionText}>A stem, that’s the question i.e. a problem or an incomplete statement - Make sure that you create a crisp, grammatically error-free and simple stem which has relevant information.</Text>
        </View>

    </TouchableOpacity>
}


export default QuestionListOption;