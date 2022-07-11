import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styles from '../styles/option-tag'

const OptionTag = ({ verify = false, style, textStyle, text }) => {
    return <View style={[verify ? styles.toBeVerfified : styles.similarOption, style]}>
        <Text style={[styles.text, textStyle]}>{text ? text : verify ? 'To be Verified' : 'Similar option'}</Text>
    </View>
}


export default OptionTag;