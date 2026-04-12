import React, { useCallback } from 'react';
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
import { getFirestore, doc, deleteDoc } from '@react-native-firebase/firestore';
import { getWidthRespectiveToScreen, showToast } from '@utility/helperMethod';
import { Product } from 'src/types/product';
import { appWishlistIdsHandler } from '@redux/slice/wishlistIdsSlice';
import { appWishlistDataHandler } from '@redux/slice/wishlistDataSlice';
import Header from '@components/header/Header';

const Wishlist = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const { statusBarHeight } = useStatusBarHeight();
  const navigation = useAppNavigation();
  const dispatch = useDispatch();
  const wishlistProductIds: { [key: string]: boolean } = useSelector(
    (state: RootState) => state.wishlistIds,
  );
  const wishlistProducts = useSelector(
    (state: RootState) => state.wishlistData,
  );
  const navigateToProductDetails = useCallback((id: string) => {
    navigation.navigate(ScreenNames.ProductDetails, { id });
  }, []);

  const handleWishlist = useCallback(
    async (_: any, item: Product) => {
      const oldData = { ...wishlistProducts };
      const oldWishlistProductIds = { ...wishlistProductIds };
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
        const wishlistProductsFilter = wishlistProducts.filter(
          (product: Product) => product.id != item.id,
        );
        dispatch(appWishlistDataHandler(wishlistProductsFilter));
        const wishlistProductIdsFilter = { ...wishlistProductIds };
        delete wishlistProductIdsFilter[item.id];
        dispatch(appWishlistIdsHandler(wishlistProductIdsFilter));
        await deleteDoc(wishlistRef);
      } catch (err: any) {
        dispatch(appWishlistDataHandler(oldData));
        dispatch(appWishlistIdsHandler(oldWishlistProductIds));
        showToast('error', 'Something went wrong');
        console.log('error in wishlisting ', err?.message);
      }
    },
    [wishlistProductIds],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <ProductCard
          index={index}
          item={item}
          isWishlist={true}
          onPressWishList={handleWishlist}
          onPressCard={navigateToProductDetails}
        />
      );
    },
    [wishlistProducts],
  );

  return (
    <>
      <FlashList
        data={wishlistProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: getWidthRespectiveToScreen(4),
          backgroundColor: theme.bgColor,
        }}
        ListHeaderComponent={
          <Header title="Wishlist" showBack={false} style={styles.header} />
        }
        ListEmptyComponent={
          <Text style={{ ...styles.noDataFound, color: theme.mainTextColor }}>
            Wishlist is empty
          </Text>
        }
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default Wishlist;
