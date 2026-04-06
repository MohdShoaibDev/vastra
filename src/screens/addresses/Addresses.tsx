import Header from '@components/header/Header';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Addresses = () => {
  return (
    <View style={styles.container}>
      <Header title="Terms & Conditions" />
      <Text>Addresses</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Addresses;
