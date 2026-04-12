import { getWidthRespectiveToScreen } from '@utility/helperMethod';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getWidthRespectiveToScreen(4),
  },
  header: {
    marginBottom: 20,
  },
  flashlist: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 25,
  },
});
