import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import Header from '@components/header/Header';
import DebitCard from '@components/payment/DebitCard';
import Loader from '@components/loader/Loader';
import styles from '@screens/payment/managePayment/style';

import { deleteDoc, doc, getFirestore } from '@react-native-firebase/firestore';
import auth from 'src/firebase/auth';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';
import { commonColors } from '@utility/appColors';
import IconButton from '@components/buttons/IconButton';
import { showToast } from '@utility/helperMethod';
import { appcardsHandler } from '@redux/slice/cardsSlice';

const ManagePayment = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);
  const user = useSelector((state: RootState) => state.user);
  const cards = useSelector((state: RootState) => state.cards);
  const navigation = useAppNavigation();
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');

  const handleAddCard = () => {
    navigation.navigate(ScreenNames.AddCard);
  };

  const handleAddMoney = () => {
    navigation.navigate(ScreenNames.AddMoneyToWallet);
  };

  const selectedCardHandler = (id: string) => {
    setSelectedCard(id);
  };

  const removeCardHandler = async () => {
    try {
      setLoading(true);
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const cardRef = doc(getFirestore(), 'users', uid, 'cards', selectedCard);
      await deleteDoc(cardRef);
      const filterData = cards.filter((card: any) => card.id != selectedCard);
      dispatch(appcardsHandler(filterData));
      setSelectedCard('');
      showToast('success', 'Card removed successfully.');
    } catch (err: any) {
      showToast('error', 'Something went wrong');
      console.log('getting error in removing card', err?.message);
    } finally {
      setLoading(false);
    }
  };
console.log(user)
  return (
    <>
      <View style={[styles.container, { backgroundColor: theme.bgColor }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.scrollview}
        >
          <Header title="Payments" />

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.mainTextColor }]}>
              App wallet
            </Text>
          </View>

          <View style={[styles.walletCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.walletAmount, { color: theme.mainTextColor }]}>
              ${user.wallet}
            </Text>

            <TouchableOpacity
              onPress={handleAddMoney}
              style={styles.addMoneyBtn}
            >
              <Text style={styles.addMoneyText}>Add Money</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.mainTextColor }]}>
              Saved Cards
            </Text>

            <TouchableOpacity onPress={handleAddCard}>
              <Text style={styles.addCardText}>+ Add</Text>
            </TouchableOpacity>
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
                        ? commonColors.red
                        : commonColors.veryLightGray,
                  }}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>No card added yet</Text>
          )}
          {selectedCard && (
            <IconButton
              text="Remove Card"
              onPress={removeCardHandler}
              style={{ marginTop: 30, backgroundColor: commonColors.red }}
            />
          )}
        </ScrollView>
      </View>

      <Loader visible={loading} />
    </>
  );
};

export default ManagePayment;
