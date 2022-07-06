import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const HeaderComponent = ({ text = '', onPress }) => {
    return <View style={styles.container}>
        {/* <TouchableOpacity style={{ marginLeft: 23 }} onPress={() => { }}> */}
        <MaterialIcons name='arrow-back' size={25}
            onPress={onPress}
            style={{ marginLeft: 23 }}
        />
        {/* </TouchableOpacity> */}
        <Text style={styles.text}>{text}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: 75,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 15
    }
})

export default HeaderComponent;