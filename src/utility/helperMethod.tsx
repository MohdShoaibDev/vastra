import { Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';
import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

export const getHeightRespectiveToScreen = (height: number) =>
  Dimensions.get('screen').height * (height / 100);

export const getWidthRespectiveToScreen = (width: number) =>
  Dimensions.get('screen').width * (width / 100);

export const showToast = (
  type: string = 'success',
  text1: string = '',
  text2: string = '',
) => {
  Toast.show({
    type,
    text1,
    text2,
  });
};
