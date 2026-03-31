import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenNames } from '@utility/screenNames';

export type RootStackParamList = {
  [ScreenNames.Home]: undefined;
  [ScreenNames.Login]: undefined;
  [ScreenNames.Register]: undefined;
  [ScreenNames.Splash]: undefined;
  [ScreenNames.ProductDetails]: { id: number };
  [ScreenNames.BottomTab]: undefined;
  [ScreenNames.Wishlist]: undefined;
  [ScreenNames.Orders]: undefined;
  [ScreenNames.Profile]: undefined;
  [ScreenNames.Cart]: undefined;
  [ScreenNames.TermsAndCondition]: undefined;
  [ScreenNames.Notifications]: undefined
};

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;
