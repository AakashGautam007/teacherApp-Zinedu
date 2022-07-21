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
import styles from "./styles/drawer-nav";

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
        options={{
          title: "Home",
          headerTitleStyle: styles.header
        }}
      />
      <Drawer.Screen
        name="MyScheduleStack"
        component={MyScheduleStack}
        options={{
          title: "My Schedule",
          headerTitleStyle: styles.header
        }}
      />
      <Drawer.Screen
        name="PastClassesStack"
        component={PastClassesStack}
        options={{
          title: "My Past Classes",
          headerTitleStyle: styles.header
        }}
      />
      <Drawer.Screen
        name="DoubtStack"
        component={DoubtStack}
        options={{
          title: "Student Doubts",
          headerTitleStyle: styles.header
        }}
      />
      <Drawer.Screen
        name="SearchQuestionStack"
        component={SearchQuestionStack}
        options={{
          title: "Search Question",
          headerTitleStyle: styles.header
        }}
      />
    </Drawer.Navigator>
  );
}
