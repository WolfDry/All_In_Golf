import * as React from 'react';
import { TextInput, Text, StyleSheet, View, Pressable, Image, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import globalStyles from '../../assets/globalStyle';
import { auth, db } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { strRandom } from '../../assets/func/random';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function RegisterScreen({ navigation, route }) {

    const [email, setEmail] = React.useState('');
    const [pseudo, setPseudo] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [id, setId] = React.useState('');

    const [loaded] = useFonts({
        Broadway: require('../../assets/fonts/broadway-normal.ttf')
    })

    if (!loaded) {
        return null
    }

    const handleSignUp = async () => {

        const docRef = strRandom({
            includeUpperCase: true,
            includeNumber: true,
            length: 20,
        })

        setId(strRandom({
            includeUpperCase: true,
            includeNumber: true,
            length: 20,
        }))

        try {
            await setDoc(doc(db, "users", docRef), {
                email: email,
                pseudo: pseudo,
            });
        } catch (e) {
            alert(e.message)
        }

        try {
            const jsonValue = JSON.stringify(docRef)
            await AsyncStorage.setItem('@uidUser', jsonValue)
        } catch (e) {
            alert(e.message)
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user
                console.log('Registered in with : ' + user.email)
                navigation.navigate('Login')
            })
            .catch(e => alert(e.message))
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
                            <Text style={[globalStyles.white, globalStyles.hongkong, globalStyles.borderBottom]}>
                                Déjà inscrit ? Connecte toi ici
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
