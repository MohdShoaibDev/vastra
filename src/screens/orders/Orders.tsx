import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from '@screens/orders/style';
import Header from '@components/header/Header';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import OrderCard from '@components/order/OrderCard';
import auth from 'src/firebase/auth';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from '@react-native-firebase/firestore';

type OrderStatus = 'pending' | 'processing' | 'delivered';

type Order = {
  id: string;
  name: string;
  items: number;
  value: number;
  status: OrderStatus;
};

const ordersData: Order[] = [
  {
    id: 'ORD-2891',
    name: 'Amit Sharma',
    items: 5,
    value: 12450,
    status: 'processing',
  },
  {
    id: 'ORD-2890',
    name: 'Priya Patel',
    items: 3,
    value: 8200,
    status: 'delivered',
  },
  {
    id: 'ORD-2889',
    name: 'Ravi Kumar',
    items: 8,
    value: 24890,
    status: 'pending',
  },
];

const tabs = ['All', 'Pending', 'Processing', 'Delivered'];

const Orders = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(false);
  // const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const q = query(
        collection(getFirestore(), 'orders'),
        where('userId', '==', uid),
      );
      const snapshot = await getDocs(q);
      const orders = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(orders);
      setLoading(true);
    } catch (err: any) {
      console.log('error in fetching orders', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders =
    activeTab === 'All'
      ? ordersData
      : ordersData.filter(
          o => o.status.toLowerCase() === activeTab.toLowerCase(),
        );

  const OrderHeader = () => (
    <View style={styles.topSection}>
      <Header title="Orders" showBack={false} style={styles.header} />
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 5 }}
        >
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                { backgroundColor: theme.secondaryBgColor },
                activeTab === tab && styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: theme.mainTextColor },
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => <OrderCard order={item} />,
    [],
  );

  return (
    <View style={{ ...styles.container, backgroundColor: theme.bgColor }}>
      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={<OrderHeader />}
        bounces={false}
      />
    </View>
  );
};

export default Orders;
