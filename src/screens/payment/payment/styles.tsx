// screens/styles.ts

import { StyleSheet } from 'react-native';
import { commonColors } from '@utility/appColors';
import { getHeightRespectiveToScreen } from '@utility/helperMethod';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollview: {
    paddingBottom: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: commonColors.black,
  },
  section: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    color: commonColors.black,
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
