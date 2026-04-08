import { commonColors } from '@utility/appColors';
import { getHeightRespectiveToScreen } from '@utility/helperMethod';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    marginBottom: 20,
  },

  noDataFound: {
    marginTop: getHeightRespectiveToScreen(30),
    fontSize: 25,
    textAlign: 'center',
  },
});
