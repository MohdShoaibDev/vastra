import { RootState } from '@redux/store/store';
import { commonColors } from '@utility/appColors';
import { showToast } from '@utility/helperMethod';
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { rating: number; review: string }) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const theme = useSelector((state: RootState) => state.theme);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      showToast('info', 'Please select a rating');
      return;
    }
    onSubmit({ rating, review });
    setRating(0);
    setReview('');
    onClose();
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map(item => (
      <TouchableOpacity key={item} onPress={() => setRating(item)}>
        <Text style={item <= rating ? styles.filledStar : styles.emptyStar}>
          ★
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={{ ...styles.modalContainer, backgroundColor: theme.secondaryBgColor }}>
          <Text style={{...styles.title, color: theme.mainTextColor}}>Rate Product</Text>

          <View style={styles.starContainer}>{renderStars()}</View>

          <TextInput
            placeholder="Write a review (optional)"
            value={review}
            onChangeText={setReview}
            multiline
            style={{...styles.input, color: theme.mainTextColor}}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RatingModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: commonColors.lightBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  filledStar: {
    fontSize: 30,
    color: commonColors.yellow,
    marginHorizontal: 5,
  },
  emptyStar: {
    fontSize: 30,
    color: commonColors.lightGray,
    marginHorizontal: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: commonColors.lightGray,
    borderRadius: 8,
    padding: 10,
    height: 80,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: commonColors.red,
    padding: 12,
    borderRadius: 8,
    marginRight: 5,
    alignItems: 'center',
  },
  submitBtn: {
    flex: 1,
    backgroundColor: commonColors.primaryTextColor,
    padding: 12,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: 'center',
  },
  btnText: {
    color: commonColors.white,
    fontWeight: 'bold',
  },
});
