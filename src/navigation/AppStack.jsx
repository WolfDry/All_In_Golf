import React from 'react'
import { HomeScreen } from '../views/HomeScreen'
import { StatScreen } from '../views/StatScreen'
import { GameScreen } from '../views/GameScreen'
import { ChatScreen } from '../views/ChatScreen'
import { ProfileScreen } from '../views/ProfileScreen'
import { CustomTabBarButton } from '../components/CustomTabBarButton'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import COLORS from '../const/colors'
import { StyleSheet } from 'react-native'

export function AppStack() {

    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator screenOptions={({ route }) => (
            {
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarInactiveTintColor: COLORS.black,
                tabBarActiveTintColor: COLORS.white,
                tabBarIcon: ({ color }) => {

                    let iconName

                    if (route.name == "Home") {
                        iconName = "home"
                    }
                    if (route.name == "Stat") {
                        iconName = "stats-chart"
                    }
                    if (route.name == "Game") {
                        iconName = "golf"
                    }
                    if (route.name == "Chat") {
                        iconName = "md-chatbubbles"
                    }
                    if (route.name == "Profile") {
                        iconName = "person"
                    }

                    return <Icon name={iconName} size={27} color={color} />
                }
            }
        )} >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarButton: props => <CustomTabBarButton {...props} />
            }} />
            <Tab.Screen name="Stat" component={StatScreen} options={{
                tabBarButton: props => <CustomTabBarButton {...props} />
            }} />
            <Tab.Screen name="Game" component={GameScreen} options={{
                tabBarButton: props => <CustomTabBarButton {...props} />
            }} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{
                tabBarButton: props => <CustomTabBarButton {...props} />
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarButton: props => <CustomTabBarButton {...props} />
            }} />
        </Tab.Navigator >
    )
}

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        backgroundColor: COLORS.white,
        borderWidth: 0,
    },
});