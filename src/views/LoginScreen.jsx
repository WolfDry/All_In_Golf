import * as React from 'react';
import { TextInput, Text, StyleSheet, View, Pressable, Image, ScrollView, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import globalStyles from '../../assets/globalStyle';
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function LoginScreen({ navigation, route }) {

    const [isSignIn, SetIsSignIn] = React.useState(false)
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [loaded] = useFonts({
        Broadway: require('../../assets/fonts/broadway-normal.ttf')
    })

    if (!loaded) {
        return null
    }

    const handleLogin = async () => {

        try {
            await AsyncStorage.setItem('@isLogin', 'true')
        } catch (e) {
            alert(e.message)
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user
                SetIsSignIn(true)
                console.log('Logged in with : ' + user.email)
                navigation.navigate('Profile')
            })
            .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView style={globalStyles.fullScreen}>
            <ScrollView
                contentContainerStyle={globalStyles.fullScreen}
                bounces={false}>
                <ImageBackground source={require('../../assets/img/bg.jpg')} style={[globalStyles.center, globalStyles.fullScreen]}>
                    <View style={[globalStyles.center, { flex: 3, width: '100%' }]}>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/img/logo-vert.jpg')}
                        />
                    </View>
                    <View style={[globalStyles.center, globalStyles.fullScreen]}>
                        <Text style={[globalStyles.title, globalStyles.white]}>
                            Connecte toi
                        </Text>
                    </View>
                    <View style={[globalStyles.center, { flex: 3, width: '100%' }]}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Email"
                                style={[styles.inputs, globalStyles.hongkong]}
                                value={email}
                                onChangeText={setEmail}
                            />
                            <TextInput
                                placeholder="Mot de passe"
                                style={[styles.inputs, globalStyles.hongkong]}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={true}
                            />
                        </View>
                        <Pressable
                            style={[styles.button,]}
                            onPress={handleLogin}
                        >
                            <Text style={[globalStyles.white, globalStyles.hongkong]}>Connexion</Text>
                        </Pressable>
                        <Pressable style={[globalStyles.fullScreen, globalStyles.center]}>
                            <Text style={[globalStyles.white, globalStyles.hongkong]}>
                                Mot de passe oublié ?
                            </Text>
                        </Pressable>
                    </View>
                    <View style={[globalStyles.center, globalStyles.fullScreen]}>
                        <Ionicons
                            style={styles.arrowBack}
                            name="arrow-back-outline"
                            size={64}
                            color="white"
                            onPress={() => navigation.navigate('Home')}
                        />
                    </View>
                    <View style={[globalStyles.center, globalStyles.fullScreen]}>
                        <Pressable onPress={() => navigation.navigate('Register')}>
                            <Text style={[globalStyles.white, globalStyles.hongkong, globalStyles.borderBottom]}>
                                Nouveau ? Créer ton compte ici
                            </Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    inputContainer: {
        flex: 3,
        alignItems: 'center',
        width: '100%',
    },
    inputs: {
        width: '65%',
        margin: '2%',
        padding: '3%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        padding: 15,
        backgroundColor: '#36A970',
        borderRadius: 100,
    }
})