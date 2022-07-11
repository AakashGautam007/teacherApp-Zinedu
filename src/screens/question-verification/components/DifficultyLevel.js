import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styles from '../styles/difficulty-level'

const DifficultyLevel = ({ style, textStyle, text, index }) => {
    return <TouchableOpacity style={[styles.difficultyLevelContainer, style, index == 2 ? styles.selected : null]}>
        <Text style={[styles.text, textStyle, index == 2 ? styles.selectedText : null]}>{text}</Text>
    </TouchableOpacity>
}


export default DifficultyLevel;