import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenNames } from '@utility/screenNames';

export type RootStackParamList = {
  [ScreenNames.Home]: undefined;
  [ScreenNames.Login]: undefined;
  [ScreenNames.Register]: undefined;
  [ScreenNames.Splash]: undefined;
  [ScreenNames.ProductDetails]: { id: string };
  [ScreenNames.BottomTab]: undefined;
  [ScreenNames.Wishlist]: undefined;
  [ScreenNames.Orders]: undefined;
  [ScreenNames.Profile]: undefined;
  [ScreenNames.Cart]: undefined;
  [ScreenNames.TermsAndCondition]: undefined;
  [ScreenNames.Notifications]: undefined;
  [ScreenNames.Payment]: { amount: number };
  [ScreenNames.AddCard]: undefined;
  [ScreenNames.Addresses]: undefined;
  [ScreenNames.ManagePayment]: undefined;
  [ScreenNames.AddMoneyToWallet]: { amount: number } | undefined;
  [ScreenNames.AddAddress]: { id: number } | undefined;
  [ScreenNames.OrderDetails] = {
    orderId: string,
    productId: string,
    status: string,
  };
  [ScreenNames.Reviews]: {
    productId: string;
  };
};

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;
