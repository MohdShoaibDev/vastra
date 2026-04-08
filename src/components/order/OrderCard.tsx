import { RootState } from '@redux/store/store';
import { commonColors } from '@utility/appColors';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

type OrderStatus = 'pending' | 'processing' | 'delivered';

type Order = {
  id: string;
  name: string;
  items: number;
  value: number;
  status: OrderStatus;
};

const getStatusStyle = (status: OrderStatus) => {
  switch (status) {
    case 'processing':
      return { bg: '#FFE7CC', text: '#FF8A00' };
    case 'delivered':
      return { bg: '#DFF5E1', text: '#28A745' };
    case 'pending':
      return { bg: '#E8F5E9', text: '#7CB342' };
    default:
      return { bg: '#EEE', text: '#333' };
  }
};

const OrderCard = ({ order }: { order: Order }) => {
  const theme = useSelector((state: RootState) => state.theme);
  const statusStyle = getStatusStyle(order.status);

  return (
    <TouchableOpacity
      style={{ ...styles.card, backgroundColor: theme.secondaryBgColor }}
    >
      <View style={styles.rowBetween}>
        <View>
          <Text style={{ ...styles.orderId, color: theme.mainTextColor }}>
            {order.id}
          </Text>
          <Text style={styles.name}>{order.name}</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.label}>Quantity</Text>
          <Text style={{ ...styles.value, color: theme.mainTextColor }}>
            {order.items}
          </Text>
        </View>

        <View>
          <Text style={styles.label}>Value</Text>
          <Text style={{ ...styles.value, color: theme.mainTextColor }}>₹{order.value.toLocaleString()}</Text>
        </View>

        <View>
          <Text style={styles.label}>Status</Text>
          <View
            style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}
          >
            <Text style={{ color: statusStyle.text, fontWeight: '600' }}>
              {order.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  activeTab: {
    backgroundColor: commonColors.primaryTextColor,
  },

  activeTabText: {
    color: commonColors.white,
  },

  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderId: {
    fontSize: 16,
    fontWeight: '700',
  },

  name: {
    marginTop: 2,
    color: commonColors.lightGray,
  },

  arrow: {
    fontSize: 22,
    color: '#999',
  },

  divider: {
    height: 1,
    backgroundColor: commonColors.lightGray,
    marginVertical: 12,
  },

  label: {
    marginBottom: 2,
    color: commonColors.lightGray,
    fontSize: 12,
  },

  value: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },

  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 4,
  },
});
