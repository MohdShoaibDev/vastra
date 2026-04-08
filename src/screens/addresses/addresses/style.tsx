import { commonColors } from '@utility/appColors';
import {
  getHeightRespectiveToScreen,
  getWidthRespectiveToScreen,
} from '@utility/helperMethod';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: getWidthRespectiveToScreen(4),
  },
  scrollview: {
    paddingBottom: 20,
  },
  header: {
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: commonColors.primaryTextColor,
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },

  plus: {
    fontSize: 18,
    color: commonColors.white,
    marginRight: 8,
  },

  addText: {
    fontSize: 16,
    color: commonColors.white,
    fontWeight: '500',
  },

  addressCard: {
    marginBottom: 15,
  },

  noAddressText: {
    marginTop: getHeightRespectiveToScreen(25),
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
  },
});
