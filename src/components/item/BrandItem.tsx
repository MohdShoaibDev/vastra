import { RootState } from '@redux/store/store';
import { commonColors } from '@utility/appColors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

interface BrandItemProps {
  name: string;
}

const BrandItem: React.FC<BrandItemProps> = ({ name = '' }) => {
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.secondaryBgColor }}
    >
      <Text style={{ color: theme.mainTextColor }}>{name}</Text>
    </View>
  );
};

export default BrandItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
  },
});
