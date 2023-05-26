import React, { createContext, useState, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth, db } from '../../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, collection, query, where, getDocs, getDoc } from "firebase/firestore"
import { strRandom } from '../../assets/func/random'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userData, setUserData] = useState(null)

    const login = (email, password) => {
        setIsLoading(true)
        console.log('login')
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredentials) => {
                console.log('sign In')
                const user = userCredentials.user
                const q = query(collection(db, "users"), where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    let userData = doc.data()
                    console.log(userData.uid)
                    AsyncStorage.setItem('userToken', userData.uid)
                    setUserToken(userData.uid)
                });
                getUser()

                setIsLoading(false)
            })
            .catch(error => alert(error.message))
    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userToken')
        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            setUserToken(userToken)
            setIsLoading(false)
        } catch (error) {
            alert(error.message)
        }
    }

    const register = (pseudo, email, password) => {
        setIsLoading(true)
        const docRef = strRandom({
            includeUpperCase: true,
            includeNumber: true,
            length: 20,
        })

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredentials) => {
                const user = userCredentials.user
                await setDoc(doc(db, "users", docRef), {
                    uid: docRef,
                    email: email,
                    pseudo: pseudo,
                });
                setUserToken(docRef)
                AsyncStorage.setItem('userToken', docRef)
                getUser()
                setIsLoading(false)
            })
            .catch(error => alert(error.message))
    }

    const getUser = async () => {
        setIsLoading(true)
        console.log('getUser')
        let userToken = await AsyncStorage.getItem('userToken')
        console.log('userToken ' + userToken)
        if (userToken) {
            const ref = doc(db, "users", userToken);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                // Convert to City object
                const user = docSnap.data();
                // Use a City instance method
                console.log(user);
                setUserData(user)
            } else {
                console.log("No such document!");
            }
        }
        setIsLoading(false)
    }

    useEffect(() => {
        isLoggedIn()
    }, [])
    useEffect(() => {
        getUser()
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, register, getUser, isLoading, isRegister, userToken, userData }}>
            {children}
        </AuthContext.Provider>
    )
}