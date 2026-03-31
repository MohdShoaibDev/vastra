
import { RootState } from '@redux/store';
import { commonColors } from '@utility/appColors';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.title, color: theme.secondaryTextColor }}>
        {title}
      </Text>
      <TouchableOpacity>
        <Text style={{ ...styles.view, color: theme.secondaryTextColor }}>
          View All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
  },

  view: {
    color: commonColors.gray,
  },
});
