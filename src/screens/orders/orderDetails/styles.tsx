import { commonColors } from '@utility/appColors';
import { getWidthRespectiveToScreen } from '@utility/helperMethod';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getWidthRespectiveToScreen(4),
  },
  scrollview: {
    paddingBottom: 20,
  },
  image: {
    marginVertical: 20,
    alignSelf: 'center',
    height: 120,
    width: 100,
    borderRadius: 10,
  },
  reviewTouch: {
    alignSelf: 'center',
  },
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemQty: {
    marginTop: 4,
    color: commonColors.lightGray,
    fontSize: 12,
  },
  itemPrice: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
