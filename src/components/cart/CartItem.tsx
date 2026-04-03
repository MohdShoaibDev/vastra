import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { commonColors } from '@utility/appColors';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';

type CartItemType = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  bg: string;
};

type Props = {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
};

const CartItem: React.FC<Props> = ({ item, onIncrease, onDecrease }) => {
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <View style={{ ...styles.itemContainer, backgroundColor: theme.card }}>
      <View style={[styles.imageBox, { backgroundColor: item.bg }]}>
        <FastImage source={{ uri: item.image }} style={styles.image} />
      </View>

      <View style={styles.itemInfo}>
        <Text
          numberOfLines={1}
          style={{ ...styles.title, color: theme.mainTextColor }}
        >
          {item.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{ ...styles.subtitle, color: theme.secondaryTextColor }}
        >
          {item.description}
        </Text>
        <Text style={{ ...styles.price, color: theme.mainTextColor }}>
          ${item.price}
        </Text>
      </View>

      <View style={styles.qtyContainer}>
        <TouchableOpacity style={styles.circleBtn} onPress={onDecrease}>
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
        <Text style={{ ...styles.qty, color: theme.mainTextColor }}>
          {item.quantity}
        </Text>
        <TouchableOpacity style={styles.circleBtn} onPress={onIncrease}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  imageBox: {
    width: 70,
    height: 70,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  subtitle: {
    color: commonColors.lightBlack,
    marginVertical: 2,
  },
  price: {
    marginTop: 4,
    fontWeight: '500',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: commonColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  btnText: {
    fontSize: 16,
  },
  qty: {
    marginHorizontal: 8,
    fontWeight: '500',
  },
  deliveryBox: {
    marginTop: 30,
  },
  deliveryTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  deliveryText: {
    color: commonColors.gray,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    borderTopWidth: 1,
    borderColor: commonColors.veryLightGray,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  nextBtn: {
    marginTop: 20,
    backgroundColor: commonColors.primaryTextColor,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextText: {
    color: commonColors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
