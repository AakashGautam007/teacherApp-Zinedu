import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styles from '../styles/feature-tag'

const FeatureTag = ({ style, textStyle, text, selectedDifficulty, setSelectedDifficulty }) => {
    return <TouchableOpacity style={[styles.difficultyLevelContainer, style, (selectedDifficulty == text) ? styles.selected : null]} onPress={() => setSelectedDifficulty(text)}>
        <Text style={[styles.text, textStyle, (selectedDifficulty == text) ? styles.selectedText : null]}>{text}</Text>
    </TouchableOpacity>
}


export default FeatureTag;