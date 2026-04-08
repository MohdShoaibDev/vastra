import Header from '@components/header/Header';
import React from 'react';
import { View, Text } from 'react-native';
import styles from '@screens/notification/style';

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Header title="Notifications" showCart={false} style={styles.header} />
      <Text>Notifications</Text>
    </View>
  );
};

export default Notifications;
