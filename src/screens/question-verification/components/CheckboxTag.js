import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styles from '../styles/checkbox-tag'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const CheckboxTag = ({ style, textStyle, text, index }) => {
    return <TouchableOpacity style={[styles.container, style]}>
        <BouncyCheckbox
            key={index}
            size={20}
            fillColor="#000000"
            unfillColor="#FFFFFF"
            // text={'hi'}
            iconStyle={styles.iconStyle}
            onPress={(isChecked) => {
                if (isChecked) {

                } else {

                }
            }}
        />
        <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
}


export default CheckboxTag;