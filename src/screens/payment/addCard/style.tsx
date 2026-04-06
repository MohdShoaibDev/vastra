import { commonColors } from '@utility/appColors';
import { getHeightRespectiveToScreen } from '@utility/helperMethod';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  cardView: {
    marginBottom: 20,
  },
  inputsContainer: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputHalf: {
    flex: 1,
  },
  leftGap: {
    marginRight: 8,
  },
  rightGap: {
    marginLeft: 8,
  },
  button: {
    marginTop: 30,
    height: getHeightRespectiveToScreen(6),
    backgroundColor: commonColors.primaryTextColor,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
