import { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import globalStyles from '../../assets/globalStyle';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppLoader } from '../components/AppLoader';
import { useLoading } from '../context/LoadingProvider';

LocaleConfig.locales['fr'] = {
    monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ],
    monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: 'Aujourd\'hui'
};

LocaleConfig.defaultLocale = 'fr';

export function ProfileScreen({ navigation, route }) {

    const [selected, setSelected] = useState('');
    const [user, setUser] = useState()

    const { isLoading, setIsLoading } = useLoading()

    useEffect(() => {
        async function getCurrentUser() {
            setIsLoading(true)
            try {
                const jsonValue = await AsyncStorage.getItem('@uidUser')
                const uidUser = jsonValue != null ? JSON.parse(jsonValue) : null;

                const userCollection = doc(db, 'users', uidUser)
                const userSnapshot = await getDoc(userCollection)

                if (userSnapshot != null) {
                    setIsLoading(false)
                    return userSnapshot.data()
                }
            } catch (e) {
                alert(e.message)
            }

        }
        getCurrentUser().then(setUser)
    }, [])

    const handleSignUp = async () => {

        try {
            await AsyncStorage.setItem('@isLogin', 'false')
        } catch (e) {
            alert(e.message)
        }

        signOut(auth)
            .then(() => {
                console.log('SignOut')
                navigation.navigate('Login')
            })
            .catch(error => alert(error.message))
    }

    return (
        <>
            {isLoading && <AppLoader />}
            {!isLoading &&
                <ScrollView style={{ backgroundColor: 'white' }} contentContainerStyle={globalStyles.center}>
                    <ImageBackground source={require('../../assets/img/profil.png')} style={[styles.header, globalStyles.center]}>
                        <View style={[styles.bubble, globalStyles.center]}>
                            <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 21, textAlign: 'center' }]}>23</Text>
                            <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 13, textAlign: 'center' }]}>Parties</Text>
                        </View>
                        <View style={[styles.bubble, globalStyles.center, styles.image]}>
                            <Image style={{ width: '100%', height: '100%', borderRadius: 100 }} source={require('../../assets/img/logo-vert.jpg')} />
                        </View>
                        <View style={[styles.bubble, globalStyles.center]}>
                            <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 21, textAlign: 'center' }]}>16</Text>
                            <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 13, textAlign: 'center' }]}>Amis</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.detailsContainer}>
                        <View style={[globalStyles.fullScreen, styles.bubbleContainer]}>
                            <Text style={[globalStyles.hongkong, { fontSize: 18, marginBottom: 15 }]}>{user && user.pseudo}</Text>
                        </View>
                        <View style={[globalStyles.fullScreen, styles.bubbleContainer]}>
                            <Text style={[globalStyles.hongkong, { fontSize: 10 }]}>
                                {user && user.bio}COucoucoucoucoucoucou
                            </Text>
                        </View>
                        <View style={[globalStyles.fullScreen, styles.bubbleContainer]}>
                            <Text style={[globalStyles.hongkong, { fontSize: 10 }]}>Paris</Text>
                        </View>
                        <View style={[globalStyles.fullScreen, styles.buttonContainer]}>
                            <Pressable style={[globalStyles.center, styles.button]}>
                                <Text style={[globalStyles.hongkong, globalStyles.white, { fontSize: 10 }]}>Modifier le profil</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.badgesContainer}>
                        <View style={styles.badges}>
                            <Image source={require('../../assets/img/badges-partie-joue.png')} />
                            <Text style={[globalStyles.hongkong, { textAlign: 'center', fontSize: 10 }]}>23/50 Parties joués</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../assets/img/etoile.png')} />
                                <Image source={require('../../assets/img/etoile.png')} />
                            </View>
                        </View>
                        <View style={[styles.badges, { justifyContent: 'flex-end' }]}>
                            <Image source={require('../../assets/img/badges-partie-joue.png')} />
                            <Text style={[globalStyles.hongkong, { textAlign: 'center', fontSize: 10 }]}>23/50 Parties joués</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../assets/img/etoile.png')} />
                                <Image source={require('../../assets/img/etoile.png')} />
                            </View>
                        </View>
                        <View style={styles.badges}>
                            <Image source={require('../../assets/img/badges-partie-joue.png')} />
                            <Text style={[globalStyles.hongkong, { textAlign: 'center', fontSize: 10 }]}>23/50 Parties joués</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../assets/img/etoile.png')} />
                                <Image source={require('../../assets/img/etoile.png')} />
                                <Image source={require('../../assets/img/etoile.png')} />
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 20, backgroundColor: '#f7f7f7' }}>
                        <Calendar
                            style={{ borderWidth: 1 }}
                            onDayPress={day => {
                                setSelected(day.dateString);
                            }}
                            firstDay={1}
                        />
                    </View>
                    <View>
                        <Pressable
                            style={{ backgroundColor: '#a00404', padding: 10, borderRadius: 100, margin: 20 }}
                            onPress={handleSignUp}
                        >
                            <Text style={globalStyles.white}>Déconnexion</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            }
        </>
    )
}


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: '4%',
    },
    image: {
        width: 100,
        height: 100
    },
    bubbleContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    bubble: {
        margin: 10,
        width: 80,
        height: 80,
        backgroundColor: '#36A971',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 100,
    },
    detailsContainer: {
        paddingVertical: '3%',
        paddingHorizontal: '15%',
        width: '100%',
    },
    badgesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: '10%',
        padding: 25,
        width: '100%',
        height: 250,
        borderRadius: 500,
        borderColor: '#c9c9c9',
        borderBottomWidth: 3
    },
    badges: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: '#3E7B7A',
        padding: '3%',
        borderRadius: 100,
    }
})