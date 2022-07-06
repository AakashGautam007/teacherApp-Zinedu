import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styles from '../styles/badge'

export const Badge = ({ count, viewStyle, textStyle }) => {
    return <View style={[styles.badgeContainer, viewStyle]}>
        <Text style={[styles.countText, textStyle]}>{count}</Text>
    </View>
}