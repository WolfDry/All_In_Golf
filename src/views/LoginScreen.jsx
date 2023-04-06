import * as React from 'react';
import { TextInput, Text, StyleSheet, View, Pressable, Image, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import globalStyles from '../../assets/globalStyle';
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export function LoginScreen({ navigation, route }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [loaded] = useFonts({
        Broadway: require('../../assets/fonts/broadway-normal.ttf')
    })

    if (!loaded) {
        return null
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user
                console.log('Logged in with : ' + user.email)
                navigation.navigate('Home')
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
                    Connecte toi
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
                </View>
                <Pressable
                    style={styles.Loginbutton}
                    onPress={handleLogin}
                >
                    <Text style={[globalStyles.white, globalStyles.hongkong]}>Connexion</Text>
                </Pressable>
                <Pressable>
                    <Text style={[globalStyles.white, globalStyles.hongkong]}>
                        Mot de passe oublié ?
                    </Text>
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
                <Pressable onPress={() => navigation.navigate('Register')}>
                    <Text style={[globalStyles.white, globalStyles.hongkong, { borderBottomColor: 'white' }]}>
                        Nouveau ? Créer ton compte ici
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
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
        fontSize: 30,
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
        marginVertical: 25,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: 270,
        borderRadius: 50,
        backgroundColor: '#36A970',
    },
    arrowBack: {
        margin: 60
    },
    registerContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'black',
        height: 10
    }
});