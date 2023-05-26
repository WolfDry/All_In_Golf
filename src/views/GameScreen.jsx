import { StyleSheet, ScrollView, KeyboardAvoidingView, Text } from 'react-native';
import globalStyles from '../../assets/globalStyle';

export function GameScreen() {

    return (
        <KeyboardAvoidingView style={[globalStyles.fullScreen, globalStyles.center]}>
            <ScrollView
                contentContainerStyle={[globalStyles.fullScreen, globalStyles.center]}
                bounces={false}>
                <Text style={[globalStyles.fullScreen, globalStyles.center]}>GameScreen</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({})