import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Text, FlatList, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import styles from '@screens/home/style';
import SearchBar from '@components/searchBar/SearchBar';
import BrandItem from '@components/item/BrandItem';
import ProductCard from '@components/card/ProductCard';
import SectionHeader from '@components/header/SectionHeader';
import { useStatusBarHeight } from '@hooks/useStatusBarHeight';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import auth from 'src/firebase/auth';
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
  deleteDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { showToast } from '@utility/helperMethod';
import Loader from '@components/loader/Loader';
import { Product } from 'src/types/product';
import { useIsFocused } from '@react-navigation/native';
import { appReloadHandler } from '@redux/slice/reloadSlice';

type WishlistType = {
  [key: string]: boolean;
};

const Home = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const { statusBarHeight } = useStatusBarHeight();
  const navigation = useAppNavigation();
  const focused = useIsFocused();
  const wishlistObserverRef = useRef<any>({});
  const dispatch = useDispatch();
  const reload = useSelector((state: RootState) => state.reload);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [wishlistData, setWishlistData] = useState<WishlistType>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchWishlistData()]).finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!focused && Object.keys(wishlistObserverRef.current).length > 0) {
      dispatch(appReloadHandler({ wishlist: !reload.wishlist }));
    }
  }, [focused]);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchWishlistData()]).finally(() => {
      setLoading(false);
    });
  }, [reload.home]);

  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(getFirestore(), 'products'));
      const docData = snapshot.docs.map((doc: any) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setProductsData(docData);
    } catch (err: any) {
      console.log('error in getting products', err?.message);
    }
  };

  const fetchWishlistData = async () => {
    try {
      if (!auth.currentUser?.uid) return;
      const snapshot = await getDocs(
        collection(getFirestore(), 'users', auth.currentUser.uid, 'wishlist'),
      );
      const data = {};
      if (snapshot.docs?.length === 0) return;
      for (let i = 0; i < snapshot.docs.length; i++) {
        data[snapshot.docs[i].id] = true;
      }
      setWishlistData(data);
    } catch (err: any) {
      console.log('error in getting products', err?.message);
    }
  };

  const navigateToProductDetails = useCallback((id: string) => {
    navigation.navigate(ScreenNames.ProductDetails, { id });
  }, []);

  const handleWishlist = useCallback(
    async (id: string, isWishlist: boolean) => {
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
        if (isWishlist) {
          const data = { ...wishlistData };
          delete data[id];
          setWishlistData(data);
          await deleteDoc(wishlistRef);
        } else {
          setWishlistData((preData: any) => ({
            ...preData,
            [id]: true,
          }));
          await setDoc(wishlistRef, {
            createdAt: serverTimestamp(),
          });
        }
        if (wishlistObserverRef.current[id]) {
          delete wishlistObserverRef.current[id];
        } else {
          wishlistObserverRef.current[id] = id;
        }
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
          isWishlist={wishlistData[item.id]}
          onPressWishList={handleWishlist}
          onPressCard={navigateToProductDetails}
        />
      );
    },
    [wishlistData],
  );

  const brands = useMemo(() => {
    const _products = [...new Set(productsData.map(item => item.brand))];
    return _products.map(item => {
      const splitArray = item.split(' ');
      return splitArray
        .reduce(
          (acc, value) => acc + value[0].toUpperCase() + value.slice(1) + ' ',
          '',
        )
        .trimEnd();
    });
  }, [productsData]);

  const renderBrandItem = useCallback(
    ({ item }: { item: any }) => <BrandItem name={item} />,
    [],
  );

  const Header = () => (
    <View>
      <Text style={{ ...styles.hello, color: theme.mainTextColor }}>Hello</Text>
      <Text style={{ ...styles.subtitle, color: theme.secondaryTextColor }}>
        Welcome to Laza.
      </Text>

      <SearchBar
        onSearch={value => {
          console.log('search:', value);
        }}
      />

      <SectionHeader title="Choose Brand" />

      <FlatList
        horizontal
        data={brands}
        keyExtractor={item => item}
        renderItem={renderBrandItem}
        showsHorizontalScrollIndicator={false}
      />

      <SectionHeader title="New Arrival" />
    </View>
  );

  return (
    <>
      <FlashList
        data={productsData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={Header}
        contentContainerStyle={{
          paddingTop: statusBarHeight,
          paddingHorizontal: 20,
          backgroundColor: theme.bgColor,
        }}
        showsVerticalScrollIndicator={false}
      />
      <Loader visible={loading} />
    </>
  );
};

export default Home;
