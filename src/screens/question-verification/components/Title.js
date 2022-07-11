import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styles from '../styles/title'

const Title = ({ text, mandatory = false }) => {
    return <Text style={styles.text}>{text}{mandatory ? <Text style={styles.mandatory}>*</Text> : null}</Text>
}


export default Title;