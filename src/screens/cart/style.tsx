import { commonColors } from '@utility/appColors';
import {
  getHeightRespectiveToScreen,
  getWidthRespectiveToScreen,
} from '@utility/helperMethod';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: getWidthRespectiveToScreen(5),
  },
  scrollview: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  headerTitle: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
  },
  deliveryBox: {
    marginTop: 30,
  },
  deliveryTitle: {
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  deliveryText: {
    color: commonColors.gray,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderTopWidth: 1,
    borderColor: commonColors.veryLightGray,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 18,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  nextBtn: {
    marginTop: 20,
    backgroundColor: commonColors.primaryTextColor,
    alignItems: 'center',
  },
  nextText: {
    color: commonColors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  noDataFound: {
    marginTop: getHeightRespectiveToScreen(30),
    fontSize: 25,
    textAlign: 'center',
  },
});
