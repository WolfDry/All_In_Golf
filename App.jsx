import { useFonts } from 'expo-font';
import { AppNav } from './src/navigation/AppNav'
import { AuthProvider } from './src/context/AuthContext';

export default function App() {

  const [loaded] = useFonts({
    Broadway: require('./assets/fonts/broadway-normal.ttf'),
    HongKong: require('./assets/fonts/hongkong.otf')
  })

  if (!loaded) {
    return null
  }

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}