import { getWidthRespectiveToScreen } from '@utility/helperMethod';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getWidthRespectiveToScreen(4)
  },

  scrollview:{
    paddingBottom: 50
  },

  // Wallet
  walletCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
  },
  walletTitle: {
    fontSize: 14,
  },
  walletAmount: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 5,
  },
  addMoneyBtn: {
    marginTop: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  addMoneyText: {
    color: '#fff',
    fontWeight: '500',
  },

  // Cards
  sectionHeader: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  addCardText: {
    color: '#007AFF',
    fontWeight: '600',
  },

  emptyText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'gray',
  },
});
