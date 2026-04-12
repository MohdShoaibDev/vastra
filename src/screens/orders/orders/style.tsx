import { commonColors } from '@utility/appColors';
import {
  getHeightRespectiveToScreen,
  getWidthRespectiveToScreen,
} from '@utility/helperMethod';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getWidthRespectiveToScreen(4),
  },

  header: {
    marginBottom: 10,
  },

  topSection: {
    marginBottom: 10,
  },

  tabsContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  activeTab: {
    backgroundColor: commonColors.primaryTextColor,
  },

  tabText: {
    color: commonColors.lightGray,
    fontWeight: '500',
  },

  activeTabText: {
    color: commonColors.white,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  noOrdersText: {
    marginTop: getHeightRespectiveToScreen(25),
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
  },
});
