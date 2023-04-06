import * as React from 'react';
import { TextInput, Text, StyleSheet, View, Pressable, Image, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import globalStyles from '../../assets/globalStyle';
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';

export function RegisterScreen({ navigation, route }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [loaded] = useFonts({
        Broadway: require('../../assets/fonts/broadway-normal.ttf')
    })

    if (!loaded) {
        return null
    }

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user
                console.log('Registered in with : ' + user.email)
            })
            .catch(error => alert(error.message))
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/img/favicon.png')}
                />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Enregistre toi
                </Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Pseudo"
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
                    <TextInput
                        placeholder="Mot de passe"
                        style={[styles.inputs, globalStyles.hongkong]}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>
                <Pressable
                    style={styles.Loginbutton}
                    onPress={handleSignUp}
                >
                    <Text style={[globalStyles.white, globalStyles.hongkong]}>S'enregistrer</Text>
                </Pressable>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Ionicons
                    style={styles.arrowBack}
                    name="arrow-back-outline"
                    size={64}
                    color="white"
                    onPress={() => navigation.goBack()}
                />
            </View>
            <View style={styles.registerContainer}>
                <Pressable onPress={() => { navigation.navigate('Login') }}>
                    <Text style={[globalStyles.white, globalStyles.hongkong, { borderBottomColor: 'white' }]}>
                        Ancien ? Connecte toi ici
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Broadway',
        height: 500,
        borderColor: 'red',
        backgroundColor: 'black'
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 80
    },
    titleContainer: {
        flex: 0.5,
        alignItems: 'center',
    },
    title: {
        padding: 50,
        fontSize: 28,
        fontFamily: 'Broadway',
        color: 'white'
    },
    formContainer: {
        flex: 1,
        alignItems: 'center',
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputs: {
        margin: 5,
        padding: 10,
        width: 225,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'white'
    },
    Loginbutton: {
        marginTop: 25,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: 270,
        borderRadius: 50,
        backgroundColor: '#36A970',
    },
    arrowBack: {
        margin: 50
    },
    registerContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'black',
        height: 5
    }
});