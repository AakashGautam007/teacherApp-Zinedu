import React, { useEffect, useState }from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Pdf from 'react-native-pdf';
import {width,height} from '../../utils/config'

const NotesView = ({navigation,route}) => {

    const {file} = route.params;
    const source = {uri:file,cache:true};

    useEffect(() => {
        console.log(file)
    })

    return (
        <View style={styles.container}>
        {/* <Button title="back" onPress={()=>navigation.navigate('PastLiveClasses')} /> */}
        <Pdf
            source={source}
            onLoadComplete={(numberOfPages,filePath)=>{
                console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page,numberOfPages)=>{
                console.log(`current page: ${page}`);
            }}
            onError={(error)=>{
                console.log(error);
            }}
            onPressLink={(uri)=>{
                console.log(`Link presse: ${uri}`)
            }}
            style={styles.pdf}/>
    </View>
    )
}

export default NotesView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width,
        height,
    }
  });
