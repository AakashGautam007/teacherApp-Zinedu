import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import MathJax from '../../../components/MathJax'
import { width } from '../../../utils/config'
import styles from '../styles/question-list-option'
import Tag from './Tag'

const getTitle = (index) => {
    switch (index) {
        case 0: return 'Option A'
        case 1: return 'Option B'
        case 2: return 'Option C'
        case 3: return 'Option D'
        default: break;
    }
}

const QuestionListOption = ({ item, index }) => {
    const { html, selected } = item
    return <TouchableOpacity style={[styles.container, selected ? { backgroundColor: '#E3FFDA', borderWidth: 1, borderColor: '#2EB100' } : {}]}>

        <View style={[styles.borderContainer, { marginTop: 5 }]}>
            <Text style={styles.heading}>{getTitle(index)}</Text>
            <View style={{
                width: width * 0.75
            }}>
                <MathJax
                    content={html}
                />
            </View>
        </View>

    </TouchableOpacity>
}


export default QuestionListOption;