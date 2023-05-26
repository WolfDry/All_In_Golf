import React from 'react'
import { RegisterScreen } from '../views/RegisterScreen'
import { FirstScreen } from '../views/FirstScreen'
import { LoginScreen } from '../views/LoginScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export function AuthStack() {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={FirstScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    )
}