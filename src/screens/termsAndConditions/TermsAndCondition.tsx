import Header from '@components/header/Header';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TermsAndCondition = () => {
  return (
    <View style={styles.container}>
      <Header title="Terms & Conditions"/>
      <Text>TermsAndCondition</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default TermsAndCondition;
