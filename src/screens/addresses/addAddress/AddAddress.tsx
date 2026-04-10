import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Switch, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '@components/header/Header';
import { showToast } from '@utility/helperMethod';
import InputField from '@components/textfield/InputField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '@screens/addresses/addAddress/styles';
import IconButton from '@components/buttons/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import { commonColors } from '@utility/appColors';
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from '@react-native-firebase/firestore';
import Loader from '@components/loader/Loader';
import auth from 'src/firebase/auth';
import { appUserDetailsHandler } from '@redux/slice/userSlice';

const addressType = ['Home', 'Work', 'Other'];

const AddAddress = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route?.params?.id ?? null;
  const dispatch = useDispatch();
  const isEditingDefaultAddress = useRef(false);
  const theme = useSelector((state: RootState) => state.theme);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [locality, setLocality] = useState('');
  const [type, setType] = useState('Home');
  const [state, setState] = useState('');
  const [other, setOther] = useState('');
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getAndSetAddressData();
    }
  }, []);

  const getAndSetAddressData = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const addressesRef = doc(getFirestore(), 'addresses', uid);
      const allAddresses = await getDoc(addressesRef);
      const address = allAddresses
        .data()
        ?.addresses.filter((add: any) => add.id === id)[0];
      setName(address.name);
      setPhone(address.phone);
      setLocality(address.locality);
      setCity(address.city);
      setState(address.state);
      setPincode(address.pincode);
      setType(address.type);
      setOther(address.otherAddressType);
      setDefaultAddress(address.default);
      if (address.default) {
        isEditingDefaultAddress.current = true;
      }
    } catch (err: any) {
      console.log('getting error in updating address');
    } finally {
    }
  };

  const defaultAddressHandler = (address: any) => {
    delete address['createdAt'];
    dispatch(appUserDetailsHandler(address));
  };

  const handleSave = async () => {
    if (
      !name ||
      phone.length != 10 ||
      !locality ||
      !city ||
      !pincode ||
      !state
    ) {
      showToast('info', 'Please fill all field');
      return;
    } else if (type === 'Other' && other.length === 0) {
      showToast('info', 'Please fill other address type');
      return;
    }
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      setLoading(true);
      const addressesRef = doc(getFirestore(), 'addresses', uid);
      const allAddresses = await getDoc(addressesRef);
      const addressData: any = {
        name,
        phone,
        city,
        pincode,
        locality,
        state,
        type,
        active: true,
        default: true,
        createdAt: new Date(),
      };
      if (type === 'Other') {
        addressData['otherAddressType'] = other;
      }
      const previousData: any = allAddresses?.data();
      if (!previousData) {
        await setDoc(addressesRef, {
          addresses: [{ id: 1, ...addressData }],
        });
        defaultAddressHandler({ id: 1, ...addressData });
      } else {
        let previousAddresses = previousData?.addresses || [];
        if (defaultAddress) {
          previousAddresses = previousAddresses.map((add: any) => ({
            ...add,
            default: false,
          }));
        }
        await updateDoc(addressesRef, {
          addresses: [
            ...previousAddresses,
            {
              id: allAddresses.data()?.addresses.length + 1,
              ...addressData,
              default: defaultAddress,
            },
          ],
        });
      }
      navigation.goBack();
    } catch (error) {
      console.log(error);
      showToast('error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      setLoading(true);
      const addressesRef = doc(getFirestore(), 'addresses', uid);
      let allAddresses = (await getDoc(addressesRef))?.data()?.addresses;
      if (defaultAddress) {
        allAddresses = allAddresses.map((add: any) => ({
          ...add,
          default: false,
        }));
      }
      allAddresses[id - 1] = {
        id: allAddresses[id - 1].id,
        name,
        phone,
        city,
        pincode,
        locality,
        state,
        type,
        active: true,
        default: defaultAddress,
        createdAt: allAddresses[id - 1].createdAt,
      };
      await updateDoc(addressesRef, {
        addresses: allAddresses,
      });
      showToast('success', 'Address has been updated successfully');
      navigation.goBack();
    } catch (err: any) {
      console.log('getting error in updating address');
    } finally {
      setLoading(false);
    }
  };

  const toggleSwitch = () => {
    if (isEditingDefaultAddress.current) {
      showToast(
        'info',
        'Please mark another address as default to make this non default address because one address must be as default address',
      );
      return;
    }
    setDefaultAddress(prev => !prev);
  };
  return (
    <View style={{ ...styles.container, backgroundColor: theme.bgColor }}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Header
          title={id ? 'Edit Address' : 'Add New Address'}
          style={styles.header}
        />

        <InputField
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
        <InputField
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          maxLength={10}
        />
        <InputField
          placeholder="Locality"
          value={locality}
          onChangeText={setLocality}
        />
        <InputField placeholder="City" value={city} onChangeText={setCity} />
        <InputField
          placeholder="Pincode"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="number-pad"
        />
        <InputField placeholder="State" value={state} onChangeText={setState} />

        <View style={styles.typeContainer}>
          <ScrollView
            bounces={false}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            {addressType.map(item => (
              <IconButton
                key={item}
                text={item}
                style={{
                  backgroundColor:
                    type === item ? commonColors.primaryTextColor : theme.card,
                  marginRight: 10,
                }}
                textStyle={{
                  color:
                    type === item ? commonColors.white : theme.mainTextColor,
                }}
                onPress={() => setType(item)}
              />
            ))}
          </ScrollView>
        </View>
        {type === 'Other' && (
          <InputField
            placeholder="Enter other address type"
            value={other}
            onChangeText={setOther}
            style={{ marginBottom: 20 }}
          />
        )}
        <View style={styles.switchContainer}>
          <Switch
            value={defaultAddress}
            onValueChange={toggleSwitch}
            trackColor={{
              false: commonColors.veryLightGray,
              true: commonColors.primaryTextColor,
            }}
            thumbColor={commonColors.white}
            style={styles.toggle}
          />
          <Text style={{ ...styles.toggleText, color: theme.mainTextColor }}>
            Mark as default
          </Text>
        </View>
        <IconButton
          text={id ? 'Update Address' : 'Save Address'}
          style={styles.button}
          onPress={() => {
            id ? updateAddress() : handleSave();
          }}
        />
      </KeyboardAwareScrollView>
      <Loader visible={loading} />
    </View>
  );
};

export default AddAddress;
