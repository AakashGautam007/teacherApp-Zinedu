import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import MathJax from '../../../components/MathJax'
import { width } from '../../../utils/config'
import styles from '../styles/question-list-option'
import { getOptionName } from '../utils'
import Tag from './Tag'

const QuestionListOption = ({ item, index }) => {
    const { html, selected } = item
    return <TouchableOpacity style={[styles.container, selected ? { backgroundColor: '#E3FFDA', borderWidth: 1, borderColor: '#2EB100' } : {}]}>

        <View style={[styles.borderContainer, { marginTop: 5 }]}>
            <Text style={styles.heading}>{getOptionName(index)}</Text>
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