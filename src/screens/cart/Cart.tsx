import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '@screens/cart/style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import CartItem from '@components/cart/CartItem';
import Loader from '@components/loader/Loader';
import {
  count,
  deleteDoc,
  doc,
  getFirestore,
  updateDoc,
} from '@react-native-firebase/firestore';
import auth from 'src/firebase/auth';
import { Product } from 'src/types/product';
import { showToast } from '@utility/helperMethod';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';
import IconButton from '@components/buttons/IconButton';
import Header from '@components/header/Header';
import AddressCard from '@components/address/AddressCard';
import { commonColors } from '@utility/appColors';
import ChangeDeliveryAddressModal from '@components/modal/ChangeDeliveryAddressModal';
import { appUserDetailsHandler } from '@redux/slice/userSlice';

const Cart = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigation = useAppNavigation();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      if (quantity + 1 > sizes[`${size}`]) {
        showToast('info', `We only have ${sizes[`${size}`]} items right now.`);
        return;
      }
      if (quantity + 1 > maxPurchasedAtOnce) {
        showToast(
          'info',
          `Max ${maxPurchasedAtOnce} items are allowed at once.`,
        );
        return;
      }
      await productCartHandler(id, quantity + 1);
      const mappedData = user.cart.items.map((prod: Product) => {
        if (id === prod.id) {
          return {
            ...prod,
            quantity: prod.quantity + 1,
          };
        } else {
          return prod;
        }
      });
      dispatch(
        appUserDetailsHandler({
          cart: { count: user.cart.count + 1, items: mappedData },
        }),
      );
    } catch (err: any) {
      console.log('getting error in increasing qunatity', err?.message);
    }
  };

  const decrease = async ({ id, quantity }: Product) => {
    try {
      await productCartHandler(id, quantity - 1);
      if (quantity - 1 === 0) {
        const filterData = user.cart.items.filter(
          (item: Product) => item.id != id,
        );
        dispatch(
          appUserDetailsHandler({
            cart: {
              count: user.cart.count - 1,
              items: filterData,
            },
          }),
        );
      } else {
        const mappedData = user.cart.items.map((item: Product) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
        dispatch(
          appUserDetailsHandler({
            cart: {
              count: user.cart.count - 1,
              items: mappedData,
            },
          }),
        );
      }
    } catch (err: any) {
      console.log('getting error in decreasing qunatity', err?.message);
    }
  };

  const total = user.cart.items.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity,
    0,
  );

  const navigateToAddAddressScreen = () => {
    navigation.navigate(ScreenNames.AddAddress);
  };

  const navigateToPaymentScreen = () => {
    if (!user.address.id) {
      showToast('info', 'No delivery address found, add now');
      return;
    }
    navigation.navigate(ScreenNames.Payment, {
      amount: total + (total <= 99 ? 19 : 0),
    });
  };

  const modalHandler = () => setShowModal(pre => !pre);
  return (
    <>
      <View style={{ ...styles.container, backgroundColor: theme.bgColor }}>
        <ScrollView
          style={styles.scrollview}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <Header title="Cart" showCart={false} style={styles.header} />
          {user.address.id && user.cart.count > 0 && (
            <>
              <View style={styles.deliveredToTextContainer}>
                <Text
                  style={{
                    ...styles.deliveredToText,
                    color: theme.mainTextColor,
                  }}
                >
                  Delivered to
                </Text>
                <TouchableOpacity onPress={modalHandler}>
                  <Text
                    style={{
                      ...styles.deliveredToText,
                      textDecorationLine: 'underline',
                      color: commonColors.primaryTextColor,
                    }}
                  >
                    Change delivery address
                  </Text>
                </TouchableOpacity>
              </View>
              <AddressCard
                id={user.address.id}
                name={user.address.name}
                type={
                  user.address?.type === 'Other'
                    ? user.address.otherAddressType
                    : user.address.type
                }
                markAsDefault={user.address.default}
                number={user.address.phone}
                address={`${user.address?.locality}, ${user.address?.city}, ${user.address?.state} - ${user.address?.pincode}`}
                style={styles.addressCard}
                showMenu={false}
              />
            </>
          )}

          {!user.address.id && user.cart.count > 0 && (
            <View style={styles.addAddressContainer}>
              <Text
                style={{
                  ...styles.deliveredToText,
                  fontWeight: '400',
                  color: theme.mainTextColor,
                }}
              >
                No address found:
              </Text>
              <TouchableOpacity
                style={styles.addAddress}
                onPress={navigateToAddAddressScreen}
              >
                <Text
                  style={{
                    ...styles.deliveredToText,
                    color: commonColors.primaryTextColor,
                    textDecorationLine: 'underline',
                  }}
                >
                  Add address
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {user.cart.count > 0 && (
            <>
              {user.cart.items.map((item: any) => (
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
          {!loading && user.cart.count === 0 && (
            <Text style={{ ...styles.noDataFound, color: theme.mainTextColor }}>
              Cart is empty
            </Text>
          )}
        </ScrollView>
        <Loader visible={loading} />
      </View>
      {showModal && (
        <ChangeDeliveryAddressModal visible={true} onClose={modalHandler} />
      )}
    </>
  );
};

export default Cart;
