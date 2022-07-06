
import React from 'react'
import { StyleSheet } from 'react-native'
import { STYLES } from '../../../appStyles';
import { width, postAnalytics } from '../../../utils/config'

const styles = StyleSheet.create({
    badgeContainer: {
        borderRadius: 30,
        height: 20,
        width: 20,
        backgroundColor: '#1B3687',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 1
    },
    countText: {
        color: 'white',
        fontSize: 12,
    }
})

export default styles;