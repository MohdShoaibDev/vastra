import { StyleSheet } from 'react-native';

import {
  getHeightRespectiveToScreen,
  getWidthRespectiveToScreen,
} from '@utility/helperMethod';
import { commonColors } from '@utility/appColors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  bgImage: {
    position: 'absolute',
    height: getHeightRespectiveToScreen(100),
    width: getWidthRespectiveToScreen(100),
  },

  logoContainer: {
    alignItems: 'center',
  },

  appName: {
    fontSize: 42,
    fontWeight: '700',
    color: '#4A80F0',
    marginTop: getHeightRespectiveToScreen(55),
  },

  tagline: {
    fontSize: 16,
    color: commonColors.gray,
    marginTop: 8,
  },

  footer: {
    position: 'absolute',
    bottom: getHeightRespectiveToScreen(2),
  },

  footerText: {
    color: commonColors.lightGray,
    fontSize: 14,
  },

  google: {
    position: 'absolute',
    bottom: getHeightRespectiveToScreen(6),
    height: getHeightRespectiveToScreen(7),
    width: getWidthRespectiveToScreen(85),
    backgroundColor: commonColors.primaryTextColor,
  },

  googleText: {
    color: commonColors.white,
  },
});
