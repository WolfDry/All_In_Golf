import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import globalStyles from '../../assets/globalStyle';
import { AppStack } from './AppStack';

export function AppNav() {

    const { isLoading, userToken } = useContext(AuthContext)

    if (isLoading) {
        return (
            <View style={[globalStyles.center, globalStyles.fullScreen]}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

    return (
        <NavigationContainer>
            {userToken !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer >
    )
}