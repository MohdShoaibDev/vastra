import React, { useCallback, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import styles from '@screens/reviews/styles';
import { FlashList } from '@shopify/flash-list';
import Header from '@components/header/Header';
import ReviewCard, { ReviewCardProps } from '@components/review/ReviewCard';
import Loader from '@components/loader/Loader';
import {
  collection,
  getDocs,
  getFirestore,
} from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';

const Reviews = () => {
  const { productId } = useRoute().params;
  const [reviews, setReviews] = useState<ReviewCardProps[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllReviews();
  }, []);

  const getAllReviews = async () => {
    try {
      setLoading(true);
      const reviewsRef = collection(
        getFirestore(),
        'products',
        productId,
        'reviews',
      );
      const snapshot = await getDocs(reviewsRef);
      const allReviews = snapshot.docs.map((doc: any) => doc.data());
      setReviews(allReviews);
    } catch (err: any) {
      console.log('error in getting all reviews', err?.message);
    } finally {
      setLoading(false);
    }
  };

  const ListHeader = useCallback(
    () => <Header title="All Reviews" style={styles.header} />,
    [],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: ReviewCardProps; index: number }) => (
      <ReviewCard name={item.name} review={item.review} rating={item.rating} />
    ),
    [],
  );
  return (
    <>
      <View style={styles.container}>
        {reviews && (
          <FlashList
            data={reviews}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={<ListHeader />}
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={styles.flashlist}
            contentContainerStyle={styles.contentContainerStyle}
          />
        )}
      </View>
      <Loader visible={loading} />
    </>
  );
};

export default Reviews;
