import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from '@screens/productDetails/style';
import HoodImage from '@assets/images/hood.png';
import IconButton from '@components/buttons/IconButton';
import { useStatusBarHeight } from '@hooks/useStatusBarHeight';
const image = Image.resolveAssetSource(HoodImage).uri;

const images = [image, image, image, image];

const sizes: { size: string; stock: number }[] = [
  { size: 'S', stock: 26 },
  { size: 'M', stock: 9 },
  { size: 'L', stock: 56 },
  { size: 'XL', stock: 78 },
  { size: '2XL', stock: 36 },
];

const ProductDetails = () => {
  const { statusBarHeight } = useStatusBarHeight();
  const [selectedSize, setSelectedSize] = useState('');

  const renderThumbnail = ({ item }: any) => (
    <Image source={{ uri: item }} style={styles.mainImage} />
  );

  const renderSize = (size: { size: string; stock: number }) => {
    const selected = selectedSize === size.size;
    return (
      <View style={styles.sizeSubContainer} key={size.size}>
        <TouchableOpacity
          disabled={size.stock === 0}
          style={[
            styles.sizeBox,
            selected && styles.sizeSelected,
            size.stock === 0 && styles.sizeDisabled,
          ]}
          onPress={() => setSelectedSize(size.size)}
        >
          <Text style={[styles.sizeText, selected && styles.sizeTextSelected]}>
            {size.size}
          </Text>
        </TouchableOpacity>
        {size.stock < 10 && size.stock > 0 && (
          <Text style={styles.outOfStock}>{`Only ${size.stock} stock`}</Text>
        )}
        {size.stock === 0 && (
          <Text style={styles.outOfStock}>{`Out of stock`}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={{ ...styles.container, paddingTop: statusBarHeight }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          pagingEnabled
          data={images}
          horizontal
          renderItem={renderThumbnail}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailList}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.category}>Men's Printed Pullover Hoodie</Text>

          <View style={styles.titleRow}>
            <Text style={styles.title}>Nike Club Fleece</Text>
            <Text style={styles.price}>$120</Text>
          </View>
        </View>

        <View style={styles.sizeHeader}>
          <Text style={styles.sectionTitle}>Size</Text>
          <Text style={styles.sizeGuide}>Size Guide</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.sizeContainer}>{sizes.map(renderSize)}</View>
        </ScrollView>

        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>

          <Text style={styles.description}>
            The Nike Throwback Pullover Hoodie is made from premium French terry
            fabric that blends a performance feel with classic style.
          </Text>
        </View>

        <View style={styles.reviewContainer}>
          <View style={styles.reviewHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>

          <View style={styles.reviewCard}>
            <Image
              source={{
                uri: 'https://randomuser.me/api/portraits/men/32.jpg',
              }}
              style={styles.avatar}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.reviewer}>Ronald Richards</Text>
              <Text style={styles.reviewText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </View>

            <Text style={styles.rating}>4.8 ⭐</Text>
          </View>
        </View>
      </ScrollView>

      <IconButton
        onPress={() => {}}
        text="Add to cart"
        style={styles.cartButton}
        textStyle={styles.cartText}
      />
    </View>
  );
};

export default ProductDetails;
