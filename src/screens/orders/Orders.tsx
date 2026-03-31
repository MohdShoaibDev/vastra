import Header from '@components/header/Header';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Orders = () => {
  return (
    <View style={styles.container}>
      <Header title="Orders" />
      <Text>Order</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Orders;
