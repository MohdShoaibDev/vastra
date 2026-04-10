import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import PaymentOption from '@components/payment/PaymentOption';
import styles from './styles';
import Header from '@components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import IconButton from '@components/buttons/IconButton';
import { useRoute } from '@react-navigation/native';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';
import DebitCard from '@components/payment/DebitCard';
import { commonColors } from '@utility/appColors';
import { showToast } from '@utility/helperMethod';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from '@react-native-firebase/firestore';
import auth from 'src/firebase/auth';
import CVVModal from '@components/modal/CVVModal';
import Loader from '@components/loader/Loader';
import { appUserDetailsHandler } from '@redux/slice/userSlice';
import { Product } from 'src/types/product';
import { appReloadHandler } from '@redux/slice/reloadSlice';

const Payment = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const cards = useSelector((state: RootState) => state.cards);
  const user = useSelector((state: RootState) => state.user);
  const reload = useSelector((state: RootState) => state.reload);
  const [selected, setSelected] = useState<'card' | 'wallet'>('card');
  const navigation = useAppNavigation();
  const param: any = useRoute().params;
  const dispatch = useDispatch();
  const [selectedCardId, setSelectedCardId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const orderIdRef = useRef(null);

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

  const updateInventory = async (cartItems: Product[]) => {
    try {
      cartItems.forEach(async (_doc: any) => {
        const productRef = doc(getFirestore(), 'products', _doc.id);
        const document = await getDoc(productRef);
        const data: any = document.data();
        if (!data) return;
        const latestSizeData = { ...data.size };
        latestSizeData[_doc.data().size] =
          latestSizeData[_doc.data().size] - _doc.data().quantity;
        await updateDoc(productRef, {
          size: latestSizeData,
        });
      });
      dispatch(appReloadHandler({ orders: !reload.orders }));
    } catch (err: any) {
      console.log('getting error in updating inventory', err?.message);
    }
  };

  const makePayment = async () => {
    try {
      setShowModal(false);
      setLoading(true);
      const paymentRef = collection(getFirestore(), 'payments');
      const paymentSnapshot = await addDoc(paymentRef, {
        userId: auth.currentUser!.uid,
        orderId: orderIdRef.current,
        amount: param.amount,
        method: selected,
        status: 'success',
        paymentMode: selected,
        createdAt: serverTimestamp,
      });
      if (!orderIdRef.current) return;
      await updateDoc(doc(getFirestore(), 'orders', orderIdRef.current), {
        paymentId: paymentSnapshot.id,
        status: 2,
      });
      const snapshot = await getDocs(
        collection(getFirestore(), 'users', auth.currentUser!.uid, 'cart'),
      );
      await Promise.all(
        snapshot.docs.map((docItem: any) => deleteDoc(docItem.ref)),
      );
      if (selected === 'wallet') {
        await updateDoc(doc(getFirestore(), 'users', auth.currentUser!.uid), {
          wallet: user.wallet - param.amount,
        });
        dispatch(appUserDetailsHandler({ wallet: user.wallet - param.amount }));
      }
      showToast('success', 'Order placed successfully');
      await updateInventory(snapshot.docs);
      navigation.reset({
        index: 0,
        routes: [{ name: ScreenNames.BottomTab }],
      });
    } catch (err: any) {
      console.log('getting error in makePayment', err?.message);
    } finally {
      setLoading(false);
    }
  };
  // status meaning: 1 -> pending, 2 -> processing, 3 -> in-transist, 4 -> delivered
  const createOrder = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      setLoading(true);
      const snapshot = await getDocs(
        collection(getFirestore(), 'users', uid, 'cart'),
      );
      let items = [];
      if (snapshot?.docs.length > 0) {
        items = snapshot?.docs?.map((doc: any) => ({
          description: doc.data().description,
          image: doc.data().image,
          name: doc.data().name,
          price: doc.data().price,
          quantity: doc.data().quantity,
          size: doc.data().size,
          productId: doc.id,
          status: 1,
        }));
      }
      const orderRef = collection(getFirestore(), 'orders');
      const orderSnapshot = await addDoc(orderRef, {
        userId: uid,
        items,
        totalAmount: param.amount,
        status: 1,
        createdAt: serverTimestamp(),
        paymentMode: selected,
        addressId: user.address.id,
        name: user.address.name,
        deliveryFee: param.amount > 99 ? 0 : 19,
      });
      orderIdRef.current = orderSnapshot.id;
      if (selected === 'card') {
        setLoading(false);
        setShowModal(true);
      } else {
        await makePayment();
      }
    } catch (err: any) {
      console.log('getting error in createOrder', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = () => {
    if (selected === 'card' && !selectedCardId) {
      showToast('info', 'Please select a card');
    } else if (selected === 'wallet' && param.amount > user.wallet) {
      showToast('info', 'Not enough wallet balance');
    } else {
      createOrder();
    }
  };

  const navigateToAddMoneyToWallet = () => {
    navigation.navigate(ScreenNames.AddMoneyToWallet, {
      amount: param.amount - user.wallet,
    });
  };
  const cvvModalHandler = async () => {
    try {
      setLoading(true);
      if (!orderIdRef.current) return;
      const orderRef = doc(getFirestore(), 'orders', orderIdRef.current);
      await deleteDoc(orderRef);
      orderIdRef.current = null;
      setShowModal(value => !value);
    } catch (err: any) {
      console.log('error in deleting order_id', err?.message);
    } finally {
      setLoading(false);
    }
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
          <Header title="Payment" style={styles.header} />

          <Text style={styles.section}>Select Payment Method</Text>

          <PaymentOption
            label1="Credit / Debit Card"
            selected={selected === 'card'}
            onPress={cardOptionHandler}
          />

          <PaymentOption
            label1="App Wallet"
            label2={`$${user.wallet.toString()}`}
            selected={selected === 'wallet'}
            onPress={walletOptionHandler}
          />

          {param.amount > user.wallet && (
            <View style={styles.addMoneyContainer}>
              <Text
                style={{
                  ...styles.notEnoughMoney,
                  color: theme.secondaryTextColor,
                }}
              >
                Add ${param.amount - user.wallet} to wallet to make this
                transaction!
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={navigateToAddMoneyToWallet}
              >
                <Text style={styles.addMoney}>Add now</Text>
              </TouchableOpacity>
            </View>
          )}

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
              ${param.amount}
            </Text>
          </View>

          <IconButton
            onPress={handlePayNow}
            text="Pay now"
            style={styles.button}
          />
          <Text style={{ marginTop: 15, color: theme.secondaryTextColor }}>
            Note: Fake transaction for demo purpose only, don't add you card
            details.
          </Text>
        </ScrollView>
      </View>
      <Loader visible={loading} />
      <CVVModal
        visible={showModal}
        amount={Number(param.amount)}
        onClose={cvvModalHandler}
        onConfirm={makePayment}
        autoRunOnClose={false}
      />
    </>
  );
};

export default Payment;
