import React, { useEffect, useState, useContext }from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import {AuthContext} from '../utils/context'
import {width, postAnalytics } from '../utils/config'

const Dashboard = ({navigation}) => {

    const { logout } = useContext(AuthContext);   


    useEffect(()=>{
        postAnalytics('teacher-dashboard',logout)
      },[])

    return (
        <View style={styles.container} >

            <View style={{backgroundColor:'#1C3687',width}} >

            <SafeAreaView style={{flexDirection:'row',justifyContent:'space-between'}} >

                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:10}} >
                <TouchableOpacity onPress={()=>navigation.toggleDrawer()} >
                <Image source={require('../assets/menu.png')} style={{height:44,width:44,marginHorizontal:8,marginVertical:14}} />
                </TouchableOpacity>
                <Image source={require('../assets/zinedu.png')} style={{width:118,height:26.08,marginLeft:8}} />
                </View>
                <Image source={require('../assets/bell.png')} style={{width:30,height:33,margin:14 }} />
            
            </SafeAreaView>
            </View>

        <View style={{backgroundColor:'#EB7926',flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'90%',height:137,borderRadius:15,marginTop:30,marginVertical:10}}>
            
            <View style={{flex:1,flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start',margin:10}}>
                <Text style={{fontSize:20,fontWeight:'500',marginBottom:15}}>
                    Classes
                </Text>

                <TouchableOpacity   onPress={()=>navigation.navigate('MyScheduleStack')}>
                    <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#FFFFFF',paddingHorizontal:13,padding:7,borderRadius:47}}>
                        <Text style={{color:'#1C3687',fontSize:12,fontWeight:'500'}} >
                            VIEW SCHEDULE
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Image />

        </View>



            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'90%',marginVertical:10,marginTop:20}}>

                {/* <TouchableOpacity 
                style={{width:'45%',justifyContent:'center',alignItems: 'center',backgroundColor:'#ECECEC',height:157,borderRadius:30}} >
                <View >

                    <Text>
                        DPP
                    </Text>
                </View>
                </TouchableOpacity> */}

                <TouchableOpacity 
                onPress={()=>navigation.navigate('DoubtStack')}
                style={{width:'45%',justifyContent:'center',alignItems: 'center',backgroundColor:'#ECECEC',height:157,borderRadius:30}} >
                
                <View >
                    <Text>
                        STUDENT DOUBTS
                    </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>navigation.navigate('PastClassesStack')}
                style={{width:'45%',justifyContent:'center',alignItems: 'center',backgroundColor:'#ECECEC',height:157,borderRadius:30}} >
                
                <View >
                    <Text>
                       MY PAST CLASSES
                    </Text>
                </View>
                </TouchableOpacity>

            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'90%',marginVertical:10}}>

                <TouchableOpacity 
                onPress={()=>navigation.navigate('SearchQuestionStack')}
                style={{width:'45%',justifyContent:'center',alignItems: 'center',backgroundColor:'#ECECEC',height:157,borderRadius:30}} >
                
                <View >
                    <Text>
                        SEARCH QUESTION
                    </Text>
                </View>
                </TouchableOpacity>


            </View>





        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'flex-start',
        alignItems: 'center',
        width,
        backgroundColor:'white'
    }
})
