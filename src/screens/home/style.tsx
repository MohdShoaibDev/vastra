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

  subtitle: {
    color: commonColors.gray,
    fontSize: 16,
  },
});
