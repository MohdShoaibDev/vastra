import { RootState } from '@redux/store/store';
import { commonColors } from '@utility/appColors';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import Icon from '@assets/icons/user.png';

export interface ReviewCardProps {
  name: string;
  review?: string;
  rating: number;
}

const userIcon = Image.resolveAssetSource(Icon).uri;

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  review = '',
  rating,
}) => {
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <View style={{ ...styles.reviewCard, backgroundColor: theme.card }}>
      <FastImage
        source={{
          uri: userIcon,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.avatar}
      />

      <View style={{ flex: 1 }}>
        <Text
          style={{
            ...styles.reviewer,
            color: theme.secondaryTextColor,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            ...styles.reviewText,
            color: theme.secondaryTextColor,
          }}
        >
          {review}
        </Text>
      </View>

      <Text style={{ ...styles.rating, color: theme.mainTextColor }}>
        {rating} ⭐
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 16,
    borderRadius: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  reviewer: {
    fontWeight: '600',
  },

  reviewText: {
    color: commonColors.lightBlack,
    fontSize: 13,
  },

  rating: {
    fontWeight: 'bold',
  },
});

export default ReviewCard;
