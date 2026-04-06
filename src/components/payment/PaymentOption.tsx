// components/PaymentOption.tsx

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { commonColors } from '@utility/appColors';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const PaymentOption = ({ label, selected, onPress }: Props) => {
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: theme.card },
        selected && styles.selected,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={{ ...styles.label, color: theme.mainTextColor }}>
        {label}
      </Text>

      <View style={[styles.radio, selected && styles.radioSelected]} />
    </TouchableOpacity>
  );
};

export default PaymentOption;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: commonColors.veryLightGray,
    borderRadius: 12,
    marginTop: 12,
  },
  selected: {
    borderColor: commonColors.primaryTextColor,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: commonColors.veryLightGray,
  },
  radioSelected: {
    borderColor: commonColors.primaryTextColor,
    backgroundColor: commonColors.primaryTextColor,
  },
});
