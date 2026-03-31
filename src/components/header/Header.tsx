import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useStatusBarHeight } from '@hooks/useStatusBarHeight';
import { commonColors } from '@utility/appColors';

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
  const navigation = useNavigation();
  const { statusBarHeight } = useStatusBarHeight();

  return (
    <View style={{ ...styles.container, marginTop: statusBarHeight, ...style }}>
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.right}>
        {showNotification && (
          <TouchableOpacity>
            <Feather name="bell" size={22} color="#000" />
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
    paddingHorizontal: 10,
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
    color: commonColors.black,
  },
});
