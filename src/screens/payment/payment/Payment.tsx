import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import PaymentOption from '@components/payment/PaymentOption';
import styles from './styles';
import Header from '@components/header/Header';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import IconButton from '@components/buttons/IconButton';
import { useIsFocused, useRoute } from '@react-navigation/native';
import {
  collection,
  getDocs,
  getFirestore,
} from '@react-native-firebase/firestore';
import auth from 'src/firebase/auth';
import Loader from '@components/loader/Loader';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';
import DebitCard from '@components/payment/DebitCard';
import { commonColors } from '@utility/appColors';

type Card = {
  id?: string;
  number: string;
  name: string;
  expiry: string;
  cvv: string;
};

const Payment = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const [selected, setSelected] = useState<'card' | 'wallet'>('card');
  const focused = useIsFocused();
  const navigation = useAppNavigation();
  const param: any = useRoute().params;
  const processingRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCardId, setSelectedCardId] = useState('');

  useEffect(() => {
    if (focused) {
      getCardList();
    }
  }, [focused]);

  const getCardList = async () => {
    try {
      setLoading(true);
      if (!auth.currentUser?.uid) return;
      const cardRef = collection(
        getFirestore(),
        'users',
        auth.currentUser.uid,
        'cards',
      );
      const snapshot = await getDocs(cardRef);
      setCards(
        snapshot?.docs?.map((card: any) => ({
          id: card.id,
          number: card?.data().number,
          name: card?.data().name,
          expiry: card?.data().expiry,
          cvv: card?.data().cvv,
        })),
      );
    } catch (err: any) {
      console.log('getting error in payment screen', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (processingRef.current) return;

    processingRef.current = true;

    try {
      console.log('Selected Method:', selected);

      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Payment Success');
    } catch (err) {
      console.log('Payment Failed');
    } finally {
      processingRef.current = false;
    }
  };

  const handleAddCard = () => {
    navigation.navigate(ScreenNames.AddCard);
  };

  const walletOptionHandler = () => {
    setSelected('wallet');
    setSelectedCardId('');
  };

  const cardOptionHandler = () => {
    setSelected('card');
  };

  const cardHandler = (id: string) => {
    setSelectedCardId(id);
  };

  return (
    <>
      <View style={{ ...styles.container, backgroundColor: theme.bgColor }}>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.scrollview}
        >
          <Header title="Payment" />

          <Text style={styles.section}>Select Payment Method</Text>

          <PaymentOption
            label="Credit / Debit Card"
            selected={selected === 'card'}
            onPress={cardOptionHandler}
          />

          <PaymentOption
            label="App Wallet"
            selected={selected === 'wallet'}
            onPress={walletOptionHandler}
          />

          {selected === 'card' &&
            cards.map(item => (
              <DebitCard
                style={{
                  borderWidth: 1,
                  borderColor:
                    selectedCardId === item.id
                      ? commonColors.primaryTextColor
                      : commonColors.veryLightGray,
                }}
                id={item.id}
                key={item.id}
                name={item.name}
                number={item.number}
                expiry={item.expiry}
                bank="Bank"
                list={true}
                onPress={cardHandler}
              />
            ))}

          {selected === 'card' && (
            <TouchableOpacity
              onPress={handleAddCard}
              style={styles.addCardTouch}
              activeOpacity={0.8}
            >
              <Text style={styles.addCard}>Add card</Text>
            </TouchableOpacity>
          )}

          <View style={{ ...styles.summary, backgroundColor: theme.card }}>
            <Text
              style={{ ...styles.amountLabel, color: theme.secondaryTextColor }}
            >
              Total Amount
            </Text>
            <Text style={{ ...styles.amount, color: theme.mainTextColor }}>
              ${`${param.amount}`}
            </Text>
          </View>

          <IconButton text="Pay now" style={styles.button} />
        </ScrollView>
      </View>
      <Loader visible={loading} />
    </>
  );
};

export default Payment;
