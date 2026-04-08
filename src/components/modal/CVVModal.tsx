import IconButton from '@components/buttons/IconButton';
import { RootState } from '@redux/store/store';
import { commonColors } from '@utility/appColors';
import { showToast } from '@utility/helperMethod';
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useSelector } from 'react-redux';

type Props = {
  visible: boolean;
  amount: number;
  onClose: () => void;
  onConfirm: (cvv: string) => void;
  autoRunOnClose?: boolean;
};

const CVVModal: React.FC<Props> = ({
  autoRunOnClose = true,
  visible,
  amount,
  onClose,
  onConfirm,
}) => {
  const theme = useSelector((state: RootState) => state.theme);
  const [cvv, setCvv] = useState('');

  const validateCVV = (value: string) => {
    return /^[0-9]{3,4}$/.test(value);
  };

  const handleConfirm = async () => {
    if (!validateCVV(cvv)) {
      showToast('error', 'Enter valid CVV');
      return;
    }
    onConfirm(cvv);
    setCvv('');
    autoRunOnClose && onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View
            style={{
              ...styles.modalContainer,
              backgroundColor: theme.secondaryBgColor,
            }}
          >
            <Text style={{ ...styles.title, color: theme.mainTextColor }}>
              Enter CVV
            </Text>

            <Text style={styles.amount}>Pay ${amount}</Text>

            <TextInput
              value={cvv}
              onChangeText={setCvv}
              placeholder="CVV"
              keyboardType="numeric"
              secureTextEntry
              maxLength={4}
              style={{ ...styles.input, color: theme.mainTextColor }}
            />

            <View style={styles.buttonRow}>
              <IconButton
                text="Cancel"
                onPress={onClose}
                style={styles.cancelButton}
              />

              <IconButton
                text="Pay"
                onPress={handleConfirm}
                style={styles.payButton}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CVVModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: commonColors.lightBlack,
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    borderRadius: 15,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  amount: {
    fontSize: 16,
    marginBottom: 20,
    color: commonColors.lightGray,
  },
  input: {
    borderWidth: 1,
    borderColor: commonColors.lightGray,
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: commonColors.red,
  },
  cancelText: {
    color: commonColors.veryLightGray,
  },
  payButton: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: commonColors.primaryTextColor,
  },
  payText: {
    color: commonColors.white,
    fontWeight: '600',
  },
});
