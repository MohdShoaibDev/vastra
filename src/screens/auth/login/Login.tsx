import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Feather';
import InputField from '@components/textfield/InputField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useKeyboardVisibleHook from '@hooks/useKeyboardVisibleHook';
import IconButton from '@components/buttons/IconButton';
import Header from '@components/header/Header';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';
import Loader from '@components/loader/Loader';
import { useIsFocused } from '@react-navigation/native';
import { signInWithEmailAndPassword } from '@react-native-firebase/auth';
import styles from '@screens/auth/login/style';
import auth from 'src/firebase/auth';
import { showToast } from '@utility/helperMethod';
import { commonColors } from '@utility/appColors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import { doc, getFirestore, getDoc } from '@react-native-firebase/firestore';
import { appUserDetailsHandler } from '@redux/slice/userSlice';

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const { keyboardHeight } = useKeyboardVisibleHook();
  const navigation = useAppNavigation();
  const focused = useIsFocused();
  const dispatch = useDispatch();

  const [secure, setSecure] = useState(true);
  const [remember, setRemember] = useState(false);
  const [loader, setLoader] = useState(false);

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // const { control, handleSubmit, reset } = useForm<FormData>({
  //   defaultValues: {
  //     email: 'shoaib@yopmail.com',
  //     password: 'test@123',
  //   },
  // });

  useEffect(() => {
    focused && reset();
  }, [focused]);

  const onValid = async (data: FormData) => {
    try {
      setLoader(true);
      const userCred = await signInWithEmailAndPassword(
        auth,
        data.email.toLowerCase(),
        data.password,
      );
      if (!userCred.user.uid) return;
      const userRef: any = doc(getFirestore(), 'users', userCred.user.uid);
      const user = await getDoc(userRef);
      const _data: any = user.data();
      if (!_data) return;
      dispatch(
        appUserDetailsHandler({
          email: _data.email,
          name: _data.name,
          wallet: _data.wallet,
        }),
      );
      showToast('success', 'Login Successfully');
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential') {
        showToast('error', 'Login Failed', 'Invalid email or password');
      } else {
        showToast('error', 'Error', err?.message);
      }
    } finally {
      setLoader(false);
    }
  };

  const onInvalid = (errors: any) => {
    if (errors.email) {
      showToast('error', errors.email.message || 'Email is required');
      return;
    }
    if (errors.password) {
      showToast('error', 'Password is required');
      return;
    }
  };

  const navigateToRegister = (): void => {
    navigation.navigate(ScreenNames.Register);
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.bgColor,
      }}
    >
      <KeyboardAwareScrollView
        scrollEnabled={keyboardHeight > 0}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={50}
        enableAutomaticScroll={true}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Header
          title="Sign In"
          style={styles.header}
          showCart={false}
          showBack={navigation.canGoBack()}
        />

        <View style={{ ...styles.card, backgroundColor: theme.card }}>
          <View style={styles.title}>
            <Text style={{ ...styles.welcome, color: theme.mainTextColor }}>
              Welcome
            </Text>
            <Text style={{ ...styles.welcome, color: theme.mainTextColor }}>
              to
            </Text>
            <Text style={styles.vastra}>Vastra</Text>
          </View>

          <Text style={{ ...styles.welcome, color: theme.mainTextColor }}>
            Login now!
          </Text>

          <Text style={{ ...styles.label, color: theme.mainTextColor }}>
            Email
          </Text>

          <Controller
            control={control}
            name="email"
            rules={{
              required: true,
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Please enter a valid email',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                value={value}
                placeholder="joedoe75@gmail.com"
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <View style={{ height: 10 }} />

          <Text style={{ ...styles.label, color: theme.mainTextColor }}>
            Password
          </Text>

          <Controller
            control={control}
            name="password"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                value={value}
                placeholder="Password"
                secureTextEntry={secure}
                onChangeText={onChange}
                showToggle
                onToggle={() => setSecure(!secure)}
              />
            )}
          />

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.remember}
              onPress={() => setRemember(!remember)}
            >
              <View style={styles.checkbox}>
                {remember && (
                  <Icon
                    name="check"
                    size={15}
                    color={commonColors.primaryTextColor}
                  />
                )}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgot}>Forget password?</Text>
            </TouchableOpacity>
          </View>

          <IconButton
            onPress={handleSubmit(onValid, onInvalid)}
            text="Login"
            style={styles.loginBtn}
            textStyle={styles.loginText}
          />
          {/* 
          <Text style={styles.or}>Or Sign in with</Text>

          <IconButton
            iconName="google"
            onPress={() => {}}
            text="Login with google"
            style={styles.google}
            textStyle={styles.googleText}
          /> */}

          <View style={styles.signin}>
            <Text style={{ ...styles.text1, color: theme.mainTextColor }}>
              Don't have an account?
            </Text>
            <Text onPress={navigateToRegister} style={styles.text2}>
              Register
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <Loader visible={loader} />
    </View>
  );
};

export default Login;
