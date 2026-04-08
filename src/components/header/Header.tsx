import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { commonColors } from '@utility/appColors';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import { useStatusBarHeight } from '@hooks/useStatusBarHeight';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';

interface Props {
  title: string;
  showBack?: boolean;
  showCart?: boolean;
  style?: ViewStyle;
}

const Header = ({
  title,
  showBack = true,
  showCart = true,
  style = {},
}: Props) => {
  const navigation = useAppNavigation();
  const theme = useSelector((state: RootState) => state.theme);
  const { statusBarHeight } = useStatusBarHeight();

  const navigateToCartScreen = () => {
    navigation.navigate(ScreenNames.Cart);
  };

  return (
    <View style={{ ...styles.container, ...style, marginTop: statusBarHeight }}>
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color={theme.mainTextColor} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.center}>
        <Text style={{ ...styles.title, color: theme.mainTextColor }}>
          {title}
        </Text>
      </View>

      <View style={styles.right}>
        {showCart && (
          <TouchableOpacity onPress={navigateToCartScreen}>
            <Ionicons
              name="cart-outline"
              size={20}
              color={theme.primaryIconColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: commonColors.transparent,
  },

  left: {
    width: '20%',
  },

  center: {
    width: '60%',
    alignItems: 'center',
  },

  right: {
    width: '20%',
    alignItems: 'flex-end',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
