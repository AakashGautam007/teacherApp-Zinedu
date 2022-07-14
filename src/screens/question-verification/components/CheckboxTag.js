import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styles from '../styles/checkbox-tag'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const CheckboxTag = ({ style, textStyle, item, index, onPress, selectedItemsObject }) => {
    const { name, id } = item
    return <TouchableOpacity style={[styles.container, style]}>
        <BouncyCheckbox
            key={index}
            size={20}
            fillColor="#000000"
            unfillColor="#FFFFFF"
            // text={'hi'}
            isChecked={Boolean(selectedItemsObject[id])}
            iconStyle={styles.iconStyle}
            onPress={onPress}
            disableBuiltInState={true}
        />
        <Text style={[styles.text, textStyle]}>{name}</Text>
    </TouchableOpacity>
}


export default CheckboxTag;