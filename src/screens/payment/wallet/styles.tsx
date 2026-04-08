import { commonColors } from '@utility/appColors';
import { getHeightRespectiveToScreen } from '@utility/helperMethod';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderColor: commonColors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 55,
  },
  currency: {
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  note: {
    marginTop: 5,
  },
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    gap: 10,
  },
  presetButton: {
    borderWidth: 1,
    borderColor: commonColors.primaryTextColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  presetText: {
    color: commonColors.primaryTextColor,
    fontWeight: '500',
  },
  textBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 5,
  },
  noCardText: {
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    marginTop: 40,
    backgroundColor: commonColors.primaryTextColor,
    height: getHeightRespectiveToScreen(6),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: commonColors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
