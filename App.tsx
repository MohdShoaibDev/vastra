/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import NavigationStack from './src/navigation/NavigationStack';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from './src/redux/store/store';
import { ThemeType } from './src/redux/slice/themeSlice';
import { StatusBar } from 'react-native';

function App() {
  const theme = useSelector((state: RootState) => state.theme) as ThemeType;

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={theme.bgColor === 'black' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer
        theme={{
          ...DarkTheme,
          dark: true,
          colors: {
            background: theme.bgColor,
            card: '#000000',
            text: '#FFFFFF',
            border: 'transparent',
            primary: '#3B82F6',
            notification: 'red',
          },
        }}
      >
        <NavigationStack />
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
}

export default App;
