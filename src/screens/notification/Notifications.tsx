import Header from '@components/header/Header';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Header title="Notifications" showNotification={false} />
      <Text>Notifications</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Notifications;
