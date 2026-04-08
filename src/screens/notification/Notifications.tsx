import Header from '@components/header/Header';
import React from 'react';
import { View, Text } from 'react-native';
import styles from '@screens/notification/style';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';

const Notifications = () => {
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <View style={styles.container}>
      <Header title="Notifications" showCart={false} style={styles.header} />
      <Text
        style={{ ...styles.noNotificationText, color: theme.mainTextColor }}
      >
        No notifications
      </Text>
    </View>
  );
};

export default Notifications;
