import Header from '@components/header/Header';
import React from 'react';
import { View, Text } from 'react-native';
import styles from '@screens/addresses/style';

const Addresses = () => {
  return (
    <View style={styles.container}>
      <Header title="Addresses" style={styles.header} />
      <Text>Addresses</Text>
    </View>
  );
};

export default Addresses;
