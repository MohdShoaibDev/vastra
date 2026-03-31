import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@screens/home/Home';
import { ScreenNames } from '@utility/screenNames';
import Icon from 'react-native-vector-icons/Feather';
import Wishlist from '@screens/wishlist/Wishlist';
import Cart from '@screens/cart/Cart';
import Profile from '@screens/profile/Profile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { ThemeType } from '@redux/slice';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const insets = useSafeAreaInsets();
  const theme = useSelector((state: RootState) => state.theme) as ThemeType;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'android' ? insets.bottom + 60 : 75,
          paddingTop: 7,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: theme.secondaryBgColor,
        },
      }}
    >
      <Tab.Screen
        name={ScreenNames.Home}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.Wishlist}
        component={Wishlist}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.Cart}
        component={Cart}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-bag" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.Profile}
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default BottomTab;
