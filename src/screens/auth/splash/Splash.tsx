import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import SplashImage from '@assets/images/splash.png';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';
import styles from '@screens/auth/splash/style';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

const Splash = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const navigation = useAppNavigation();
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowBtn(true);
    }, 2500);
  }, []);

  const navigateToSgnup = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenNames.Login }],
    });
  };

  return (
    <View style={{ ...styles.container, backgroundColor: theme.bgColor }}>
      <FastImage
        source={{
          uri: Image.resolveAssetSource(SplashImage).uri,
          priority: FastImage.priority.high,
        }}
        style={styles.bgImage}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.logoContainer}>
        <Text style={styles.appName}>Vastra</Text>
        <Text style={styles.tagline}>Your Fashion Companion</Text>
      </View>
      {/* 
      {showBtn && (
        <IconButton
          onPress={navigateToSgnup}
          text="Get Started"
          style={styles.google}
          textStyle={styles.googleText}
        />
      )} */}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Style • Fashion • Clothes</Text>
      </View>
    </View>
  );
};

export default Splash;
