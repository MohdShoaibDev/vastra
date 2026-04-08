import { commonColors } from '@utility/appColors';
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  type: {
    borderColor: commonColors.lightGray,
    borderRadius: 8,
  },
  active: {
    backgroundColor: commonColors.primaryTextColor,
    borderColor: commonColors.primaryTextColor,
    color: commonColors.white,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  toggle: {},
  toggleText: {
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    backgroundColor: commonColors.primaryTextColor,
    padding: 15,
    borderRadius: 10,
    height: 55,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
