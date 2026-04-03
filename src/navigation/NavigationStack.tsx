import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '@screens/auth/splash/Splash';
import Signup from '@screens/auth/signup/Signup';
import Login from '@screens/auth/login/Login';
import { ScreenNames } from '@utility/screenNames';
import { RootStackParamList } from 'src/types/navigation';
import ProductDetails from '@screens/productDetails/ProductDetails';
import { onAuthStateChanged } from '@react-native-firebase/auth';
import BottomTab from './BottomTab';
import auth from 'src/firebase/auth';
import Wishlist from '@screens/wishlist/Wishlist';
import Cart from '@screens/cart/Cart';
import Profile from '@screens/profile/Profile';
import Orders from '@screens/orders/Orders';
import TermsAndCondition from '@screens/termsAndConditions/TermsAndCondition';
import Notifications from '@screens/notification/Notifications';
import { useDispatch } from 'react-redux';
import { storage } from '@utility/helperMethod';
import { Appearance } from 'react-native';
import { appThemeHandler } from '@redux/slice/themeSlice';
import { darkColors, lightColors } from '@utility/appColors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationStack = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const storedTheme = storage.getString('theme');
    const systemTheme = Appearance.getColorScheme();

    if (storedTheme === 'system') {
      dispatch(
        appThemeHandler(systemTheme === 'dark' ? darkColors : lightColors),
      );
    } else {
      dispatch(
        appThemeHandler(storedTheme === 'dark' ? darkColors : lightColors),
      );
    }

    const themeSubscription = Appearance.addChangeListener(
      ({ colorScheme }) => {
        const theme = storage.getString('theme');

        if (theme === 'system') {
          dispatch(
            appThemeHandler(colorScheme === 'dark' ? darkColors : lightColors),
          );
        }
      },
    );

    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsAuth(!!user);
      setTimeout(() => setLoading(false), 2500);
    });

    return () => {
      unsubscribe();
      themeSubscription.remove();
    };
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      {loading && <Stack.Screen name={ScreenNames.Splash} component={Splash} />}
      {!loading && (
        <>
          {!isAuth ? (
            <>
              <Stack.Screen name={ScreenNames.Login} component={Login} />
              <Stack.Screen name={ScreenNames.Register} component={Signup} />
            </>
          ) : (
            <>
              <Stack.Screen
                name={ScreenNames.BottomTab}
                component={BottomTab}
              />
              <Stack.Screen
                name={ScreenNames.ProductDetails}
                component={ProductDetails}
              />
              <Stack.Screen name={ScreenNames.Wishlist} component={Wishlist} />
              <Stack.Screen name={ScreenNames.Cart} component={Cart} />
              <Stack.Screen name={ScreenNames.Profile} component={Profile} />
              <Stack.Screen name={ScreenNames.Orders} component={Orders} />
              <Stack.Screen
                name={ScreenNames.TermsAndCondition}
                component={TermsAndCondition}
              />
              <Stack.Screen
                name={ScreenNames.Notifications}
                component={Notifications}
              />
            </>
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

export default NavigationStack;
