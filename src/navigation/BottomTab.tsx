import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@screens/home/Home';
import { ScreenNames } from '@utility/screenNames';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Wishlist from '@screens/wishlist/Wishlist';
import Profile from '@screens/profile/Profile';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import { ThemeType } from '@redux/slice/themeSlice';
import Orders from '@screens/orders/orders/Orders';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const theme = useSelector((state: RootState) => state.theme) as ThemeType;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 75,
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
        name={ScreenNames.Orders}
        component={Orders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag-outline" size={size} color={color} />
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

export default BottomTab;
