import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from '@screens/orders/orders/style';
import Header from '@components/header/Header';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import OrderCard from '@components/order/OrderCard';
import auth from 'src/firebase/auth';
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from '@react-native-firebase/firestore';
import Loader from '@components/loader/Loader';

const Orders = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const reload = useSelector((state: RootState) => state.reload.orders);
  const [loading, setLoading] = useState(false);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, [reload]);

  const fetchOrders = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      setLoading(true);

      const q = query(
        collection(getFirestore(), 'orders'),
        where('userId', '==', uid),
      );
      const snapshot = await getDocs(q);
      const myOrders: any = [];
      snapshot.docs.forEach((doc: any) => {
        if (doc.data()?.items?.length > 1) {
          for (let i = 0; i < doc.data().items.length; i++) {
            myOrders.push({
              id: doc.id,
              ...doc.data(),
              items: doc.data().items[i],
              status: Math.floor(Math.random() * 4) + 1,
            });
          }
        } else {
          myOrders.push({
            id: doc.id,
            ...doc.data(),
            items: doc.data().items[0],
            status: Math.floor(Math.random() * 4) + 1,
          });
        }
      });
      myOrders.sort((a: any, b: any) => {
        return b.createdAt?.seconds - a.createdAt?.seconds;
      });
      setOrdersData(myOrders);
    } catch (err: any) {
      console.log('error in fetching orders', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const OrderHeader = useCallback(
    () => (
      <View style={styles.topSection}>
        <Header title="Orders" showBack={false} style={styles.header} />
      </View>
    ),
    [],
  );

  const OrderEmptyComponent = useCallback(
    () => (
      <Text style={{ ...styles.noOrdersText, color: theme.mainTextColor }}>
        No orders yet!
      </Text>
    ),
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => <OrderCard order={item} />,
    [ordersData],
  );

  return (
    <View style={{ ...styles.container, backgroundColor: theme.bgColor }}>
      <FlatList
        data={ordersData}
        keyExtractor={item => item.id + item.items.productId}
        renderItem={renderItem}
        ListHeaderComponent={<OrderHeader />}
        ListEmptyComponent={!loading ? <OrderEmptyComponent /> : <></>}
        showsVerticalScrollIndicator={false}
        onRefresh={fetchOrders}
        refreshing={loading}
      />
      <Loader visible={loading} />
    </View>
  );
};

export default Orders;
