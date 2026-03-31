import React, { useCallback, useMemo, useState } from 'react';
import { Text, FlatList, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import styles from '@screens/home/style';

import SearchBar from '@components/searchBar/SearchBar';
import BrandItem from '@components/item/BrandItem';
import ProductCard from '@components/card/ProductCard';
import SectionHeader from '@components/header/SectionHeader';
import { useStatusBarHeight } from '@hooks/useStatusBarHeight';
import { products } from '@utility/tempData';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

const Home = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const { statusBarHeight } = useStatusBarHeight();
  const navigation = useAppNavigation();
  const [productsData, setProductsData] = useState(products);

  const navigateToProductDetails = useCallback((id: number) => {
    navigation.navigate(ScreenNames.ProductDetails, {
      id,
    });
  }, []);

  const handleWishlist = useCallback((index: number) => {
    setProductsData(preData => {
      const updatedData = [...preData];
      updatedData[index] = {
        ...updatedData[index],
        isWishlist: !updatedData[index].isWishlist,
      };
      return updatedData;
    });
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <ProductCard
          index={index}
          id={item.id}
          title={item.title}
          price={item.price}
          image={item.image}
          isWishlist={item.isWishlist}
          onPressWishList={() => {
            handleWishlist(index);
          }}
          onPressCard={navigateToProductDetails}
        />
      );
    },
    [handleWishlist],
  );

  const brands = useMemo(() => {
    const _products = [...new Set(products.map(item => item.brand))];
    return _products.map(item => {
      const splitArray = item.split(' ');
      return splitArray
        .reduce(
          (acc, value) => acc + value[0].toUpperCase() + value.slice(1) + ' ',
          '',
        )
        .trimEnd();
    });
  }, []);

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
        renderItem={({ item }) => <BrandItem name={item} />}
        showsHorizontalScrollIndicator={false}
      />

      <SectionHeader title="New Arrival" />
    </View>
  );

  return (
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
  );
};

export default Home;
