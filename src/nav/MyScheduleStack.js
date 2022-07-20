import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import TimeTable from "../screens/timetable/TimeTable";
import Tags from "../screens/timetable/Tags";
import LiveClassInfo from "../screens/timetable/LiveClassInfo";
import NotesView from "../screens/timetable/NotesView";
import NotesAdd from "../screens/timetable/NotesAdd";
import NotesFile from "../screens/timetable/NotesFile";
import Chapter from "../screens/timetable/Chapter";
import SubjectEdit from "../screens/timetable/SubjectEdit";
import ViewRecording from "../screens/pastliveclasses/ViewRecording";
import AddPpt from "../screens/timetable/AddPpt";
import ScanScreen from "../screens/timetable/ScanScreen";

const Stack = createStackNavigator();

export default function MyScheduleStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="TimeTable">
      <Stack.Screen
        name="TimeTable"
        component={TimeTable}
        options={{
          headerLeftContainerStyle: { marginHorizontal: 10 },
          title: "My Schedule",
          // headerLeft: () => (
          //   <Entypo
          //     name="menu"
          //     size={24}
          //     color="black"
          //     onPress={() => navigation.toggleDrawer()}
          //   />
          // ),
        }}
      />
      <Stack.Screen name="Tags" component={Tags} options={{ title: "Tags" }} />
      <Stack.Screen
        name="LiveClassInfo"
        component={LiveClassInfo}
        options={{ title: "Live Class Info" }}
      />
      <Stack.Screen
        name="NotesView"
        component={NotesView}
        options={{ title: "View Notes" }}
      />
      <Stack.Screen
        name="NotesAdd"
        component={NotesAdd}
        options={{ title: "Select live Class" }}
      />
      <Stack.Screen
        name="NotesFile"
        component={NotesFile}
        options={{ title: "Add Notes" }}
      />
      <Stack.Screen
        name="Chapter"
        component={Chapter}
        options={{ title: "Chapter" }}
      />
      <Stack.Screen
        name="SubjectEdit"
        component={SubjectEdit}
        options={{ title: "Edit Subject" }}
      />
      <Stack.Screen
        name="ViewRecording"
        component={ViewRecording}
        options={{ title: "Recording" }}
      />
      <Stack.Screen
        name="AddPpt"
        component={AddPpt}
        options={{ title: "Add Ppt" }}
      />
      <Stack.Screen
        name="ScanScreen"
        component={ScanScreen}
        options={{ title: "ScanScreen" }}
      />
    </Stack.Navigator>
  );
}
