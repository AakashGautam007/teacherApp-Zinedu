import React, {useContext} from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import PendingDoubts from '../screens/doubtresponse/PendingDoubts';
import Doubt from '../screens/doubtresponse/Doubt';
import DppInfo from '../screens/doubtresponse/DppInfo';
import WannaAnsOrNot from '../screens/doubtresponse/WannaAnsOrNot';
import { AntDesign } from '@expo/vector-icons'; 
import {AuthContext} from '../utils/context'
import { Entypo } from '@expo/vector-icons'; 


const Stack = createStackNavigator();

export default function DoubtStack({navigation}) {

  const { logout } = useContext(AuthContext);

    return (
        <Stack.Navigator initialRouteName="PendingDoubts" >
        <Stack.Screen name="PendingDoubts" component={PendingDoubts} options={{
          headerRightContainerStyle:{marginHorizontal:10},
          headerLeftContainerStyle:{marginHorizontal:10},
          title:'Pending Doubts',
          // headerLeft:()=>(
          //   <Entypo name="menu" size={24} color="black" onPress={()=>navigation.toggleDrawer()} />
          // ),
          // headerRight:()=>(
          //   <AntDesign name="logout" size={24} color="black" onPress={logout} />
          // )
        }} />
        <Stack.Screen name="WannaAnsOrNot" component={WannaAnsOrNot} options={{title:'Accept/Decline Doubt'}} />
        <Stack.Screen name="Doubts" component={Doubt} options={{title:'Add Ans Image'}} />
        <Stack.Screen name="DppInfo" component={DppInfo} options={{title:'Enter Dpp Info'}} /> 
      </Stack.Navigator>
    )
}
