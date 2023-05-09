import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import globalStyles from '../../assets/globalStyle';
import { AppStack } from './AppStack';
import { LoginStack } from './LoginStack';

export function AppNav() {

    const { isLoading, userToken, isRegister } = useContext(AuthContext)

    if (isLoading) {
        return (
            <View style={[globalStyles.center, globalStyles.fullScreen]}>
                <ActivityIndicator size={'large'} />
            </View>
            // <View style={[globalStyles.fullScreen, globalStyles.center, { zIndex: 999 }]}>
            //     <LottieView source={require('../../assets/loader/92907-golfer.json')} autoPlay loop />
            // </View>
        )
    }

    if (isRegister && !userToken && !isLoading) {
        return (
            <NavigationContainer>
                <LoginStack />
            </NavigationContainer >
        )
    }

    return (
        <NavigationContainer>
            {userToken !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer >
    )
}