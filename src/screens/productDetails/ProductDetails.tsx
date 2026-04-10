import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from '@screens/productDetails/style';
import IconButton from '@components/buttons/IconButton';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import Header from '@components/header/Header';
import Loader from '@components/loader/Loader';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
} from '@react-native-firebase/firestore';
import { Product } from 'src/types/product';
import { useRoute } from '@react-navigation/native';
import { showToast } from '@utility/helperMethod';
import auth from 'src/firebase/auth';
import { commonColors } from '@utility/appColors';
import ReviewCard, { ReviewCardProps } from '@components/review/ReviewCard';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';
const sizes = ['s', 'm', 'l', 'xl', '2xl', '3xl'];

const ProductDetails = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const { id } = useRoute().params;
  const navigation = useAppNavigation();
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [productInCartData, setProductInCartData] = useState<any>({
    quantity: 0,
  });
  const [reviews, setReviews] = useState<ReviewCardProps[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProductDetails(),
      getProductFromCart(),
      getReviewList(),
    ]).finally(() => {
      setLoading(false);
    });
  }, []);

  const getProductDetails = async () => {
    try {
      const snapshot = await getDoc(doc(getFirestore(), 'products', id));
      if (snapshot.exists()) {
        setProductDetails(snapshot.data() as Product);
      }
    } catch (err: any) {
      console.log('error in getting product details', err?.message);
    }
  };

  const getProductFromCart = async () => {
    try {
      if (!auth.currentUser) return;
      const snapshot = await getDoc(
        doc(getFirestore(), 'users', auth.currentUser.uid, 'cart', id),
      );
      if (snapshot.exists()) {
        setProductInCartData(snapshot.data());
      } else {
        setProductInCartData({ quantity: 0 });
      }
    } catch (err: any) {
      console.log('error in getting product details', err?.message);
    }
  };

  const getReviewList = async () => {
    try {
      const snapshot = await getDocs(
        collection(getFirestore(), 'products', id, 'reviews'),
      );
      if (snapshot.docs) {
        const data = snapshot.docs?.map((doc: any) => ({ ...doc?.data() }));
        setReviews(data);
      }
    } catch (err: any) {
      console.log('error in getting product reviews', err?.message);
    }
  };

  const renderThumbnail = ({ item }: any) => (
    <Image source={{ uri: item }} style={styles.mainImage} />
  );

  const renderSize = (size: string, stock: number) => {
    const selected = selectedSize === size;
    return (
      <View style={styles.sizeSubContainer} key={size}>
        <TouchableOpacity
          disabled={stock === 0}
          style={[
            styles.sizeBox,
            selected && styles.sizeSelected,
            stock === 0 && styles.sizeDisabled,
            { backgroundColor: theme.card },
          ]}
          onPress={() => setSelectedSize(size)}
        >
          <Text
            style={[
              styles.sizeText,
              selected && styles.sizeTextSelected,
              { color: theme.mainTextColor },
            ]}
          >
            {size.toUpperCase()}
          </Text>
        </TouchableOpacity>
        {stock < 10 && stock > 0 && (
          <Text style={styles.outOfStock}>{`Only ${stock} stock`}</Text>
        )}
        {stock === 0 && <Text style={styles.outOfStock}>{`Out of stock`}</Text>}
      </View>
    );
  };

  const productCartHandler = async () => {
    try {
      setLoading(true);
      if (!selectedSize && productInCartData.quantity === 0) {
        showToast('info', 'Please select your size!.');
        return;
      }
      if (!auth.currentUser) return;
      const cartRef = doc(
        getFirestore(),
        'users',
        auth.currentUser.uid,
        'cart',
        id,
      );
      if (productInCartData.quantity === 0) {
        await setDoc(cartRef, {
          name: productDetails?.title,
          price: productDetails?.price,
          description: productDetails?.description,
          image: productDetails?.image || '',
          sizes: productDetails?.size,
          size: selectedSize,
          quantity: 1,
          createdAt: serverTimestamp(),
          maxPurchasedAtOnce: productDetails?.maxPurchasedAtOnce || 10,
        });
        setProductInCartData({ quantity: 1 });
      } else {
        await deleteDoc(cartRef);
        setProductInCartData({ quantity: 0 });
      }
    } catch (err: any) {
      showToast('error', 'Something went wrong');
      console.log('error in adding product to cart', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSizes = () => {
    if (!productDetails) return null;

    const requiredSizes = sizes.filter(key => {
      return productDetails.size?.[key] > 0;
    });

    return requiredSizes.map(size => {
      const stock = productDetails.size?.[size];
      return renderSize(size, stock);
    });
  };

  const navigateToReviewsScreen = () => {
    navigation.navigate(ScreenNames.Reviews, {
      productId: id,
    });
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.bgColor,
      }}
    >
      {productDetails && (
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <Header title="" style={styles.header} />
          <FlatList
            pagingEnabled
            data={[1, 2, 3].map(_ => productDetails.image)}
            horizontal
            renderItem={renderThumbnail}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailList}
          />

          <View style={styles.infoContainer}>
            <View style={styles.titleRow}>
              <Text style={{ ...styles.title, color: theme.mainTextColor }}>
                {productDetails.title}
              </Text>
              <Text style={{ ...styles.price, color: theme.mainTextColor }}>
                {'$' + productDetails.price}
              </Text>
            </View>
          </View>

          <View style={styles.sizeHeader}>
            <Text
              style={{
                ...styles.sectionTitle,
                color: theme.secondaryTextColor,
              }}
            >
              Size
            </Text>
            <Text style={styles.sizeGuide}>Size Guide</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.sizeContainer}>{handleSizes()}</View>
          </ScrollView>

          <View style={styles.descriptionContainer}>
            <Text
              style={{ ...styles.sectionTitle, color: theme.mainTextColor }}
            >
              Description
            </Text>

            <Text
              style={{ ...styles.description, color: theme.secondaryTextColor }}
            >
              {productDetails.description}
            </Text>
          </View>

          {Array.isArray(reviews) && reviews.length > 0 && (
            <View style={styles.reviewContainer}>
              <View style={styles.reviewHeader}>
                <Text
                  style={{ ...styles.sectionTitle, color: theme.mainTextColor }}
                >
                  Reviews
                </Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={navigateToReviewsScreen}
                >
                  <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
              </View>

              <ReviewCard
                name={reviews[0].name}
                review={reviews[0].review}
                rating={reviews[0].rating}
              />
            </View>
          )}

          {productDetails.reviewCount === 0 && (
            <Text
              style={{ ...styles.noReviewText, color: theme.mainTextColor }}
            >
              No Review
            </Text>
          )}
        </ScrollView>
      )}

      {productDetails && (
        <IconButton
          onPress={productCartHandler}
          text={
            productInCartData.quantity > 0 ? 'Remove from cart' : 'Add to cart'
          }
          style={{
            ...styles.cartButton,
            backgroundColor:
              productInCartData.quantity > 0
                ? commonColors.red
                : commonColors.primaryTextColor,
          }}
          textStyle={styles.cartText}
        />
      )}
      <Loader visible={loading} />
    </View>
  );
};

export default ProductDetails;
