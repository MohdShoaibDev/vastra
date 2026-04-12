import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '@components/header/Header';
import { RootState } from '@redux/store/store';
import { useSelector } from 'react-redux';
import styles from '@screens/orders/orderDetails/styles';
import Loader from '@components/loader/Loader';
import { showToast, toTitleCase } from '@utility/helperMethod';
import auth from 'src/firebase/auth';
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import RatingModal from '@components/modal/RatingModal';
import { commonColors } from '@utility/appColors';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  title: string;
  brand: string;
};

type Address = {
  name: string;
  phone: string;
  locality: string;
  city: string;
  pincode: string;
  state: string;
};

type Order = {
  id: string;
  createdAt: string;
  date: string;
  status: number;
  items: OrderItem;
  totalAmount: number;
  paymentMode: string;
  address: Address;
  deliveryFee: number;
  name: string;
};

const OrderDetails = ({ route }: any) => {
  const navigation = useAppNavigation();
  const theme = useSelector((state: RootState) => state.theme);
  const user = useSelector((state: RootState) => state.user);
  const { orderId, productId, status }: any = route.params;
  const [order, setOrder] = useState<null | Order>(null);
  const [productReviewSnapshot, setProductReviewSnapshot] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    Promise.all([getProductDetails(), getOwnReview()]);
  }, []);

  const getProductDetails = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!orderId || !uid) return;
      setLoading(true);
      const orderRef = doc(getFirestore(), 'orders', orderId);
      const addressRef = doc(getFirestore(), 'addresses', uid);
      const addressData: any = await getDoc(addressRef);
      const productData: any = await getDoc(orderRef);
      const date = new Date(productData?.data()?.createdAt._seconds * 1000);
      const _order = {
        id: productData.id,
        date: date.toLocaleString(),
        ...productData?.data(),
        items: productData
          ?.data()
          ?.items?.filter((data: any) => data.productId === productId)[0],
        address: addressData
          ?.data()
          ?.addresses?.filter(
            (add: any) => add.id === productData?.data().addressId,
          )[0],
      };
      delete _order['addressId'];
      setOrder(_order);
    } catch (err: any) {
      showToast('error', 'Something went wrong');
      console.log('error in getting product details', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const getOwnReview = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const productReviewRef = doc(
        getFirestore(),
        'products',
        productId,
        'reviews',
        uid,
      );
      const productReviewSnapshot = await getDoc(productReviewRef);
      setProductReviewSnapshot(productReviewSnapshot);
    } catch (err: any) {
      console.log('error getting productReviewSnapshot', err?.message);
    }
  };

  const reviewHandler = async (data: { rating: number; review: string }) => {
    try {
      setLoading(true);
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const db = getFirestore();

      const productRef = doc(db, 'products', productId);
      const productSnapshot = await getDoc(productRef);

      if (!productSnapshot.exists()) return;

      const product: any = productSnapshot.data();

      const productReviewRef = doc(db, 'products', productId, 'reviews', uid);

      const totalRating = product?.totalRating || 0;
      const reviewCount = product?.reviewCount || 0;

      if (productReviewSnapshot.exists()) {
        const oldRating = productReviewSnapshot.data()?.rating || 0;
        const _data: any = { rating: data.rating };

        if (data.review) {
          _data['review'] = data.review;
        }

        await updateDoc(productReviewRef, {
          ..._data,
          updatedAt: serverTimestamp(),
        });

        const newAvg =
          (totalRating * reviewCount - oldRating + data.rating) / reviewCount;

        await updateDoc(productRef, {
          totalRating: Number(newAvg.toFixed(1)),
        });
        showToast('success', 'Review added successfully');
      } else {
        await setDoc(productReviewRef, {
          ...data,
          name: user.name,
          createdAt: serverTimestamp(),
        });

        const newCount = reviewCount + 1;

        const newAvg = (totalRating * reviewCount + data.rating) / newCount;

        await updateDoc(productRef, {
          totalRating: Number(newAvg.toFixed(1)),
          reviewCount: newCount,
        });
        showToast('success', 'Review added successfully');
      }
    } catch (err: any) {
      showToast('error', 'Writing review failed');
      console.log('getting error in writing review', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const reviewModalHandler = () => setShowModal(value => !value);

  const navigateToProductDetails = () => {
    navigation.navigate(ScreenNames.ProductDetails, { id: productId });
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.scrollview}
      >
        {/* Order Info */}
        <Header title="Order Details" />
        {order?.id && (
          <>
            <TouchableOpacity
              onPress={navigateToProductDetails}
              activeOpacity={0.6}
            >
              <FastImage
                source={{
                  uri: order.items.image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.image}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={reviewModalHandler}
              style={styles.reviewTouch}
            >
              <Text
                style={{
                  ...styles.title,
                  color: commonColors.primaryTextColor,
                }}
              >
                {productReviewSnapshot.exists() ? 'Update' : 'Write'} Review
              </Text>
            </TouchableOpacity>

            <View
              style={{ ...styles.card, backgroundColor: theme.card, gap: 4 }}
            >
              <Text style={{ ...styles.title, color: theme.mainTextColor }}>
                Order Info
              </Text>
              <Text style={{ color: theme.mainTextColor }}>
                Order ID: {order.id}
              </Text>
              <Text style={{ color: theme.mainTextColor }}>
                Date: {order.date}
              </Text>
              <Text style={{ color: theme.mainTextColor }}>
                Brand: {toTitleCase(order.items.brand)}
              </Text>
              <Text style={{ color: theme.mainTextColor }}>
                Size: {order.items.size.toUpperCase()}
              </Text>
              <Text style={{ color: theme.mainTextColor }}>
                Quantity: {order.items.quantity}
              </Text>
              <Text style={{ color: theme.mainTextColor }}>
                Status: {status}
              </Text>
            </View>

            {/* Address */}
            <View
              style={{ ...styles.card, backgroundColor: theme.card, gap: 4 }}
            >
              <Text style={{ ...styles.title, color: theme.mainTextColor }}>
                Delivery Address
              </Text>
              <Text style={{ color: theme.mainTextColor }}>{order.name}</Text>
              <Text style={{ color: theme.mainTextColor }}>
                {order.address.phone}
              </Text>
              <Text style={{ color: theme.mainTextColor }}>
                {order.address.locality}
              </Text>
              <Text style={{ color: theme.mainTextColor }}>
                {order.address.city} - {order.address.pincode} -{' '}
                {order.address.state}
              </Text>
            </View>

            {/* Payment */}
            <View style={{ ...styles.card, backgroundColor: theme.card }}>
              <Text style={{ ...styles.title, color: theme.mainTextColor }}>
                Payment
              </Text>
              <Text style={{ color: theme.mainTextColor }}>
                Method: {order.paymentMode}
              </Text>
            </View>

            {/* Price Summary */}
            <View style={{ ...styles.card, backgroundColor: theme.card }}>
              <Text style={{ ...styles.title, color: theme.mainTextColor }}>
                Price Details
              </Text>

              <View style={styles.row}>
                <Text style={{ color: theme.mainTextColor }}>Item Price</Text>
                <Text style={{ color: theme.mainTextColor }}>
                  ${order.items.price}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={{ color: theme.mainTextColor }}>
                  Sub Total ({order.items.quantity}{' '}
                  {order.items.quantity > 1 ? 'Items' : 'Item'})
                </Text>
                <Text style={{ color: theme.mainTextColor }}>
                  ${order.items.price * order.items.quantity}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={{ color: theme.mainTextColor }}>Delivery Fee</Text>
                <Text style={{ color: theme.mainTextColor }}>
                  {order.deliveryFee > 0 ? order.deliveryFee : 'FREE'}
                </Text>
              </View>

              <View style={styles.row}>
                <Text
                  style={{ ...styles.totalText, color: theme.mainTextColor }}
                >
                  Total (incl. all items)
                </Text>
                <Text
                  style={{ ...styles.totalText, color: theme.mainTextColor }}
                >
                  ${order.totalAmount}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <RatingModal
        visible={showModal}
        onClose={reviewModalHandler}
        onSubmit={reviewHandler}
      />
      <Loader visible={loading} />
    </>
  );
};

export default OrderDetails;
