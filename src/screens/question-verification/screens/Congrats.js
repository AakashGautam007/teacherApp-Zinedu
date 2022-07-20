import React, { useEffect, useState, useContext, useRef, useCallback } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import styles from '../styles/congrats'
import { ActivityIndicatorComponent } from '../../../components/ActivityIndicatorComponent'
import HeaderComponent from '../../../components/HeaderComponent'




const Congrats = (props) => {
    const { navigation } = props


    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent onPress={navigation.goBack}/>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image
                    source={require('../../../assets/congrats-gif/congrats.gif')}
                    style={styles.image}
                    resizeMode='cover'
                />
                <Text style={styles.text}>Hurray! You do not have any question to verify. </Text>
            </View>

        </SafeAreaView>
    )
}

export default Congrats;

