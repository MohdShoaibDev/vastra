import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';

interface LoaderProps {
  visible: boolean;
}

const Loader = ({ visible }: LoaderProps) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
