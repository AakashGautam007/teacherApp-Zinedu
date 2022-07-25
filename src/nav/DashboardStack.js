import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Filter from "../screens/question-verification/screens/Filter";
import Dashboard from "../screens/dashboard/screens/Dashboard";
import SimilarQuestion from "../screens/question-verification/screens/SimilarQuestion";
import CheckQuestion from "../screens/question-verification/screens/CheckQuestion";
import QuestionList from "../screens/question-verification/screens/QuestionList";
import Congrats from "../screens/question-verification/screens/Congrats";
import CheckQuestionNew from "../screens/question-verification/screens/CheckQuestionNew";
import QuestionListNew from "../screens/question-verification/screens/QuestionListNew";
import SimilarQuestionNew from "../screens/question-verification/screens/SimilarQuestionNew";

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
            <Stack.Screen name="SimilarQuestionNew" component={SimilarQuestionNew} options={{
                headerShown: false
            }} />
            <Stack.Screen name="CheckQuestion" component={CheckQuestion} options={{
                headerShown: false
            }} />
            <Stack.Screen name="CheckQuestionNew" component={CheckQuestionNew} options={{
                headerShown: false
            }} />
            <Stack.Screen name="QuestionList" component={QuestionList} options={{
                headerShown: false
            }} />
            <Stack.Screen name="QuestionListNew" component={QuestionListNew} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Congrats" component={Congrats} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    );
}
