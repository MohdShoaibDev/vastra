import { commonColors } from '@utility/appColors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  topSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  hello: {
    fontSize: 28,
    fontWeight: '700',
  },

  cartTouch: {
    position: 'relative',
  },

  dot: {
    position: 'absolute',
    right: 0,
    top: -7,
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: commonColors.primaryTextColor,
  },

  subtitle: {
    color: commonColors.gray,
    fontSize: 16,
  },
});
