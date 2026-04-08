import { commonColors } from '@utility/appColors';
import {
  getHeightRespectiveToScreen,
  getWidthRespectiveToScreen,
} from '@utility/helperMethod';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: getWidthRespectiveToScreen(4),
  },
  mainImage: {
    width: getWidthRespectiveToScreen(100),
    height: 350,
    resizeMode: 'contain',
  },

  thumbnailList: {
    paddingVertical: 10,
    paddingLeft: 10,
  },

  thumbnail: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 10,
  },

  infoContainer: {
    padding: 16,
  },

  category: {
    color: commonColors.black,
    fontSize: 14,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  sizeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  sizeGuide: {
    color: commonColors.lightGray,
  },

  sizeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 10,
    gap: 10,
  },

  sizeSubContainer: {
    alignItems: 'center',
  },

  sizeBox: {
    padding: 14,
    backgroundColor: commonColors.veryLightGray,
    borderRadius: 10,
    width: 65,
    alignItems: 'center',
  },

  sizeSelected: {
    borderWidth: 1,
    borderColor: commonColors.primaryTextColor,
  },

  sizeDisabled: {
    opacity: 0.4,
  },

  sizeText: {
    fontWeight: '600',
  },

  outOfStock: {
    textAlign: 'center',
    fontSize: 10,
    color: 'red',
  },

  sizeTextSelected: {
    color: commonColors.white,
  },

  descriptionContainer: {
    padding: 16,
  },

  description: {
    marginTop: 8,
    color: commonColors.lightBlack,
    lineHeight: 20,
  },

  reviewContainer: {
    paddingHorizontal: 16,
  },

  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  viewAll: {
    color: commonColors.lightGray,
  },

  reviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },

  cartButton: {
    height: getHeightRespectiveToScreen(7),
    alignItems: 'center',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    backgroundColor: commonColors.primaryTextColor,
  },

  cartText: {
    color: commonColors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
