import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styles from '../styles/info-text'
import AntDesign from 'react-native-vector-icons/AntDesign'

const InfoText = ({ text }) => {
    return <View style={styles.container}>
        <AntDesign name='exclamationcircleo' color={'#1B3687'} size={20} />
        <View style={{ flex: 1 }}>
            <Text style={styles.text}>{text}</Text>
        </View>
    </View>
}


export default InfoText;