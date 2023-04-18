import { useEffect, useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import globalStyles from "../../assets/globalStyle";
import { Calendar, CalendarList, LocaleConfig } from 'react-native-calendars';
import { db, auth } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

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
    today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';

export function ProfileScreen({ navigation, route }) {

    const [selected, setSelected] = useState('');
    const [user, setUser] = useState()

    useEffect(() => {
        async function getCurrentUser() {
            const usersCollection = collection(db, 'users')
            const usersSnapshot = await getDocs(usersCollection)
            const usersList = usersSnapshot.docs.map(doc => doc.data())
            const currentUser = usersList.filter(user => user.email === auth.currentUser.email)

            return currentUser[0]

        }
        getCurrentUser().then(setUser)
    }, [])

    return (
        <View style={[globalStyles.fullScreen, globalStyles.center, { backgroundColor: 'white' }]}>
            <View style={[styles.header, globalStyles.center]}>
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
            </View>
            <View style={styles.detailsContainer}>
                <View style={[globalStyles.fullScreen, styles.bubbleContainer]}>
                    <Text style={[globalStyles.hongkong, { fontSize: 18 }]}>{user && user.pseudo}</Text>
                </View>
                <View style={[globalStyles.fullScreen, styles.bubbleContainer]}>
                    <Text style={[globalStyles.hongkong, { fontSize: 10 }]}>
                        {user && user.bio}
                    </Text>
                </View>
                <View style={[globalStyles.fullScreen, styles.bubbleContainer]}>
                    <Text style={[globalStyles.hongkong, { fontSize: 10 }]}>Paris</Text>
                </View>
                <View style={[globalStyles.fullScreen, styles.buttonContainer]}>
                    <Pressable style={[globalStyles.center, styles.button]}>
                        <Text style={[globalStyles.hongkong, globalStyles.white, { fontSize: 10 }]}>Modifier le profile</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{ flex: 0.7, flexDirection: "row", padding: 20 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Image source={require('../../assets/img/badges-partie-joue.png')} />
                    <Text style={[globalStyles.hongkong, { textAlign: "center", fontSize: 10 }]}>23/50 Parties joués</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../assets/img/etoile.png')} />
                        <Image source={require('../../assets/img/etoile.png')} />
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Image source={require('../../assets/img/badges-partie-joue.png')} />
                    <Text style={[globalStyles.hongkong, { textAlign: "center", fontSize: 10 }]}>23/50 Parties joués</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../assets/img/etoile.png')} />
                        <Image source={require('../../assets/img/etoile.png')} />
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Image source={require('../../assets/img/badges-partie-joue.png')} />
                    <Text style={[globalStyles.hongkong, { textAlign: "center", fontSize: 10 }]}>23/50 Parties joués</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../assets/img/etoile.png')} />
                        <Image source={require('../../assets/img/etoile.png')} />
                        <Image source={require('../../assets/img/etoile.png')} />
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, padding: 20, backgroundColor: '#f7f7f7' }}>
                <CalendarList
                    style={{ width: '100%', borderWidth: 1 }}
                    onDayPress={day => {
                        setSelected(day.dateString);
                    }}
                    firstDay={1}
                    enableSwipeMonths={true}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        flex: 0.7,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#3E7B7A',
    },
    image: {
        width: 100,
        height: 100
    },
    detailsContainer: {
        flex: 0.5,
        width: '100%',
        paddingHorizontal: 50
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
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 100,
    },
    bubbleContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start'
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