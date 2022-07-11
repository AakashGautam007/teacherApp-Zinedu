import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styles from '../styles/selected-tag'
import AntDesign from 'react-native-vector-icons/Ionicons'

const SelectedTag = ({ style, textStyle, text, index, setSelectedTags, selectedTags = [] }) => {
    return <View style={[styles.tagContainer, style]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
        <TouchableOpacity onPress={() => {
            let tempList = [...selectedTags]
            tempList.splice(index, 1)
            setSelectedTags([...tempList])
        }}>
            <AntDesign name='close' size={25} color='#B5B5B5'
            // style={{ marginBottom: -2 }}
            />
        </TouchableOpacity>
    </View>
}


export default SelectedTag;