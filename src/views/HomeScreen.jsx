import * as React from 'react';
import { Text, StyleSheet, View, Pressable, Image, ScrollView, TouchableOpacity } from 'react-native';
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
        <ScrollView style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/img/favicon.png')}
                />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    All In Golf
                </Text>
            </View>
            <View style={styles.formContainer}>
                <Pressable
                    style={styles.Loginbutton}
                    onPress={() => {
                        // Pass and merge params back to home screen
                        navigation.navigate({
                            name: 'Login',
                            params: {
                                post: {
                                    login: loginPost,
                                    password: passwordPost
                                }
                            },
                            merge: true,
                        });
                    }}
                >
                    <Text style={[globalStyles.white, globalStyles.hongkong]}>Se connecter</Text>
                </Pressable>
                <Pressable
                    style={styles.Loginbutton}
                    onPress={() => {
                        // Pass and merge params back to home screen
                        navigation.navigate({
                            name: 'Register',
                            params: {
                                post: {
                                    login: loginPost,
                                    password: passwordPost
                                }
                            },
                            merge: true,
                        });
                    }}
                >
                    <Text style={[globalStyles.white, globalStyles.hongkong]}>S'enregister</Text>
                </Pressable>
            </View>
            {auth.currentUser &&
                <View>
                    <Text style={globalStyles.white}>Email : {auth.currentUser?.email}</Text>
                    <TouchableOpacity onPress={handleSignUp} style={{ backgroundColor: '#36A970', padding: 10, margin: 10 }}>
                        <Text style={[globalStyles.white]}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            }

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
        fontFamily: 'Broadway',
        fontSize: 30,
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
        width: 200,
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