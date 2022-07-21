import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { STYLES } from '../appStyles'

export const scrollToTop = (scrollRef) => {
    setTimeout(() => {
        scrollRef && scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }, 100)
};

const ScrollToTop = ({ onPress, scrollRef, style }) => {
    return <TouchableOpacity
        style={[STYLES.elevation, styles.scrollToTop, style]}
        onPress={() => {
            onPress ? onPress() : scrollToTop(scrollRef)
        }}
    >
        <Fontisto
            name={'angle-up'}
            size={20} />
    </TouchableOpacity>
}

export default ScrollToTop;

const styles = StyleSheet.create({
    scrollToTop: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        right: 20,
    }
})