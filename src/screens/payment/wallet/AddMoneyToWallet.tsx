import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '@screens/payment/wallet/styles';
import { showToast } from '@utility/helperMethod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '@components/header/Header';
import IconButton from '@components/buttons/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import CVVModal from '@components/modal/CVVModal';
import Loader from '@components/loader/Loader';
import DebitCard from '@components/payment/DebitCard';
import { commonColors } from '@utility/appColors';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';
import { useRoute } from '@react-navigation/native';
import auth from 'src/firebase/auth';
import { doc, getFirestore, updateDoc } from '@react-native-firebase/firestore';
import { appUserDetailsHandler } from '@redux/slice/userSlice';
import ChangeDeliveryAddressModal from '@components/modal/ChangeDeliveryAddressModal';

const PRESET_AMOUNTS = [100, 200, 500, 1000, 2000];

const AddMoneyToWallet = () => {
  const params: any = useRoute().params;
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);
  const user = useSelector((state: RootState) => state.user);
  const cards = useSelector((state: RootState) => state.cards);
  const navigation = useAppNavigation();
  const [amount, setAmount] = useState<string>(
    params?.amount?.toString() || '500',
  );
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');

  const handleSelectAmount = (value: number) => {
    setAmount(value.toString());
  };

  const validateAmount = (value: string) => {
    const num = Number(value);
    return num >= 1 && num <= 20000;
  };

  const cvvModalHandler = () => {
    if (!validateAmount(amount)) {
      showToast('info', 'Enter valid amount ($1 - $2000)');
      return;
    } else if (cards.length === 0) {
      showToast('info', 'Please add a card to top-up wallet');
      return;
    } else if (!selectedCard) {
      showToast('info', 'Please select a card');
      return;
    }
    setShowModal(value => !value);
  };

  const selectedCardHandler = (id: string) => {
    setSelectedCard(id);
  };

  const navigateToAddCardScreen = () => {
    navigation.navigate(ScreenNames.AddCard);
  };

  const addMoneyToWallet = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      setLoading(true);
      const walletRef = doc(getFirestore(), 'users', uid);
      await updateDoc(walletRef, {
        wallet: user.wallet + Number(amount),
      });
      dispatch(appUserDetailsHandler({ wallet: user.wallet + Number(amount) }));
      setAmount('');
      setSelectedCard('');
      showToast('success', 'Balance updated successfully');
      navigation.goBack();
    } catch (err: any) {
      showToast('error', 'Payment failed');
      console.log('getting error while adding balance to wallet', err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        style={{ ...styles.container, backgroundColor: theme.bgColor }}
        bounces={false}
      >
        <Header title="Add Money" showCart={false} />

        <View
          style={{
            ...styles.inputContainer,
            backgroundColor: theme.card,
          }}
        >
          <Text style={{ ...styles.currency, color: theme.mainTextColor }}>
            $
          </Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
            style={{ ...styles.input, color: theme.mainTextColor }}
          />
        </View>

        <Text style={{ ...styles.note, color: theme.secondaryTextColor }}>
          You can upto ${`${2000 - user.wallet}`}
        </Text>

        <View style={styles.presetContainer}>
          {PRESET_AMOUNTS.map(item => (
            <TouchableOpacity
              key={item}
              style={styles.presetButton}
              onPress={() => handleSelectAmount(item)}
            >
              <Text style={styles.presetText}>${item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {cards.length > 0 ? (
          <View style={{ marginTop: 10 }}>
            {cards.map(item => (
              <DebitCard
                id={item.id}
                key={item.id}
                name={item.name}
                number={item.number}
                expiry={item.expiry}
                onPress={selectedCardHandler}
                bank="Bank"
                style={{
                  borderColor:
                    selectedCard === item.id
                      ? commonColors.primaryTextColor
                      : commonColors.veryLightGray,
                }}
              />
            ))}
          </View>
        ) : (
          <View style={styles.textBtnContainer}>
            {cards.length === 0 && (
              <Text style={styles.noCardText}>No card added yet!</Text>
            )}
            <TouchableOpacity onPress={navigateToAddCardScreen}>
              <Text
                style={{
                  ...styles.noCardText,
                  color: commonColors.primaryTextColor,
                }}
              >
                Add now
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <IconButton
          text="Add money"
          style={styles.button}
          onPress={cvvModalHandler}
        />
        <Text style={{ marginTop: 15, color: theme.secondaryTextColor }}>
          Note: Fake transaction for demo purpose only, don't add you card
          details.
        </Text>
      </KeyboardAwareScrollView>
      <CVVModal
        visible={showModal}
        amount={Number(amount)}
        onClose={cvvModalHandler}
        onConfirm={addMoneyToWallet}
      />
      <Loader visible={loading} />
    </>
  );
};

export default AddMoneyToWallet;
