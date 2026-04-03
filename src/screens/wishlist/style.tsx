import { commonColors } from '@utility/appColors';
import { getHeightRespectiveToScreen } from '@utility/helperMethod';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  hello: {
    fontSize: 28,
    fontWeight: '700',
  },

  headerTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
  },

  subtitle: {
    color: commonColors.gray,
    marginBottom: 10,
    fontSize: 16,
  },

  noDataFound: {
    marginTop: getHeightRespectiveToScreen(30),
    fontSize: 25,
    textAlign: 'center',
  },
});
