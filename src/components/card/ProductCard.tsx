import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import { commonColors } from '@utility/appColors';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import { Product } from 'src/types/product';

interface ProductCardProps {
  index: number;
  item: Product;
  onPressWishList: (isWishlist: boolean, item: Product) => void;
  isWishlist?: boolean;
  onPressCard?: (id: string) => void;
}

const AnimatedFeather = Animated.createAnimatedComponent(Feather);

const ProductCard: React.FC<ProductCardProps> = ({
  index,
  item,
  onPressWishList = () => {},
  isWishlist = false,
  onPressCard = () => {},
}) => {
  const theme = useSelector((state: RootState) => state.theme);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const wishlistHandler = () => {
    scale.value = 1.4;
    scale.value = withSpring(1);
    if (onPressWishList) {
      onPressWishList(isWishlist, item);
    }
  };

  const onPressCardHandler = () => {
    if (onPressCard) {
      onPressCard(item.id);
    }
  };

  return (
    <View
      style={{
        ...styles.card,
        marginRight: index % 2 === 0 ? 5 : 0,
        marginLeft: index % 2 === 1 ? 5 : 0,
        backgroundColor: theme.card,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.container}
        onPress={onPressCardHandler}
      >
        <FastImage
          source={{ uri: item.image, priority: FastImage.priority.high }}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.heart}
          onPress={wishlistHandler}
        >
          <AnimatedFeather
            name="heart"
            size={18}
            color={isWishlist ? commonColors.red : commonColors.lightGray}
            style={animatedStyle}
          />
        </TouchableOpacity>

        <Text
          style={{ ...styles.title, color: theme.secondaryTextColor }}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <Text style={{ ...styles.price, color: theme.mainTextColor }}>
          ${item.price}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(ProductCard);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 8,
    marginBottom: 10,
    height: 280,
    borderRadius: 10,
  },

  container: {
    flex: 1,
  },

  image: {
    width: '100%',
    height: 200,
    borderRadius: 14,
  },

  heart: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  title: {
    marginTop: 8,
    fontSize: 14,
  },

  price: {
    fontWeight: '700',
    marginTop: 4,
    fontSize: 16,
  },
});
