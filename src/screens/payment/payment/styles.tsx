// screens/styles.ts

import { StyleSheet } from 'react-native';
import { commonColors } from '@utility/appColors';
import { getHeightRespectiveToScreen, getWidthRespectiveToScreen } from '@utility/helperMethod';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getWidthRespectiveToScreen(4)
  },
  scrollview: {
    paddingBottom: 50,
  },
  header: {
    marginBottom: 20
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: commonColors.black,
  },
  section: {
    fontSize: 16,
    fontWeight: '500',
    color: commonColors.black,
  },
  addMoneyContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    gap: 4,
  },
  addMoney: {
    color: commonColors.primaryTextColor,
    fontSize: 14,
    fontWeight: '400',
  },
  notEnoughMoney: {
    fontSize: 14,
    fontWeight: '400',
  },
  addCardTouch: {
    alignSelf: 'center',
    marginTop: 20,
  },
  addCard: {
    width: 'auto',
    color: commonColors.primaryTextColor,
    fontWeight: '500',
    fontSize: 16,
  },
  summary: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
  },
  amountLabel: {
    fontSize: 14,
  },
  amount: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 5,
  },
  button: {
    marginTop: 30,
    height: getHeightRespectiveToScreen(6),
    backgroundColor: commonColors.primaryTextColor,
  },
});
