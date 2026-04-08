import Header from '@components/header/Header';
import React from 'react';
import { View, Text } from 'react-native';
import styles from '@screens/termsAndConditions/style';

const TermsAndCondition = () => {
  return (
    <View style={styles.container}>
      <Header title="Terms & Conditions" style={styles.header} />
      <Text>TermsAndCondition</Text>
    </View>
  );
};

export default TermsAndCondition;
