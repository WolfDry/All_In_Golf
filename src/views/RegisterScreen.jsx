import { useContext, useState } from 'react'
import { Text, StyleSheet, View, Pressable, Image, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import globalStyles from '../../assets/globalStyle'
import { AuthContext } from '../context/AuthContext'
import COLORS from '../const/colors'
import Inputs from '../components/Inputs'
import Button from '../components/Button'



export function RegisterScreen({ navigation }) {

    const { register } = useContext(AuthContext)
    const [inputs, setInputs] = useState({
        pseudo: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})

    const validate = () => {
        let valid = true;
        if (!inputs.email) {
            handleErrors("Email nécessaire", 'email')
            valid = false
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleErrors("Email incorrect", 'email')
            valid = false
        }

        if (!inputs.pseudo) {
            handleErrors("Pseudo nécessaire", 'pseudo')
            valid = false
        }

        if (!inputs.password) {
            handleErrors("Mot de passe nécessaire", 'password')
            valid = false
        } else if (inputs.password.length < 8) {
            handleErrors("Mot de passe trop court", 'password')
            valid = false
        }

        if (valid) {
            register(inputs.pseudo, inputs.email, inputs.password)
        }
    }

    const handleOnchange = (text, input) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    }

    const handleErrors = (errorMessage, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }))
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
                        <Inputs
                            placeholder="Pseudo"
                            error={errors.pseudo}
                            onChangeText={text => handleOnchange(text, "pseudo")}
                            onFocus={() => {
                                handleErrors(null, "pseudo")
                            }}
                        />
                        <Inputs
                            placeholder="Email"
                            error={errors.email}
                            onChangeText={text => handleOnchange(text, "email")}
                            onFocus={() => {
                                handleErrors(null, "email")
                            }}
                        />
                        <Inputs
                            placeholder="Mot de passe"
                            error={errors.password}
                            password
                            onChangeText={text => handleOnchange(text, "password")}
                            onFocus={() => {
                                handleErrors(null, "password")
                            }}
                        />
                        <Button title='Créer son compte' onPress={validate} />
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
    )
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
        backgroundColor: COLORS.white,
        borderRadius: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        padding: 15,
        backgroundColor: COLORS.green,
        borderRadius: 100,
    }
})
