// components/PaymentOption.tsx

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { commonColors } from '@utility/appColors';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';

type Props = {
  label1: string;
  label2?: string;
  selected: boolean;
  onPress: () => void;
};

const PaymentOption = ({ label1, label2 = '', selected, onPress }: Props) => {
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
      {
        <View style={styles.textContainer}>
          <Text style={{ ...styles.label, color: theme.mainTextColor }}>
            {label1}
          </Text>
          <Text style={{ ...styles.label2, color: theme.mainTextColor }}>
            {label2}
          </Text>
        </View>
      }

      <View style={[styles.radio, selected && styles.radioSelected]} />
    </TouchableOpacity>
  );
};

export default PaymentOption;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: commonColors.veryLightGray,
    borderRadius: 12,
    marginTop: 12,
  },
  selected: {
    borderColor: commonColors.primaryTextColor,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  label2: {
    marginRight: 10,
    fontSize: 22,
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
