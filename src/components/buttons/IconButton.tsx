import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  GestureResponderEvent,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {commonColors} from '../../utility/appColors';

interface IconButtonProps {
  size?: number;
  color?: string;
  iconName?: string;
  text?: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  iconName = '',
  size,
  color = '',
  text = '',
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {iconName && (
        <Icon
          name={iconName}
          size={size || 25}
          color={color || commonColors.primaryTextColor}
          style={{marginRight: 10}}
        />
      )}

      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    height: 48,
    paddingHorizontal: 20,
  },

  logo: {
    width: 18,
    height: 18,
    marginRight: 10,
    resizeMode: 'contain',
  },

  text: {
    fontSize: 18,
    color: '#3C4043',
    fontWeight: '500',
  },
});
