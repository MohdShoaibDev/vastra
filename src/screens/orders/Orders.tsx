import React from 'react';
import { View, Text } from 'react-native';
import styles from '@screens/orders/style';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import Header from '@components/header/Header';

const Orders = () => {
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <View style={styles.container}>
      <Header title="Orders" showBack={false} style={styles.header} />
      <Text>Order</Text>
    </View>
  );
};

export default Orders;
