import { StyleSheet, Button } from 'react-native';
import { HomeScreen } from './src/views/HomeScreen'
import { LoginScreen } from './src/views/LoginScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { RegisterScreen } from './src/views/RegisterScreen';
import { ProfileScreen } from './src/views/ProfileScreen';

export default function App() {

  const Stack = createNativeStackNavigator();

  const [loaded] = useFonts({
    Broadway: require('./assets/fonts/broadway-normal.ttf'),
    HongKong: require('./assets/fonts/hongkong.otf')
  })

  if (!loaded) {
    return null
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
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