const { StyleSheet } = require('react-native');
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
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
  },

  welcome: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: commonColors.black,
  },

  vastra: {
    fontSize: 22,
    fontWeight: '600',
    color: '#3B82F6',
  },

  heading: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
    marginBottom: 20,
    color: commonColors.black,
  },

  label: {
    marginTop: 10,
    fontSize: 14,
    color: commonColors.black,
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
    borderColor: '#999',
    marginRight: 8,
  },

  checked: {
    backgroundColor: '#3B82F6',
  },

  rememberText: {
    fontSize: 13,
    color: '#666',
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
    color: '#fff',
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
    backgroundColor: '#F1F3F6',
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
