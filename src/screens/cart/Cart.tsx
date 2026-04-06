import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '@screens/cart/style';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import CartItem from '@components/cart/CartItem';
import Loader from '@components/loader/Loader';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from '@react-native-firebase/firestore';
import auth from 'src/firebase/auth';
import { Product } from 'src/types/product';
import { showToast } from '@utility/helperMethod';
import { useStatusBarHeight } from '@hooks/useStatusBarHeight';
import { useIsFocused } from '@react-navigation/native';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';
import IconButton from '@components/buttons/IconButton';

const Cart = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const focused = useIsFocused();
  const navigation = useAppNavigation();
  const { statusBarHeight } = useStatusBarHeight();
  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    focused && getProductFromCart();
  }, [focused]);

  const getProductFromCart = async () => {
    try {
      setLoading(true);
      if (!auth.currentUser?.uid) return;
      const snapshot = await getDocs(
        collection(getFirestore(), 'users', auth.currentUser?.uid, 'cart'),
      );
      if (snapshot?.docs.length > 0) {
        setItems(
          snapshot?.docs?.map((doc: any) => ({
            ...doc.data(),
            id: doc.id,
          })),
        );
      } else {
        setItems([]);
      }
    } catch (err: any) {
      console.log('error in getting item from cart', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const productCartHandler = async (id: string, quantity: number) => {
    try {
      setLoading(true);
      if (!auth.currentUser) return;
      const cartRef = doc(
        getFirestore(),
        'users',
        auth.currentUser.uid,
        'cart',
        id,
      );
      if (quantity === 0) {
        await deleteDoc(cartRef);
      }
      await updateDoc(cartRef, {
        quantity: quantity,
      });
    } catch (err: any) {
      console.log('error in adding product to cart', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const increase = async ({
    id,
    quantity,
    maxPurchasedAtOnce,
    size,
    sizes,
  }: Product) => {
    try {
      await productCartHandler(id, quantity + 1);
    } catch (err: any) {
      console.log('getting error in increasing qunatity', err?.message);
    }
    if (quantity + 1 > sizes[`${size}`]) {
      showToast('info', `We only have ${sizes[`${size}`]} items right now.`);
      return;
    }
    if (quantity + 1 > maxPurchasedAtOnce) {
      showToast('info', `Max ${maxPurchasedAtOnce} items are allowed at once.`);
      return;
    }
    setItems((prev: any) =>
      prev.map((i: any) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );
  };

  const decrease = async ({ id, quantity }: Product) => {
    try {
      await productCartHandler(id, quantity - 1);
      if (quantity - 1 === 0) {
        const filterData = items.filter((item: Product) => item.id != id);
        setItems(filterData);
      }
    } catch (err: any) {
      console.log('getting error in decreasing qunatity', err?.message);
    }
    setItems((prev: any) =>
      prev.map((i: any) =>
        i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i,
      ),
    );
  };

  const total = items.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity,
    0,
  );

  const navigateToPaymentScreen = () => {
    navigation.navigate(ScreenNames.Payment, { amount: total });
  };

  return (
    <View style={{ ...styles.container, backgroundColor: theme.bgColor }}>
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={{ marginTop: statusBarHeight }}>
          <Text style={{ ...styles.headerTitle, color: theme.mainTextColor }}>
            Cart
          </Text>
        </View>

        {items.length > 0 && (
          <>
            {items.map((item: any) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={() => increase(item)}
                onDecrease={() => decrease(item)}
              />
            ))}

            <View style={styles.deliveryBox}>
              <Text
                style={{
                  ...styles.deliveryTitle,
                  color: theme.mainTextColor,
                }}
              >
                Delivery
              </Text>
              <Text style={styles.deliveryText}>
                Orders above $99 have FREE shipping
              </Text>
            </View>

            <View
              style={{ ...styles.totalRow, marginTop: 10, borderTopWidth: 0 }}
            >
              <Text
                style={{ ...styles.totalLabel, color: theme.mainTextColor }}
              >
                SubTotal
              </Text>
              <Text
                style={{ ...styles.totalValue, color: theme.mainTextColor }}
              >
                ${total}
              </Text>
            </View>

            <View style={styles.totalRow}>
              <Text
                style={{ ...styles.totalLabel, color: theme.mainTextColor }}
              >
                Delivery fee
              </Text>
              <Text
                style={{ ...styles.totalValue, color: theme.mainTextColor }}
              >
                ${total <= 99 ? 19 : 0}
              </Text>
            </View>

            <View style={styles.totalRow}>
              <Text
                style={{ ...styles.totalLabel, color: theme.mainTextColor }}
              >
                Total
              </Text>
              <Text
                style={{ ...styles.totalValue, color: theme.mainTextColor }}
              >
                ${total + (total <= 99 ? 19 : 0)}
              </Text>
            </View>

            <IconButton
              text="Place your order"
              style={styles.nextBtn}
              onPress={navigateToPaymentScreen}
            />
          </>
        )}
        {!loading && items.length === 0 && (
          <Text style={{ ...styles.noDataFound, color: theme.mainTextColor }}>
            Cart is empty
          </Text>
        )}
      </ScrollView>
      <Loader visible={loading} />
    </View>
  );
};

export default Cart;
