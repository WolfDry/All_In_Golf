import React from 'react'
import { ProfileScreen } from '../views/ProfileScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export function AppStack() {

    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName='Profile' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}