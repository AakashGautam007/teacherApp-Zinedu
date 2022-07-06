import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Filter from "../screens/question-verification/screens/Filter";
import Dashboard from "../screens/dashboard/screens/Dashboard";
import SimilarQuestion from "../screens/question-verification/screens/SimilarQuestion";

const Stack = createStackNavigator();

export default function DashboardStack({ navigation }) {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Dashboard" component={Dashboard} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Filter" component={Filter} options={{
                headerShown: false
            }} />
            <Stack.Screen name="SimilarQuestion" component={SimilarQuestion} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    );
}
