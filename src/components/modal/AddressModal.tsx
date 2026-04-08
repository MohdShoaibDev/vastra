import { RootState } from '@redux/store/store';
import { commonColors } from '@utility/appColors';
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useSelector } from 'react-redux';

type Props = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onDefault: () => void;
};

const AddressModal = ({
  visible,
  onClose,
  onDelete,
  onEdit,
  onDefault,
}: Props) => {
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose} />

      <View style={{ ...styles.container, backgroundColor: theme.card }}>
        <TouchableOpacity style={styles.option} onPress={onEdit}>
          <Text style={{ ...styles.text, color: theme.mainTextColor }}>
            Edit Address
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={onDefault}>
          <Text style={{ ...styles.text, color: theme.mainTextColor }}>
            Mark as Default
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={onDelete}>
          <Text style={[styles.text, styles.delete]}>Delete Address</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddressModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  container: {
    gap: 20,
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  option: {
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: commonColors.lightGray,
    borderRadius: 10,
  },

  text: {
    fontSize: 16,
  },

  delete: {
    color: 'red',
    fontWeight: '500',
  },
});
