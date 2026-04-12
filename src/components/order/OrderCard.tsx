import useAppNavigation from '@hooks/useAppNavigation';
import { RootState } from '@redux/store/store';
import { commonColors } from '@utility/appColors';
import { ScreenNames } from '@utility/screenNames';
import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import { toTitleCase } from '@utility/helperMethod';

type Order = {
  id: string;
  name: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
    image: string;
    title: string;
    size: string;
    description: string;
    brand: string;
  };
  value: number;
  status: number;
};

const getStatusStyle = (status: number) => {
  switch (status) {
    case 2:
      return { bg: '#FFE7CC', text: '#FF8A00' };
    case 4:
      return { bg: '#DFF5E1', text: '#28A745' };
    case 3:
      return { bg: '#E8F5E9', text: '#7CB342' };
    default:
      return { bg: '#EEE', text: '#333' };
  }
};

const OrderCard = ({ order }: { order: Order }) => {
  const theme = useSelector((state: RootState) => state.theme);
  const statusStyle = getStatusStyle(order.status);
  const navigation = useAppNavigation();

  const orderStatusTextForm = useMemo(() => {
    switch (order.status) {
      case 1:
        return 'Processing';
      case 2:
        return 'In transit';
      default:
        return 'Delivered';
    }
  }, [order.status]);

  const navigateToOrderDetailsScreen = () => {
    navigation.navigate(ScreenNames.OrderDetails, {
      orderId: order.id,
      productId: order.items.productId,
      status: orderStatusTextForm,
    });
  };

  return (
    <TouchableOpacity
      style={{ ...styles.card, backgroundColor: theme.secondaryBgColor }}
      onPress={navigateToOrderDetailsScreen}
    >
      <View style={styles.container}>
        <View style={styles.left}>
          <FastImage
            source={{
              uri: order.items.image,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.image}
          />
        </View>
        <View style={styles.middle}>
          <View
            style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}
          >
            <Text style={{ color: statusStyle.text, fontWeight: '600' }}>
              {orderStatusTextForm}
            </Text>
          </View>
          <Text
            style={{ ...styles.orderId, color: theme.mainTextColor }}
            numberOfLines={1}
          >
            {toTitleCase(order.items.brand)}
          </Text>
          <Text style={styles.name} numberOfLines={1}>
            {order.items.description}
          </Text>
          <Text style={styles.name}>
            Size: {order.items.size.toUpperCase()}
          </Text>
        </View>
        <View style={styles.right}>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.secondaryTextColor}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },

  orderId: {
    fontSize: 15,
    fontWeight: '500',
  },

  name: {
    color: commonColors.lightGray,
  },

  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  left: {
    flex: 0.3,
    height: 100,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  middle: {
    flex: 0.7,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    gap: 5,
  },
  right: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
});
