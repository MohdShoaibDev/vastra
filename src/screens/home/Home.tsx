import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Text, FlatList, View, TouchableOpacity } from 'react-native';
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
import { appWishlistIdsHandler } from '@redux/slice/wishlistIdsSlice';
import { appWishlistDataHandler } from '@redux/slice/wishlistDataSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const { statusBarHeight } = useStatusBarHeight();
  const navigation = useAppNavigation();
  const dispatch = useDispatch();
  const wishlistIds = useSelector((state: RootState) => state.wishlistIds);
  const wishlistData = useSelector((state: RootState) => state.wishlistData);
  const user = useSelector((state: RootState) => state.user);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const wishlistIdsRef = useRef({});
  const wishlistDataRef = useRef<Product[]>([]);

  useEffect(() => {
    wishlistDataRef.current = wishlistData;
    wishlistIdsRef.current = wishlistIds;
  }, [wishlistData, wishlistIds]);

  useEffect(() => {
    fetchProducts().finally(() => {
      setLoading(false);
    });
  }, []);

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

  const navigateToProductDetails = useCallback((id: string) => {
    navigation.navigate(ScreenNames.ProductDetails, { id });
  }, []);

  const handleWishlist = useCallback(
    async (isWishlist: boolean, item: Product) => {
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
          item.id,
        );
        if (isWishlist) {
          const data: any = { ...wishlistIds };
          const appWishlistData = wishlistData.filter(
            (product: Product) => product.id != item.id,
          );
          // if (Math.random() < 0.5) {
          //   console.log(item.price);
          //   await new Promise((_, reject) =>
          //     setTimeout(() => {
          //       reject('Intentional error');
          //     }, 5000),
          //   );
          // }
          dispatch(appWishlistDataHandler(appWishlistData));
          delete data[item.id];
          dispatch(appWishlistIdsHandler(data));
          await deleteDoc(wishlistRef);
        } else {
          dispatch(appWishlistDataHandler(item));
          dispatch(appWishlistIdsHandler({ ...wishlistIds, [item.id]: true }));
          // if (Math.random() < 0.5) {
          //   console.log(item.price);
          //   await new Promise((_, reject) =>
          //     setTimeout(() => {
          //       reject('Intentional error');
          //     }, 5000),
          //   );
          // }
          await setDoc(wishlistRef, {
            createdAt: serverTimestamp(),
          });
        }
      } catch (err: any) {
        if (isWishlist) {
          dispatch(appWishlistDataHandler(item));
          dispatch(
            appWishlistIdsHandler({
              ...wishlistDataRef.current,
              [item.id]: true,
            }),
          );
        } else {
          const data: any = { ...wishlistIdsRef.current };
          const appWishlistData = wishlistDataRef.current.filter(
            (product: Product) => product.id != item.id,
          );
          dispatch(appWishlistDataHandler(appWishlistData));
          delete data[item.id];
          dispatch(appWishlistIdsHandler(data));
        }
        showToast('error', 'Something went wrong');
      }
    },
    [wishlistIds, wishlistData],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <ProductCard
          item={item}
          index={item.id}
          isWishlist={wishlistIds[item.id]}
          onPressWishList={handleWishlist}
          onPressCard={navigateToProductDetails}
        />
      );
    },
    [wishlistIds],
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

  const navigateToCartScreen = () => {
    navigation.navigate(ScreenNames.Cart);
  };

  const Header = () => (
    <View>
      <View style={styles.topSectionContainer}>
        <View>
          <Text style={{ ...styles.hello, color: theme.mainTextColor }}>
            Hello
          </Text>
          <Text style={{ ...styles.subtitle, color: theme.secondaryTextColor }}>
            {`Welcome ${user.name}`}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={navigateToCartScreen}>
          <Ionicons name="cart-outline" size={22} color={theme.mainTextColor} />
        </TouchableOpacity>
      </View>

      <SearchBar
        onSearch={value => {
          console.log('search:', value);
        }}
        style={{marginBottom: 10}}
      />

      {/* <SectionHeader title="Choose Brand" />

      <FlatList
        horizontal
        data={brands}
        keyExtractor={item => item}
        renderItem={renderBrandItem}
        showsHorizontalScrollIndicator={false}
      /> */}

      {/* <SectionHeader title="New Arrival" /> */}
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
