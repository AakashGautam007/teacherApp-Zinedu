import React from 'react'

import Login from '../screens/auth/Login'
import SignUp from '../screens/auth/SignUp'
import ForgetPassword from '../screens/auth/ForgetPassword'
import { createStackNavigator } from '@react-navigation/stack';
import ResetPassword from '../screens/auth/ResetPassword';
import DrawerNav from './DrawerNav';

const AuthStacks = createStackNavigator();

export default function AuthStack({navigation}) {
    return (
        <AuthStacks.Navigator initialRouteName="Login" screenOptions={{headerShown:false}} >
            <AuthStacks.Screen name="Login" component={Login}  />
            <AuthStacks.Screen name="SignUp" component={SignUp} />
            <AuthStacks.Screen name="ForgetPassword" component={ForgetPassword} />
            <AuthStacks.Screen name="ResetPassword" component={ResetPassword} />
            <AuthStacks.Screen name="Dashboard" component={DrawerNav} />

        </AuthStacks.Navigator>
    )
}
