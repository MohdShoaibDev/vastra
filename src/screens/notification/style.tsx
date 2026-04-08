import { getHeightRespectiveToScreen, getWidthRespectiveToScreen } from '@utility/helperMethod';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getWidthRespectiveToScreen(4),
  },
  header: {
    marginBottom: 20,
  },
  noNotificationText: {
    marginTop: getHeightRespectiveToScreen(30),
    fontSize: 22,
    textAlign: 'center',
  },
});
