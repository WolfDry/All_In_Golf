import React, { createContext, useState, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth, db } from '../../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore"
import { strRandom } from '../../assets/func/random'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [userToken, setUserToken] = useState(null)

    const login = (email, password) => {
        if (isRegister)
            setIsLoading(true)
        setIsRegister(false)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user
                setUserToken(user.uid)
                AsyncStorage.setItem('userToken', user.uid)
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
                    uid: user.uid,
                    email: email,
                    pseudo: pseudo,
                });
                setIsRegister(true)
                setIsLoading(false)
            })
            .catch(error => alert(error.message))
    }

    const getUser = async () => {
        setIsLoading(true)
        isLoggedIn()
        console.log(userToken)
        const q = query(collection(db, "users"), where("uid", "==", userToken));

        const querySnapshot = await getDocs(q);
        let userData
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            userData = doc.data()
        });

        setIsLoading(false)
        return userData
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, register, getUser, isLoading, isRegister, userToken }}>
            {children}
        </AuthContext.Provider>
    )
}