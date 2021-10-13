// import React, {useContext} from 'react'
// import { createStackNavigator } from '@react-navigation/stack';
// import NotesDashboard from '../screens/notes/NotesDashboard';
// import NotesView from '../screens/timetable/NotesView';
// import NotesAdd from '../screens/timetable/NotesAdd';
// import NotesFile from '../screens/timetable/NotesFile';
// import { Entypo } from '@expo/vector-icons'; 

// const Stack = createStackNavigator();

// export default function NotesStack({navigation}) {

//     return (
//         <Stack.Navigator initialRouteName="NotesDashboard" >
//         <Stack.Screen name="NotesDashboard" component={NotesDashboard} options={{
//           headerLeftContainerStyle:{marginHorizontal:10},
//           title:'Notes',
//           headerLeft:()=>(
//             <Entypo name="menu" size={24} color="black" onPress={()=>navigation.toggleDrawer()} />
//           )
//         }}   />
//         <Stack.Screen name="NotesView" component={NotesView} options={{title:'View Notes'}} />
//         <Stack.Screen name="NotesAdd" component={NotesAdd} options={{title:'Select live Class'}} /> 
//         <Stack.Screen name="NotesFile" component={NotesFile} options={{title:'Add Notes'}} /> 

//       </Stack.Navigator>
//     )
// }