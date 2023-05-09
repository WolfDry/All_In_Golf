import React from 'react'
import { LoginScreen } from '../views/LoginScreen'
import { RegisterScreen } from '../views/RegisterScreen'
import { HomeScreen } from '../views/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export function LoginStack() {

    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}