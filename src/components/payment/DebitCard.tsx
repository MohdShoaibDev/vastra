// components/DebitCard.tsx

import { RootState } from '@redux/store/store';
import { commonColors } from '@utility/appColors';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ViewStyle } from 'react-native/types_generated/index';
import { useSelector } from 'react-redux';

type Props = {
  id?: string;
  name: string;
  number: string;
  expiry: string;
  bank?: string;
  list?: boolean;
  style?: ViewStyle;
  onPress?: (id: string) => void;
};

const formatCardNumber = (num: string) => {
  return num
    .replace(/\s+/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim();
};

const maskCardNumber = (num: string) => {
  const clean = num.replace(/\s+/g, '');
  return `**** **** **** ${clean.slice(-4)}`;
};

const DebitCard = ({
  id = '',
  name,
  number = '',
  expiry,
  bank,
  list = false,
  onPress,
  style = {},
}: Props) => {
  const theme = useSelector((state: RootState) => state.theme);
  const handleCardSelection = () => {
    if (onPress) {
      onPress(id);
    }
  };
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.card, ...style }}
    >
      <TouchableOpacity
        onPress={handleCardSelection}
        style={styles.touch}
        activeOpacity={list ? 0.5 : 1}
      >
        {!list && (
          <View style={styles.topRow}>
            <Text style={{ ...styles.bank, color: theme.mainTextColor }}>
              {bank || 'BANK'}
            </Text>
            <Text style={{ ...styles.type, color: theme.mainTextColor }}>
              Card
            </Text>
          </View>
        )}

        {!list && <View style={styles.chip} />}

        <Text style={{ ...styles.number, color: theme.mainTextColor }}>
          {maskCardNumber(formatCardNumber(number))}
        </Text>

        <View style={styles.bottomRow}>
          <View>
            <Text style={{ ...styles.label, color: theme.secondaryTextColor }}>
              CARD HOLDER
            </Text>
            <Text style={{ ...styles.value, color: theme.mainTextColor }}>
              {name}
            </Text>
          </View>

          <View>
            <Text style={{ ...styles.label, color: theme.secondaryTextColor }}>
              EXPIRES
            </Text>
            <Text style={{ ...styles.value, color: theme.mainTextColor }}>
              {expiry}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DebitCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: commonColors.veryLightGray,
    marginTop: 30,
  },

  touch: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  bank: {
    fontSize: 16,
    fontWeight: '600',
  },

  type: {
    fontSize: 14,
    opacity: 0.8,
  },

  chip: {
    width: 45,
    height: 30,
    backgroundColor: '#D4AF37',
    borderRadius: 6,
  },

  number: {
    fontSize: 20,
    letterSpacing: 2,
    marginVertical: 10,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 10,
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
});
