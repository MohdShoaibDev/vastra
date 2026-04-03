import { StyleSheet } from 'react-native';
import { commonColors } from '@utility/appColors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    backgroundColor: commonColors.transparent,
  },

  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7,
  },

  card: {
    marginTop: 30,
    borderRadius: 25,
    padding: 25,
  },

  welcome: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
  },

  vastra: {
    fontSize: 22,
    fontWeight: '600',
    color: commonColors.primaryTextColor,
  },

  heading: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
    marginBottom: 20,
  },

  label: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '400',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
  },

  remember: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: commonColors.veryLightGray,
    marginRight: 8,
  },

  checked: {
    backgroundColor: commonColors.primaryTextColor,
  },

  rememberText: {
    fontSize: 13,
    color: commonColors.lightGray,
  },

  forgot: {
    color: commonColors.primaryTextColor,
    fontSize: 13,
  },

  loginBtn: {
    backgroundColor: commonColors.primaryTextColor,
    height: 50,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  loginText: {
    color: commonColors.white,
    fontWeight: '600',
    fontSize: 16,
  },

  or: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#777',
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  socialBtn: {
    width: 50,
    height: 50,
    backgroundColor: commonColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },

  google: {
    borderWidth: 1,
    borderColor: commonColors.primaryTextColor,
  },

  googleText: {
    color: commonColors.primaryTextColor,
  },

  signin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    gap: 4,
  },

  text1: {
    color: commonColors.black,
    fontSize: 14,
  },

  text2: {
    color: commonColors.primaryTextColor,
    fontSize: 14,
    fontWeight: '600',
  },
});
