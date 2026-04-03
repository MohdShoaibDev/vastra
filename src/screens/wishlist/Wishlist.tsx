import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import styles from '@screens/wishlist/style';
import ProductCard from '@components/card/ProductCard';
import { useStatusBarHeight } from '@hooks/useStatusBarHeight';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import auth from 'src/firebase/auth';
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  query,
  where,
  documentId,
  deleteDoc,
} from '@react-native-firebase/firestore';
import { showToast } from '@utility/helperMethod';
import Loader from '@components/loader/Loader';
import { Product } from 'src/types/product';
import { useIsFocused } from '@react-navigation/native';
import { appReloadHandler } from '@redux/slice/reloadSlice';

const Wishlist = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const { statusBarHeight } = useStatusBarHeight();
  const navigation = useAppNavigation();
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const reload = useSelector((state: RootState) => state.reload);
  const [wishlistData, setWishlistData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const wishlistObserverRef = useRef<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchWishlist();
  }, []);

  useEffect(() => {
    if (!focused && wishlistObserverRef.current) {
      dispatch(appReloadHandler({ home: !reload.home }));
    }
  }, [focused]);

  useEffect(() => {
    fetchWishlist();
  }, [reload.wishlist]);

  const fetchWishlist = async () => {
    try {
      if (!auth.currentUser?.uid) return;
      const wishlistSnapshot = await getDocs(
        collection(getFirestore(), 'users', auth.currentUser.uid, 'wishlist'),
      );
      const wishlistProductIds = wishlistSnapshot.docs.map(
        (doc: any) => doc.id,
      );
      const qry = query(
        collection(getFirestore(), 'products'),
        where(documentId(), 'in', wishlistProductIds),
      );
      const snapshot = await getDocs(qry);
      const docData = snapshot.docs.map((doc: any) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setWishlistData(docData);
      wishlistObserverRef.current = true;
    } catch (err: any) {
      console.log('error in getting wishlist products', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToProductDetails = useCallback((id: string) => {
    navigation.navigate(ScreenNames.ProductDetails, { id });
  }, []);

  const handleWishlist = useCallback(
    async (id: string) => {
      const oldData = { ...wishlistData };
      try {
        if (!auth.currentUser?.uid) {
          showToast('error', 'Something went wrong');
          return;
        }
        const wishlistRef = doc(
          getFirestore(),
          'users',
          auth.currentUser.uid,
          'wishlist',
          id,
        );
        const filterData = wishlistData.filter(
          (product: Product) => product.id != id,
        );
        setWishlistData(filterData);
        await deleteDoc(wishlistRef);
      } catch (err: any) {
        setWishlistData(oldData);
        showToast('error', 'Something went wrong');
        console.log('error in wishlisting ', err?.message);
      }
    },
    [wishlistData],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <ProductCard
          index={index}
          id={item.id}
          title={item.title}
          price={item.price}
          image={item.image}
          isWishlist={true}
          onPressWishList={() => {
            handleWishlist(item.id);
          }}
          onPressCard={navigateToProductDetails}
        />
      );
    },
    [handleWishlist],
  );

  const Header = () => (
    <View style={{ marginTop: statusBarHeight, marginBottom: 20 }}>
      <Text style={{ ...styles.headerTitle, color: theme.mainTextColor }}>
        Wishlist
      </Text>
    </View>
  );

  return (
    <>
      <Header />
      {wishlistData.length > 0 && (
        <FlashList
          data={wishlistData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: 20,
            backgroundColor: theme.bgColor,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
      {!loading && wishlistData.length === 0 && (
        <Text style={{ ...styles.noDataFound, color: theme.mainTextColor }}>
          Wishlist is empty
        </Text>
      )}
      <Loader visible={loading} />
    </>
  );
};

export default Wishlist;
