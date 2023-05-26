import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { AuthContext } from '../context/AuthContext';
import { ImageBackground, View } from 'react-native';
import globalStyles from '../../assets/globalStyle';
import { AppStack } from './AppStack';
import LottieView from 'lottie-react-native';
import { LoginStack } from './LoginStack';
import COLORS from '../const/colors';

export function AppNav() {

    const { isLoading, userToken, isRegister } = useContext(AuthContext)

    if (isLoading) {
        return (
            // <View style={[globalStyles.center, globalStyles.fullScreen]}>
            //     <ActivityIndicator size={'large'} />
            // </View>
            <View style={[globalStyles.fullScreen, globalStyles.center, { zIndex: 997, backgroundColor: COLORS.green }]}>
                <ImageBackground style={[globalStyles.fullScreen, globalStyles.center, { zIndex: 998 }]} source={require('../../assets/loader/backgroundLoader.png')}>
                    <LottieView style={{ zIndex: 999 }} source={require('../../assets/loader/loader.json')} autoPlay loop />
                </ImageBackground>
            </View>
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