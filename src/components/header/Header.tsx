import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { commonColors } from '@utility/appColors';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import { useStatusBarHeight } from '@hooks/useStatusBarHeight';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';

interface Props {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
  style?: ViewStyle;
}

const Header = ({
  title,
  showBack = true,
  showNotification = true,
  style = {},
}: Props) => {
  const navigation = useAppNavigation();
  const theme = useSelector((state: RootState) => state.theme);
  const { statusBarHeight } = useStatusBarHeight();

  const navigateToNotificationScreen = () => {
    navigation.navigate(ScreenNames.Notifications);
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
        {showNotification && (
          <TouchableOpacity onPress={navigateToNotificationScreen}>
            <Feather name="bell" size={22} color={theme.mainTextColor} />
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
