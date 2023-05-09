import React, { createContext, useState, useEffect, useContext } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth, db } from '../../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore"
import { strRandom } from '../../assets/func/random'
import { AuthContext } from "./AuthContext"

export const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [userToken] = useState(null)

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

    return (
        <ProfileContext.Provider value={{ isLoggedIn, getUser, isLoading, userToken }}>
            {children}
        </ProfileContext.Provider>
    )
}