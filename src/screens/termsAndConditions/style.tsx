import { getWidthRespectiveToScreen } from '@utility/helperMethod';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: getWidthRespectiveToScreen(4),
  },
  header: {
    marginBottom: 20,
  },
});
