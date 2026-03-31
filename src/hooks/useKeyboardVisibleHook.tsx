import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardVisibleHook = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', keyboard => {
      setKeyboardHeight(keyboard.endCoordinates.height);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return { keyboardHeight };
};

export default useKeyboardVisibleHook;
