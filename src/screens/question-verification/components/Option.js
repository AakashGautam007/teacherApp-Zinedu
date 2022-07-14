import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import MathJax from '../../../components/MathJax'
import styles from '../styles/option'
import OptionTag from './OptionTag'

const Option = ({ item }) => {
    const { option, html } = item
    return <View style={styles.container}>
        <Text style={styles.heading}>{option}</Text>

        <OptionTag verify={true} style={styles.tag} />

        <View style={styles.borderContainer}>
            {/* <Text style={styles.questionText}>A stem, that’s the question i.e. a problem or an incomplete statement - Make sure that you create a crisp, grammatically error-free and simple stem which has relevant information.</Text> */}
            {/* <View style={{ width: width * 0.75 }}> */}
                <MathJax
                    style={{
                        opacity: 0.99,
                        minHeight: 1,
                        width: width * 0.75,
                        alignItems: "center",
                        alignSelf: "center",
                    }}
                    content={html}
                />
            {/* </View> */}
        </View>

        <OptionTag verify={false} style={styles.tag} />
        <View style={styles.borderContainer}>
            <Text style={styles.questionText}>Haier</Text>
        </View>

    </View>
}


export default Option;