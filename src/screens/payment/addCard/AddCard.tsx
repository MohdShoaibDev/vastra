import React, { useState } from 'react';
import { View } from 'react-native';
import styles from '@screens/payment/addCard/style';
import InputField from '@components/textfield/InputField';
import Header from '@components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import DebitCard from '@components/payment/DebitCard';
import IconButton from '@components/buttons/IconButton';
import { showToast } from '@utility/helperMethod';
import {
  addDoc,
  collection,
  getFirestore,
} from '@react-native-firebase/firestore';
import auth from 'src/firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '@components/loader/Loader';
import { appcardsHandler } from '@redux/slice/cardsSlice';

const AddCard = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddCard = async () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const expMonth = Number(expiry.slice(0, 2));
    const expYear = 2000 + Number(expiry.slice(3));

    const isValid =
      name.length >= 3 &&
      number.length === 19 &&
      expiry.length === 5 &&
      Number(expiry.split('/')[0]) <= 12;

    if (!isValid) {
      showToast('error', 'Invalid input format');
      return;
    }

    const isExpired =
      expYear < currentYear ||
      (expYear === currentYear && expMonth < currentMonth);

    if (isExpired) {
      showToast('error', 'Card is expired');
      return;
    }
    try {
      setLoading(true);
      if (!auth.currentUser?.uid) return;
      const cardRef = collection(
        getFirestore(),
        'users',
        auth.currentUser.uid,
        'cards',
      );
      const card = await addDoc(cardRef, {
        number: `**** **** **** ${number.slice(15)}`,
        name,
        expiry,
      });
      dispatch(
        appcardsHandler({
          id: card.id,
          number,
          name,
          expiry,
        }),
      );
      showToast('success', 'Card added successfully');
      setName('');
      setNumber('');
      setExpiry('');
    } catch (err: any) {
      showToast('error', 'Something went wrong');
      console.log('getting error in adding card', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCardNumber = (text: string) => {
    const cardNumber = text
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1-')
      .replace(/-$/, '');
    setNumber(cardNumber);
  };

  const handleCardExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 4);
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    setExpiry(formatted);
  };

  return (
    <>
      <View style={{ ...styles.container, backgroundColor: theme.bgColor }}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={50}
          enableAutomaticScroll={true}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <Header title="Add Card" showCart={false} />

          <View style={styles.cardView}>
            <DebitCard name={name} number={number} expiry={expiry} />
          </View>

          <View style={styles.inputsContainer}>
            <InputField
              placeholder="Card Holder Name"
              value={name}
              onChangeText={setName}
              maxLength={20}
            />
            <InputField
              placeholder="Card Number"
              value={number}
              onChangeText={handleCardNumber}
              keyboardType="numeric"
              maxLength={19}
            />

            <View style={styles.row}>
              <View style={[styles.inputHalf, styles.leftGap]}>
                <InputField
                  placeholder="Expiry (MM/YY)"
                  value={expiry}
                  onChangeText={handleCardExpiry}
                  maxLength={5}
                />
              </View>
            </View>
          </View>

          <IconButton
            text="Add Card"
            style={styles.button}
            onPress={handleAddCard}
          />
        </KeyboardAwareScrollView>
      </View>
      <Loader visible={loading} />
    </>
  );
};

export default AddCard;
