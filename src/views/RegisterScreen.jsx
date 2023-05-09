import { useContext, useState } from 'react';
import { TextInput, Text, StyleSheet, View, Pressable, Image, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import globalStyles from '../../assets/globalStyle';
import { auth, db } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore"
import { strRandom } from '../../assets/func/random'
import { AuthContext } from '../context/AuthContext';



export function RegisterScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);

    const [loaded] = useFonts({
        Broadway: require('../../assets/fonts/broadway-normal.ttf')
    })

    if (!loaded) {
        return null
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
                            onPress={() => { register(pseudo, email, password) }}
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
