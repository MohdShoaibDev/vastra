import { RootState } from '@redux/store/store';
import { commonColors } from '@utility/appColors';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';

interface AddressCard {
  id: number;
  type: string;
  name: string;
  number: string;
  address: string;
  isSelected?: boolean;
  onPress?: (id: number) => void;
  showIcon?: boolean;
  showMenu?: boolean;
  style?: ViewStyle;
  onPressMenu?: (id: number) => void;
  markAsDefault?: boolean;
}

const AddressCard: React.FC<AddressCard> = ({
  id,
  type,
  name,
  number,
  address,
  isSelected,
  showIcon = true,
  showMenu = true,
  onPress,
  onPressMenu,
  style = {},
  markAsDefault = false,
}) => {
  const theme = useSelector((state: RootState) => state.theme);
  const iconNameHandler = () => {
    if (type?.toLocaleLowerCase() === 'home') {
      return 'home';
    } else if (type?.toLocaleLowerCase() === 'work') {
      return 'briefcase';
    } else {
      return 'map-pin';
    }
  };

  const cardPressHandler = () => {
    if (onPress) {
      onPress(id);
    }
  };

  const cardPressMenuHandler = () => {
    if (onPressMenu) {
      onPressMenu(id);
    }
  };

  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: theme.card,
        borderColor: isSelected
          ? commonColors.primaryTextColor
          : commonColors.lightGray,
        ...style,
      }}
    >
      <TouchableOpacity
        style={styles.touch}
        activeOpacity={0.6}
        onPress={cardPressHandler}
      >
        <View style={styles.row}>
          {showIcon && (
            <View style={styles.left}>
              <View style={styles.iconBox}>
                <Feather
                  name={iconNameHandler()}
                  size={18}
                  color={commonColors.primaryTextColor}
                />
              </View>
              <Text style={{ ...styles.title, color: theme.mainTextColor }}>
                {name}
              </Text>
              {markAsDefault && <Text style={styles.default}>Default</Text>}
            </View>
          )}

          {showMenu && (
            <TouchableOpacity
              style={styles.checkBox}
              onPress={cardPressMenuHandler}
              activeOpacity={0.6}
            >
              <Text style={styles.menu}>⋯</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={{ ...styles.address, color: theme.secondaryTextColor }}>
          {address}
        </Text>

        <Text style={{ ...styles.phone, color: theme.mainTextColor }}>
          {number}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 14,
  },

  touch: {
    padding: 14,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  icon: {
    fontSize: 18,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  default: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: commonColors.primaryTextColor,
    color: commonColors.white,
    borderRadius: 20,
    fontWeight: '500',
  },
  checkBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  address: {
    marginTop: 10,
    fontSize: 14,
  },

  phone: {
    marginTop: 6,
    fontSize: 14,
  },

  menu: {
    fontSize: 18,
    color: commonColors.gray,
  },
});

export default AddressCard;
