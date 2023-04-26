import * as React from 'react';
import { Text, StyleSheet, View, Pressable, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import globalStyles from '../../assets/globalStyle';
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth';

export function HomeScreen({ navigation, route }) {
    const [loginPost, setLoginPost] = React.useState('');
    const [passwordPost, setPasswordPost] = React.useState('');

    const [loaded] = useFonts({
        Broadway: require('../../assets/fonts/broadway-normal.ttf')
    })

    const handleSignUp = () => {
        signOut(auth)
            .then(() => {
                console.log('SignOut')
                navigation.navigate('Login')
            })
            .catch(error => alert(error.message))
    }

    if (!loaded) {
        return null
    }

    return (
        <ImageBackground source={require('../../assets/img/bg.jpg')} style={globalStyles.fullScreen}>
            <View style={[globalStyles.fullScreen, globalStyles.center]}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/img/logo-vert.jpg')}
                />
            </View>
            <View style={[globalStyles.fullScreen, globalStyles.center]}>
                <Text style={[globalStyles.title, globalStyles.white]}>All In Golf</Text>
            </View>
            <View style={[globalStyles.fullScreen, globalStyles.center]}>
                {auth.currentUser &&
                    <Pressable style={[styles.button, globalStyles.center, { marginBottom: 15 }]} onPress={() => navigation.navigate('Profile')}>
                        <Text style={[globalStyles.hongkong]}>
                            Profil
                        </Text>
                    </Pressable>
                }
                {!auth.currentUser &&
                    <View style={[globalStyles.fullScreen, globalStyles.center]}>
                        <Pressable style={[styles.button, globalStyles.center, { marginBottom: 15 }]} onPress={() => navigation.navigate('Login')}>
                            <Text style={[globalStyles.hongkong]}>
                                Se connecter
                            </Text>
                        </Pressable>
                        <Pressable style={[styles.button, globalStyles.center]} onPress={() => navigation.navigate('Register')}>
                            <Text style={[globalStyles.hongkong]}>
                                Créer un compte
                            </Text>
                        </Pressable>
                    </View>
                }
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
    button: {
        width: '75%',
        backgroundColor: 'white',
        padding: '3%',
        borderRadius: 100,
    }
});