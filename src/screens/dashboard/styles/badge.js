
import React from 'react'
import { StyleSheet } from 'react-native'
import { STYLES } from '../../../appStyles';
import { width, postAnalytics } from '../../../utils/config'

const styles = StyleSheet.create({
    badgeContainer: {
        borderRadius: 50,
        minHeight: 20,
        minWidth: 20,
        backgroundColor: '#1B3687',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingHorizontal: 3,
        paddingVertical: 2,
        paddingBottom: 3
    },
    countText: {
        color: 'white',
        fontSize: 12,
        // margin: 5
    }
})

export default styles;