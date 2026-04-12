import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '@screens/auth/splash/Splash';
import Signup from '@screens/auth/signup/Signup';
import Login from '@screens/auth/login/Login';
import { ScreenNames } from '@utility/screenNames';
import { RootStackParamList } from 'src/types/navigation';
import ProductDetails from '@screens/productDetails/ProductDetails';
import { onAuthStateChanged } from '@react-native-firebase/auth';
import BottomTab from './BottomTab';
import auth from 'src/firebase/auth';
import Wishlist from '@screens/wishlist/Wishlist';
import Cart from '@screens/cart/Cart';
import Profile from '@screens/profile/Profile';
import Orders from '@screens/orders/orders/Orders';
import TermsAndCondition from '@screens/termsAndConditions/TermsAndCondition';
import Notifications from '@screens/notification/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { showToast, storage } from '@utility/helperMethod';
import { Appearance, Platform, StyleSheet, Text, View } from 'react-native';
import { appThemeHandler } from '@redux/slice/themeSlice';
import { commonColors, darkColors, lightColors } from '@utility/appColors';
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from '@react-native-firebase/firestore';
import { appWishlistIdsHandler } from '@redux/slice/wishlistIdsSlice';
import { appWishlistDataHandler } from '@redux/slice/wishlistDataSlice';
import { appUserDetailsHandler } from '@redux/slice/userSlice';
import Payment from '@screens/payment/payment/Payment';
import NetInfo from '@react-native-community/netinfo';
import { RootState } from '@redux/store/store';
import AddCard from '@screens/payment/addCard/AddCard';
import Addresses from '@screens/addresses/addresses/Addresses';
import ManagePayment from '@screens/payment/managePayment/ManagePayment';
import AddMoneyToWallet from '@screens/payment/wallet/AddMoneyToWallet';
import { appcardsHandler } from '@redux/slice/cardsSlice';
import AddAddress from '@screens/addresses/addAddress/AddAddress';
import OrderDetails from '@screens/orders/orderDetails/OrderDetails';
import Reviews from '@screens/reviews/Reviews';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationStack = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const theme = useSelector((state: RootState) => state.theme);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [internetIsConnected, setInternetIsConnected] = useState<
    boolean | null
  >(true);
  const [internetAccessible, setInternetAccessible] = useState<boolean | null>(
    true,
  );

  useEffect(() => {
    const storedTheme = storage.getString('theme');
    const systemTheme = Appearance.getColorScheme();

    if (storedTheme === 'system') {
      dispatch(
        appThemeHandler(systemTheme === 'dark' ? darkColors : lightColors),
      );
    } else {
      dispatch(
        appThemeHandler(storedTheme === 'dark' ? darkColors : lightColors),
      );
    }

    const themeSubscription = Appearance.addChangeListener(
      ({ colorScheme }) => {
        const theme = storage.getString('theme');

        if (theme === 'system') {
          dispatch(
            appThemeHandler(colorScheme === 'dark' ? darkColors : lightColors),
          );
        }
      },
    );

    const unsubscribe = onAuthStateChanged(auth, async user => {
      setIsAuth(!!user);
      setTimeout(() => setLoading(false), 2500);
      if (auth.currentUser?.uid) {
        try {
          const result: any[] = await Promise.all([
            getWishlistIds(auth.currentUser?.uid),
            getProductFromCart(),
          ]);
          if (Array.isArray(result[0]) && result[0].length > 0) {
            fetchWishlist(result[0]);
          }
        } catch (err: any) {
          console.log(
            'error in getting wishlist data navigation stack',
            err?.message,
          );
        }
      }
    });

    return () => {
      unsubscribe();
      themeSubscription.remove();
    };
  }, []);

  useEffect(() => {
    Promise.all([fetchUserDetails(), getCardList(), fetchAddresses()]);
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && state.isInternetReachable) {
        setInternetIsConnected(true);
        setInternetAccessible(true);
      }
      if (!state.isConnected) {
        showToast('error', 'No internet!');
        setInternetIsConnected(false);
      } else if (!state.isInternetReachable) {
        setInternetAccessible(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const getProductFromCart = async () => {
    try {
      setLoading(true);
      if (!auth.currentUser?.uid) return;
      const snapshot = await getDocs(
        collection(getFirestore(), 'users', auth.currentUser?.uid, 'cart'),
      );
      if (snapshot?.docs.length > 0) {
        let count = 0;
        const items = snapshot?.docs?.map((doc: any) => {
          count += doc.data().quantity;
          delete doc.data()['createdAt'];
          console.log('shoaib', {...doc.data()});
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        dispatch(
          appUserDetailsHandler({
            cart: {
              count,
              items,
            },
          }),
        );
      }
    } catch (err: any) {
      console.log('error in getting item from cart', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const getWishlistIds = async (uid: string) => {
    try {
      const wishlistRef = collection(getFirestore(), 'users', uid, 'wishlist');
      const snapshot = await getDocs(wishlistRef);
      const wishlistIds: any = {};
      if (snapshot.docs?.length > 0) {
        snapshot.docs.forEach((doc: any, index: number) => {
          wishlistIds[doc.id] = true;
        });
        dispatch(appWishlistIdsHandler(wishlistIds));
      }
      return Object.keys(wishlistIds);
    } catch (err: any) {
      console.log(
        'getting error in wishlist data navigation stack',
        err?.message,
      );
    }
  };

  const fetchWishlist = async (wishlistIds: string[]) => {
    try {
      const qry = query(
        collection(getFirestore(), 'products'),
        where(documentId(), 'in', wishlistIds),
      );
      const snapshot = await getDocs(qry);
      const docData = snapshot.docs.map((doc: any) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      dispatch(appWishlistDataHandler(docData));
    } catch (err: any) {
      console.log('error in getting wishlist products', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    if (!auth.currentUser?.uid) return;
    const userRef = doc(getFirestore(), 'users', auth.currentUser?.uid);
    const user = await getDoc(userRef);
    const data = user.data();
    if (!data) return;
    dispatch(
      appUserDetailsHandler({
        email: data.email,
        name: data.name,
        wallet: data.wallet,
      }),
    );
    try {
    } catch (err: any) {
      console.log('error in fetching user details', err?.message);
    }
  };

  const getCardList = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const cardRef = collection(getFirestore(), 'users', uid, 'cards');
      const snapshot = await getDocs(cardRef);
      const cards = snapshot?.docs?.map((doc: any) => ({
        id: doc.id,
        number: doc.data().number,
        name: doc.data().name,
        expiry: doc.data().expiry,
        cvv: doc.data().cvv,
      }));
      dispatch(appcardsHandler(cards));
    } catch (err: any) {
      console.log('getting error in cardlist', err?.message);
    } finally {
    }
  };

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
          ?.addresses?.filter(
            (address: any) => address.active && address.default,
          );
        if (filterAddresses?.length > 0) {
          dispatch(
            appUserDetailsHandler({
              address: {
                id: filterAddresses[0]?.id,
                name: filterAddresses[0]?.name,
                phone: filterAddresses[0]?.phone,
                locality: filterAddresses[0]?.locality,
                city: filterAddresses[0]?.city,
                pincode: filterAddresses[0]?.pincode,
                state: filterAddresses[0]?.state,
                default: filterAddresses[0]?.default,
              },
            }),
          );
        }
      }
    } catch (err: any) {
      console.log('getting error in fetching addresses', err?.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }
  };

  return (
    <>
      {internetIsConnected && internetAccessible && (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            contentStyle: {
              paddingBottom: Platform.OS === 'android' ? insets.bottom : 0,
            },
          }}
        >
          {loading && (
            <Stack.Screen name={ScreenNames.Splash} component={Splash} />
          )}
          {!loading && (
            <>
              {!isAuth ? (
                <>
                  <Stack.Screen name={ScreenNames.Login} component={Login} />
                  <Stack.Screen
                    name={ScreenNames.Register}
                    component={Signup}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name={ScreenNames.BottomTab}
                    component={BottomTab}
                  />
                  <Stack.Screen
                    name={ScreenNames.ProductDetails}
                    component={ProductDetails}
                  />
                  <Stack.Screen
                    name={ScreenNames.Wishlist}
                    component={Wishlist}
                  />
                  <Stack.Screen name={ScreenNames.Cart} component={Cart} />
                  <Stack.Screen
                    name={ScreenNames.Payment}
                    component={Payment}
                  />
                  <Stack.Screen
                    name={ScreenNames.AddCard}
                    component={AddCard}
                  />
                  <Stack.Screen
                    name={ScreenNames.AddMoneyToWallet}
                    component={AddMoneyToWallet}
                  />
                  <Stack.Screen
                    name={ScreenNames.Profile}
                    component={Profile}
                  />
                  <Stack.Screen name={ScreenNames.Orders} component={Orders} />
                  <Stack.Screen
                    name={ScreenNames.OrderDetails}
                    component={OrderDetails}
                  />
                  <Stack.Screen
                    name={ScreenNames.TermsAndCondition}
                    component={TermsAndCondition}
                  />
                  <Stack.Screen
                    name={ScreenNames.Notifications}
                    component={Notifications}
                  />
                  <Stack.Screen
                    name={ScreenNames.Addresses}
                    component={Addresses}
                  />
                  <Stack.Screen
                    name={ScreenNames.AddAddress}
                    component={AddAddress}
                  />
                  <Stack.Screen
                    name={ScreenNames.ManagePayment}
                    component={ManagePayment}
                  />
                  <Stack.Screen
                    name={ScreenNames.Reviews}
                    component={Reviews}
                  />
                </>
              )}
            </>
          )}
        </Stack.Navigator>
      )}
      {!internetIsConnected ||
        (!internetAccessible && (
          <View style={styles.noInternetContainer}>
            <Text
              style={{ ...styles.noInternetText, color: theme.mainTextColor }}
            >
              {'Internet Problem'}
            </Text>
          </View>
        ))}
    </>
  );
};

export default NavigationStack;

const styles = StyleSheet.create({
  noInternetContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonColors.lightBlack,
  },
  noInternetText: {
    fontSize: 22,
    fontWeight: '500',
  },
});
