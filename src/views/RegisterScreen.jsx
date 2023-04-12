import * as React from 'react';
import { TextInput, Text, StyleSheet, View, Pressable, Image, ScrollView, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import globalStyles from '../../assets/globalStyle';
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';

export function RegisterScreen({ navigation, route }) {
    const [email, setEmail] = React.useState('');
    const [pseudo, setPseudo] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [loaded] = useFonts({
        Broadway: require('../../assets/fonts/broadway-normal.ttf')
    })

    if (!loaded) {
        return null
    }

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password, pseudo)
            .then((userCredentials) => {
                const user = userCredentials.user
                console.log('Registered in with : ' + user.email)
                navigation.navigate('Login')
            })
            .catch(error => alert(error.message))
    }

    return (
        <ImageBackground source={require('../../assets/img/bg.jpg')} style={[globalStyles.center, globalStyles.fullScreen]}>
            <View style={[globalStyles.center, { flex: 3, width: '100%' }]}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/img/logo-vert.jpg')}
                />
            </View>
            <View style={[globalStyles.center, globalStyles.fullScreen]}>
                <Text style={[globalStyles.title, globalStyles.white]}>
                    Bienvenue
                </Text>
            </View>
            <View style={[globalStyles.center, { flex: 3, width: '100%' }]}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Pseudo"
                        style={[styles.inputs, globalStyles.hongkong]}
                        value={pseudo}
                        onChangeText={setPseudo}
                    />
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
                    style={[styles.button]}
                    onPress={handleSignUp}
                >
                    <Text style={[globalStyles.white, globalStyles.hongkong]}>Créer son compte</Text>
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
                <Pressable onPress={() => { navigation.navigate('Login') }}>
                    <Text style={[globalStyles.white, globalStyles.hongkong]}>
                        Déjà inscrit ? Connecte toi ici
                    </Text>
                </Pressable>
            </View>
        </ImageBackground>
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

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//     },
//     image: {
//         height: '100%'
//     },
//     logo: {
//         width: 150,
//         height: 150,
//         marginTop: '15%',
//         marginBottom: '13%',
//         borderRadius: 100
//     },
//     titleContainer: {
//         flex: 0.5,
//         alignItems: 'center',
//     },
//     title: {
//         padding: '5%',
//         fontSize: 30,
//         fontFamily: 'Broadway',
//         color: 'white'
//     },
//     formContainer: {
//         flex: 1,
//         alignItems: 'center',
//     },
//     inputContainer: {
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     inputs: {
//         margin: '2%',
//         padding: '3%',
//         width: 225,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10,
//         backgroundColor: 'white'
//     },
//     button: {
//         marginVertical: '10%',
//         padding: '3%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '75%',
//         borderRadius: 100,
//         backgroundColor: '#36A970',
//     },
//     arrowBack: {
//         marginVertical: '3.9%',
//     },
//     registerContainer: {
//         alignItems: 'center',
//         justifyContent: 'flex-end',
//         marginBottom: '10%'
//     }
// });