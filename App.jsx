import { StyleSheet, Button, Text } from 'react-native';
import { HomeScreen } from './src/views/HomeScreen'
import { LoginScreen } from './src/views/LoginScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { RegisterScreen } from './src/views/RegisterScreen';
import { ProfileScreen } from './src/views/ProfileScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingProvider from './src/context/LoadingProvider';

export default function App() {

  const Stack = createNativeStackNavigator();

  const [loaded] = useFonts({
    Broadway: require('./assets/fonts/broadway-normal.ttf'),
    HongKong: require('./assets/fonts/hongkong.otf')
  })

  const [initialRouteName, setInitialRouteName] = useState('Home')

  useEffect(() => {
    async function getIsLogin() {
      try {
        const isLogin = await AsyncStorage.getItem('@isLogin')

        if (isLogin === 'true')
          // console.log(isLogin)
          return 'Profile'
      } catch (e) {
        alert(e.message)
      }
    }
    getIsLogin().then(setInitialRouteName)
  }, [])

  if (!loaded) {
    return null
  }

  return (
    <LoadingProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'My home',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerRight: () => (
                <Button
                  onPress={() => alert('This is a button!')}
                  title="Info"
                  color="black"
                />
              ),
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
          />
        </Stack.Navigator>
      </NavigationContainer >
    </LoadingProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});