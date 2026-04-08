import Header from '@components/header/Header';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '@screens/addresses/addresses/style';
import AddressCard from '@components/address/AddressCard';
import Loader from '@components/loader/Loader';
import AddressModal from '@components/modal/AddressModal';
import auth from 'src/firebase/auth';
import {
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';
import { useIsFocused } from '@react-navigation/native';
import { showToast } from '@utility/helperMethod';
import { appUserDetailsHandler } from '@redux/slice/userSlice';

const Addresses = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const navigation = useAppNavigation();
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState<{
    visible: boolean;
    id: null | number;
  }>({
    visible: false,
    id: null,
  });
  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState<null | number>(null);

  useEffect(() => {
    focused && fetchAddresses();
  }, [focused]);

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
      }
    } catch (err: any) {
      console.log('getting error in fetching addresses', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToAddNewAddress = () => {
    navigation.navigate(ScreenNames.AddAddress);
  };

  const modalHandler = (id: number) => {
    setShowModal({ id, visible: true });
  };

  const addressEditHandler = () => {
    if (!showModal.id) return;
    const id = showModal.id;
    setShowModal({ visible: false, id: null });
    setSelected(null);
    navigation.navigate(ScreenNames.AddAddress, {
      id,
    });
  };

  const markAsDefaultHandler = async () => {
    try {
      const id = showModal.id;
      setShowModal({
        visible: false,
        id: null,
      });
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      setLoading(true);
      const addressesRef = doc(getFirestore(), 'addresses', uid);
      let defaultAddress = {};
      const updatedAddresses: any = addresses.map((add: any) => {
        if (id === add.id) {
          defaultAddress = { ...add, default: true };
          return {
            ...add,
            default: true,
          };
        } else {
          return {
            ...add,
            default: false,
          };
        }
      });
      await updateDoc(addressesRef, {
        addresses: updatedAddresses,
      });
      showToast('success', 'Address has been mark as default');
      dispatch(appUserDetailsHandler({ address: defaultAddress }));
      setAddresses(updatedAddresses);
    } catch (err: any) {
      console.log('getting error in updating address');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={{ ...styles.container, backgroundColor: theme.bgColor }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.scrollview}
        >
          <Header title="Addresses" style={styles.header} />

          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.6}
            onPress={navigateToAddNewAddress}
          >
            <Text style={styles.plus}>＋</Text>
            <Text style={styles.addText}>Add New Address</Text>
          </TouchableOpacity>

          {addresses?.length > 0 &&
            addresses.map((address: any) => (
              <AddressCard
                key={address.id + address.name + address.locality}
                id={address.id}
                name={address.name}
                type={
                  address.type === 'Other'
                    ? address.otherAddressType
                    : address.type
                }
                markAsDefault={address.default}
                number={address.phone}
                address={`${address.locality}, ${address.city}, ${address.pincode}, ${address.state}`}
                onPressMenu={modalHandler}
                style={styles.addressCard}
              />
            ))}

          {addresses?.length === 0 && (
            <Text
              style={{ ...styles.noAddressText, color: theme.mainTextColor }}
            >
              No address found
            </Text>
          )}
        </ScrollView>
      </View>
      <Loader visible={loading} />
      <AddressModal
        visible={showModal.visible}
        onClose={() => {
          setShowModal({
            visible: false,
            id: null,
          });
        }}
        onDefault={markAsDefaultHandler}
        onDelete={() => {}}
        onEdit={addressEditHandler}
      />
    </>
  );
};

export default Addresses;
