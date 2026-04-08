import { commonColors } from '@utility/appColors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  headerTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
  },

  logout: {
    color: 'red',
    fontSize: 16,
  },

  profileSection: {
    alignItems: 'center',
  },

  imageWrapper: {
    alignItems: 'center',
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  editText: {
    marginLeft: 4,
    color: commonColors.primaryTextColor,
    fontSize: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
  },

  id: {
    color: commonColors.lightGray,
    marginTop: 4,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3C623',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },

  sectionTitle: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 12,
  },

  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  rowText: {
    fontSize: 15,
  },

  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rightText: {
    marginRight: 6,
    color: commonColors.lightGray,
  },

  separator: {
    height: 10,
  },
});
