import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styles from '../styles/similar-question-item'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'

const SimilarQuestionItem = ({ item, index }) => {
    const { option } = item
    const navigation = useNavigation();
    return <TouchableOpacity style={styles.similarQuestionButton} onPress={() => {
        navigation.navigate('SimilarQuestion')
    }}>
        <View style={styles.questionIdParentContainer}>
            <View style={[styles.questionIdTextContainer]}>
                <Text style={styles.questionIdText}>QID 025600</Text>
            </View>

            {index == 0 && <View style={styles.questionIdParentContainer}>
                <Feather name='check' size={20} style={styles.checkIcon} color={'#3D3D3D'} />
                <Text style={styles.visitedText}>Visited</Text>
            </View>}

        </View>

        <View style={styles.percentageParentContainer}>
            <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>70%</Text>
            </View>
            <Fontisto name='angle-right' size={15} />
        </View>
    </TouchableOpacity>
}


export default SimilarQuestionItem;