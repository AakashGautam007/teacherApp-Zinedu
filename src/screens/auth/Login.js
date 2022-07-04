import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView, SafeAreaView } from 'react-native'
// import { LinearGradient } from 'expo-linear-gradient';
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions'
import { AuthContext } from '../../utils/context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
// import { increment, decrement }  from '../../redux/reducer/counterSlice';
import { setValues } from '../../redux/reducer/authReducer'

const { width, height } = Dimensions.get('window');


// Notifications.setNotificationHandler({
//     handleNotification: async()=>{
//         return {
//             shouldShowAlert:true
//         };
//     }
// })


export default function Login({ navigation }) {

    const { signin } = useContext(AuthContext);


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { value, range } = useSelector((state) => state.counter)
    const dispatch = useDispatch()

    // const { LOGIN } = React.useContext(AuthContext);


    // useEffect(() => {
    //     Permissions.getAsync(Permissions.NOTIFICATIONS).then(statusobj=>{
    //         if(statusobj.status !=='granted')
    //         return Permissions.askAsync(Permissions.NOTIFICATIONS)
    //         {
    //         return statusobj;
    //         }
    //     }).then((statusobj)=>{
    //             if (statusobj.status!=='granted')
    //                 return;
    //     })

    // }, [])


    // const triggerNotif =()=>{
    //     Notifications.scheduleNotificationAsync({
    //         content:{
    //             title:'youuu got a notiffff...',
    //             body:'izzza notification bodyyyy',
    //         },
    //         trigger:{
    //             seconds:1,
    //         },
    //     });

    // }



    return (
        <SafeAreaView style={styles.container} >

            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width, padding: 25, paddingTop: width * 0.1 }} >
                <Text style={{ fontSize: 30, color: '#2C3687', fontWeight: 'bold', padding: 2 }} >Login</Text>
                <Text style={{ fontSize: 17, color: '#6A7180', padding: 2 }}>Login to continue</Text>
            </View>

            <View>
                <TextInput placeholder="Username" placeholderTextColor="#6A7180" style={styles.textinp}
                    onChangeText={text => setUsername(text)}
                    value={username}
                    autoCapitalize='none'
                />
                <TextInput placeholder="Password" placeholderTextColor="#6A7180" style={styles.textinp}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    autoCapitalize='none'
                />
                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', paddingVertical: 7 }} >

                    <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')} ><Text style={{ color: '#2C3687', fontSize: 16 }} > Forgot Password?</Text></TouchableOpacity>
                </View>
            </View>

            <View style={{ paddingTop: 40 }} >

                <TouchableOpacity onPress={() => signin(username, password)} style={{ width: (width * 0.8), height: 48, justifyContent: 'center', borderRadius: 8, backgroundColor: '#EA7A26' }} >
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: '600' }} >Login</Text>
                </TouchableOpacity>
{/* 
                <Text>{value} {range}</Text>

                <TouchableOpacity onPress={() => {
                    dispatch(increment({ value: 1 }))
                }} style={{ width: (width * 0.8), height: 48, justifyContent: 'center', borderRadius: 8, backgroundColor: '#EA7A26' }} >
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: '600' }} >Inc</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    dispatch(decrement())
                }} style={{ width: (width * 0.8), height: 48, justifyContent: 'center', borderRadius: 8, backgroundColor: '#EA7A26' }} >
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: '600' }} >Dec</Text>
                </TouchableOpacity> */}

            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textinp: {
        width: (width * 0.85),
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#DADFEB',
        textAlign: 'left',
        marginTop: 30,


    },
    smallbutton: {

    }
});