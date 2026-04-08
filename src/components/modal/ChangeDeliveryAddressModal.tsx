import Loader from '@components/loader/Loader';
import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore';
import { RootState } from '@redux/store/store';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import auth from 'src/firebase/auth';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const ChangeDeliveryAddressModal = ({ visible, onClose }: Props) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAddresses;
  }, []);

  const fetchAddresses = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      setLoading(true);
      const addressesRef = doc(getFirestore(), 'addresses', uid);
      const document = await getDoc(addressesRef);
      if (document?.data()?.addresses?.length > 0) {
        const filterAddresses = document
          ?.data()
          ?.addresses?.filter((address: any) => address.active);
        setAddresses(filterAddresses);
        // dispatch(
        //   appUserDetailsHandler({
        //     address: filterAddresses?.length > 0 ? filterAddresses[0] : {},
        //   }),
        // );
      }
    } catch (err: any) {
      console.log('getting error in fetching addresses', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        onSelect(item);
        onClose();
      }}
    >
      <View style={styles.row}>
        <Text style={styles.type}>{item.type}</Text>
        {item.active && <Text style={styles.default}>Default</Text>}
      </View>

      <Text style={styles.address}>
        {item.locality}, {item.city}, {item.state} - {item.pincode}
      </Text>

      <Text style={styles.phone}>{item.phone}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal transparent visible={visible} animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose} />

      <View style={styles.container}>
        <View style={styles.handle} />

        <Text style={styles.title}>Select Address</Text>

        <FlatList
          data={addresses}
          keyExtractor={item => item?.id?.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={styles.empty}>No addresses found</Text>
          }
        />
      </View>
      <Loader visible={loading} />
    </Modal>
  );
};

export default ChangeDeliveryAddressModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  container: {
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },

  card: {
    borderWidth: 1,
    borderColor: '#6C63FF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  type: {
    fontWeight: '600',
  },

  default: {
    color: '#6C63FF',
    fontSize: 12,
  },

  address: {
    marginTop: 5,
    color: '#444',
  },

  phone: {
    marginTop: 4,
  },

  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#888',
  },
});
