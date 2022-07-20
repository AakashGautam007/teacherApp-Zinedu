import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Dashboard from "../screens/dashboard/screens/Dashboard";
import NotesStack from "./NotesStack";
import DoubtStack from "./DoubtStack";
import TimeTable from "../screens/timetable/TimeTable";
import MyScheduleStack from "./MyScheduleStack";
import CustomDrawerContent from "../components/CustomDrawerContent";
import PastClassesStack from "./PastClassesStack";
import SearchQuestionStack from "./SearchQuestionStack";
import Filter from "../screens/question-verification/screens/Filter";
import DashboardStack from "./DashboardStack";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="MyScheduleStack"
        component={MyScheduleStack}
        options={{ title: "My Schedule" }}
      />
      <Drawer.Screen
        name="PastClassesStack"
        component={PastClassesStack}
        options={{ title: "My Past Classes" }}
      />
      <Drawer.Screen
        name="DoubtStack"
        component={DoubtStack}
        options={{ title: "Student Doubts" }}
      />
      <Drawer.Screen
        name="SearchQuestionStack"
        component={SearchQuestionStack}
        options={{ title: "Search Question" }}
      />
    </Drawer.Navigator>
  );
}
