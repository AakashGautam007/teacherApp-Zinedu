import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView} from 'react-native'

const NotesDashboard = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container} >
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'90%',marginVertical:10,marginTop:20}}>

                <TouchableOpacity 
                onPress={()=>navigation.navigate('NotesAdd')}
                style={{width:'45%',justifyContent:'center',alignItems: 'center',backgroundColor:'#ECECEC',height:157,borderRadius:30}} >
                <View >

                    <Text>
                        ADD NOTES
                    </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>navigation.navigate('NotesView')}
                style={{width:'45%',justifyContent:'center',alignItems: 'center',backgroundColor:'#ECECEC',height:157,borderRadius:30}} >
                
                <View >
                    <Text>
                        VIEW NOTES
                    </Text>
                </View>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default NotesDashboard

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})
