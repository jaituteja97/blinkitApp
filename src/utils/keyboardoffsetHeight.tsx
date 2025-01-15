import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardOffsetHeight = () => {
  const [keyBoardHeight, setKeyBoardHeight] = useState(0);

  useEffect(() => {
    const keyBoardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyBoardHeight(e.endCoordinates.height);
    });

    const keyBoardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyBoardHeight(0);
    });

    const keyBoardWillShowListener = Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyBoardHeight(e.endCoordinates.height);
    });

    const keyBoardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyBoardHeight(0); 
    });

    // Cleanup listeners on unmount
    return () => {
      keyBoardDidShowListener.remove();
      keyBoardDidHideListener.remove();
      keyBoardWillShowListener.remove();
      keyBoardWillHideListener.remove();
    };
  }, []);

  return keyBoardHeight;
};

export default useKeyboardOffsetHeight;
