import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENDPOINT, width } from '../../utils/config'
import dateFormat from 'dateformat'
import ClassCard from "../common/ClassCard"
import { useAuthFields } from '../../AppUtils/hooks/useAuthFields';

const TimeTable = ({ navigation }) => {

    const { userToken, userName } = useAuthFields();
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const isFocused = useIsFocused();

    const getSchedule = async () => {
        // const userToken = await AsyncStorage.getItem('userToken')
        // const username = await AsyncStorage.getItem('userName')
        const response1 = await fetch(`${ ENDPOINT }/users/get-user-id-base-on-username/?username=${ username }`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${ userToken }`,

            },
            method: `GET`
        })
        const D1 = await response1.json();

        console.log("Sattdouegdievdiouhekdjgeogdeodbe", D1.payload.user_id);

        const response = await fetch(`${ ENDPOINT }/student/get-live-class-for-a-faculty/?is_upcoming=true&faculty_user_id=${ D1.payload.user_id }`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${ userToken }`,

            },
            method: `GET`
        })
        const D = await response.json();
        // console.log(D.payload.liveclasses[0], 'Time Table data')
        setData(D.payload.liveclasses)

        setIsLoading(false)
        setRefreshing(false)
    }

    // const getStatus = async () => {
    //     const userToken = await AsyncStorage.getItem('userToken')
    //     const username = await AsyncStorage.getItem('userName')
    //     const response = await fetch(`${ ENDPOINT }/support/check-misc-chapters-in-past-class/?teacher=${ username }`, {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Token ${ userToken }`,

    //         },
    //         method: `GET`
    //     })
    //     const D = await response.json();
    //     console.log(D)
    //     if (D.num_live_classes <= 3) {
    //         getSchedule()
    //     }
    //     else {
    //         Alert.alert(`${ D.num_live_classes } Classes have misc Chapter please updated them to see Scheduled Live Classes`)
    //         navigation.navigate('Dashboard')
    //     }
    //     // setData(D)
    //     // setIsLoading(false)
    //     // setRefreshing(false)
    // }



    const onRefresh = () => {
        // setIsLoading(true)
        setRefreshing(true)
        getSchedule()

    }

    useEffect(() => {
        if (isFocused) {

            getSchedule()

        }
    }, [isFocused])

    if (isLoading) {
        // if(isLoading){
        return (
            <SafeAreaView
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (data === undefined && !isLoading || data.length === 0) {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}><Text> No live classes scheduled</Text></View>)
    }

    return (
        <SafeAreaView style={styles.container} >
            {/* <Text style={{fontSize:22}} >Live Classes Schedule</Text> */}
            <FlatList
                showsVerticalScrollIndicator={false}

                data={data}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={({ item, i }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('LiveClassInfo', { item })}
                        >
                            <ClassCard item={item} isPastClassPage={false} />



                        </TouchableOpacity>
                    )
                }}
                keyExtractor={item => `${ item.live_class_id }`}
            />
        </SafeAreaView>
    )
}

export default TimeTable

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    txt: {
        color: 'black', paddingVertical: 1.8
    }
})
