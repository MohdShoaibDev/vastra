import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { appThemeHandler } from '@redux/slice';
import { RootState } from '@redux/store';
import { commonColors, darkColors, lightColors } from '@utility/appColors';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '@utility/helperMethod';

interface ThemeModalProps {
  visible: boolean;
  onClose: () => void;
}

const ThemeModal: React.FC<ThemeModalProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);
  const systemTheme = useColorScheme();
  const [themeState, setThemeState] = useState('light');
  const options: string[] = ['light', 'dark', 'system'];

  useEffect(() => {
    if (storage.getString('theme') === 'light') {
      setThemeState('light');
    } else if (storage.getString('theme') === 'dark') {
      setThemeState('dark');
    } else {
      setThemeState('system');
    }
  }, []);

  const themeHandler = (theme: string) => {
    storage.set('theme', theme);
    if (theme === 'system') {
      dispatch(
        appThemeHandler(systemTheme === 'light' ? lightColors : darkColors),
      );
      return;
    }
    dispatch(appThemeHandler(theme === 'light' ? lightColors : darkColors));
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={{ ...styles.modalContainer, backgroundColor: theme.bgColor }}
        >
          <Text style={{ ...styles.title, color: theme.mainTextColor }}>
            Choose Theme
          </Text>

          {options.map(itemTheme => (
            <TouchableOpacity
              key={itemTheme}
              style={[
                styles.option,
                themeState === itemTheme && styles.selected,
              ]}
              onPress={() => {
                themeHandler(itemTheme);
                onClose();
              }}
            >
              <Text
                style={{
                  ...styles.optionText,
                  color:
                    itemTheme === themeState
                      ? commonColors.primaryTextColor
                      : theme.mainTextColor,
                }}
              >
                {itemTheme.charAt(0).toUpperCase() + itemTheme.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ThemeModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: commonColors.lightBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    borderRadius: 12,
    borderColor: commonColors.veryLightGray,
    borderWidth: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  option: {
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: commonColors.veryLightGray,
  },
  selected: {
    borderColor: commonColors.primaryTextColor,
  },
  optionText: {
    fontSize: 16,
  },
  cancel: {
    marginTop: 15,
    textAlign: 'center',
    color: 'red',
  },
});
