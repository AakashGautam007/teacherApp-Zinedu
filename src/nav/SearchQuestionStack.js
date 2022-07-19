import React, {useContext} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons'; 
import SearchQuestion from '../screens/timetable/SearchQuestion';
import ViewRecording from '../screens/pastliveclasses/ViewRecording';


const Stack = createStackNavigator();

export default function SearchQuestionStack({navigation}) {

    return (
        <Stack.Navigator initialRouteName="SearchQuestion" >
        <Stack.Screen name="SearchQuestion" component={SearchQuestion} options={{
          headerLeftContainerStyle:{marginHorizontal:10},
          title:'Question Bank',
          // headerLeft:()=>(
          //   <Entypo name="menu" size={24} color="black" onPress={()=>navigation.toggleDrawer()} />
          // )
        }}   />
            <Stack.Screen name="ViewRecording" component={ViewRecording} options={{title:'Recording'}} /> 
      </Stack.Navigator>
    )
}