import { StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'
import globalStyles from '../../assets/globalStyle'

export function AppLoader() {
    return (
        <View style={[globalStyles.fullScreen, globalStyles.center, { zIndex: 999 }]}>
            <LottieView source={require('../../assets/loader/92907-golfer.json')} autoPlay loop />
        </View>
    )
}