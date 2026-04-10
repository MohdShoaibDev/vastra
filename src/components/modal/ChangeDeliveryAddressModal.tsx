import Loader from '@components/loader/Loader';
import useAppNavigation from '@hooks/useAppNavigation';
import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore';
import { appUserDetailsHandler } from '@redux/slice/userSlice';
import { RootState } from '@redux/store/store';
import { commonColors } from '@utility/appColors';
import { ScreenNames } from '@utility/screenNames';
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
  const navigation = useAppNavigation();
  const theme = useSelector((state: RootState) => state.theme);
  const [addresses, setAddresses] = useState<any[] | null>(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const addressesRef = doc(getFirestore(), 'addresses', uid);
      const document = await getDoc(addressesRef);
      if (document?.data()?.addresses?.length > 0) {
        const filterAddresses = document
          ?.data()
          ?.addresses?.filter((address: any) => address.active);
        setAddresses(filterAddresses);
      }
    } catch (err: any) {
      console.log('getting error in fetching addresses', err?.message);
    } finally {
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        delete item['createdAt'];
        dispatch(appUserDetailsHandler({ address: item }));
        onClose();
      }}
    >
      <View style={styles.row}>
        <Text style={{ ...styles.type, color: theme.mainTextColor }}>
          {item.name} |{' '}
          {item.type === 'Other' ? item.otherAddressType : item.type}
        </Text>
        {item.default && <Text style={styles.default}>Default</Text>}
      </View>

      <Text style={styles.address}>
        {item.locality}, {item.city}, {item.state} - {item.pincode}
      </Text>

      <Text style={{ ...styles.phone, color: theme.mainTextColor }}>
        {item.phone}
      </Text>
    </TouchableOpacity>
  );

  const navigateToAddressesScreen = () => {
    onClose();
    navigation.navigate(ScreenNames.Addresses);
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose} />

      <View
        style={{ ...styles.container, backgroundColor: theme.secondaryBgColor }}
      >
        <View style={styles.handle} />

        <View style={styles.textContainer}>
          <Text style={{ ...styles.title, color: theme.mainTextColor }}>
            Select Address
          </Text>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={navigateToAddressesScreen}
          >
            <Text
              style={{
                ...styles.title,
                color: commonColors.primaryTextColor,
                textDecorationLine: 'underline',
              }}
            >
              Go to Addresses
            </Text>
          </TouchableOpacity>
        </View>

        {Array.isArray(addresses) && (
          <FlatList
            data={addresses}
            keyExtractor={item => item?.id?.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <Text style={styles.empty}>No addresses found</Text>
            }
          />
        )}
      </View>
    </Modal>
  );
};

export default ChangeDeliveryAddressModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: commonColors.lightBlack,
  },

  container: {
    height: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  handle: {
    width: 40,
    height: 4,
    backgroundColor: commonColors.veryLightGray,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },

  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },

  card: {
    borderWidth: 1,
    borderColor: commonColors.lightGray,
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
    color: commonColors.primaryTextColor,
    fontSize: 12,
  },

  address: {
    marginTop: 5,
    color: commonColors.lightGray,
  },

  phone: {
    marginTop: 4,
  },

  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: commonColors.veryLightGray,
  },
});
