import { useEffect, useState } from 'react';
import { NativeModules, Platform, StatusBar } from 'react-native';

export const useStatusBarHeight = () => {
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const { StatusBarManager } = NativeModules;
  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((statusBarFrameData: { height: number }) => {
        setStatusBarHeight(statusBarFrameData.height + 10);
      });
    } else {
      setStatusBarHeight((StatusBar.currentHeight || 0) + 10);
    }
  }, []);
  return { statusBarHeight };
};
