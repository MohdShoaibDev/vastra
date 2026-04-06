import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import InputField from '@components/textfield/InputField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useKeyboardVisibleHook from '@hooks/useKeyboardVisibleHook';
import IconButton from '@components/buttons/IconButton';
import Header from '@components/header/Header';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';
import Loader from '@components/loader/Loader';
import { useIsFocused } from '@react-navigation/native';
import styles from '@screens/auth/signup/style';
import { createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import {
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from '@react-native-firebase/firestore';
import auth from 'src/firebase/auth';
import { showToast } from '@utility/helperMethod';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import { appUserDetailsHandler } from '@redux/slice/userSlice';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = () => {
  const { keyboardHeight } = useKeyboardVisibleHook();
  const navigation = useAppNavigation();
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);

  const [secure, setSecure] = useState(true);
  const [secure2, setSecure2] = useState(true);
  const [loader, setLoader] = useState(false);

  const { control, handleSubmit, getValues, reset } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    focused && reset();
  }, [focused]);

  const onValid = async (data: FormData) => {
    try {
      setLoader(true);
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email.toLowerCase(),
        data.password,
      );
      const db = getFirestore();
      await setDoc(doc(db, 'users', user.user.uid), {
        name: data.name,
        email: data.email.toLowerCase(),
        wallet: 0,
        createdAt: serverTimestamp(),
      });
      dispatch(
        appUserDetailsHandler({
          email: data.email.toLowerCase(),
          name: data.name,
          wallet: 0,
        }),
      );
      await Promise.all([
        setDoc(doc(db, 'users', user.user.uid, 'cart'), {
          createdAt: serverTimestamp(),
        }),
        setDoc(doc(db, 'users', user.user.uid, 'wishlist'), {
          createdAt: serverTimestamp(),
        }),
        setDoc(doc(db, 'users', user.user.uid, 'orders'), {
          createdAt: serverTimestamp(),
        }),
        setDoc(doc(db, 'users', user.user.uid, 'cards'), {
          createdAt: serverTimestamp(),
        }),
        setDoc(doc(db, 'users', user.user.uid, 'addresses'), {
          createdAt: serverTimestamp(),
        }),
      ]);
    } catch (err: any) {
      console.log('error in signup', err?.message);
    } finally {
      setLoader(false);
    }
  };

  const onInvalid = (errors: any) => {
    if (errors.name) {
      showToast('error', errors.name.message);
      return;
    }
    if (errors.email) {
      showToast('error', errors.email.message);
      return;
    }
    if (errors.password) {
      showToast('error', errors.password.message);
      return;
    }
    if (errors.confirmPassword) {
      showToast('error', errors.confirmPassword.message);
      return;
    }
  };

  const navigateToSignin = (): void => {
    navigation.navigate(ScreenNames.Login);
  };

  return (
    <>
      <KeyboardAwareScrollView
        style={{
          ...styles.container,
          backgroundColor: theme.bgColor,
        }}
        scrollEnabled={keyboardHeight > 0}
      >
        <Header
          title="Sign up"
          style={styles.header}
          showNotification={false}
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

          <Text style={{ ...styles.heading, color: theme.mainTextColor }}>
            Register now!
          </Text>

          {/* Full Name */}
          <Text style={{ ...styles.label, color: theme.secondaryTextColor }}>
            Full Name
          </Text>

          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Full name is required',
              minLength: {
                value: 3,
                message: 'Full name must be at least 3 characters',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                value={value}
                placeholder="Full Name"
                onChangeText={onChange}
              />
            )}
          />

          <View style={{ height: 10 }} />

          {/* Email */}
          <Text style={{ ...styles.label, color: theme.secondaryTextColor }}>
            Email
          </Text>

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Enter a valid email',
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

          {/* Password */}
          <Text style={{ ...styles.label, color: theme.secondaryTextColor }}>
            Password
          </Text>

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
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

          <View style={{ height: 10 }} />

          {/* Confirm Password */}
          <Text style={{ ...styles.label, color: theme.secondaryTextColor }}>
            Confirm Password
          </Text>

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Confirm password is required',
              validate: value =>
                value === getValues('password') || 'Passwords do not match',
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                value={value}
                placeholder="Confirm Password"
                secureTextEntry={secure2}
                onChangeText={onChange}
                showToggle
                onToggle={() => setSecure2(!secure2)}
              />
            )}
          />

          <IconButton
            onPress={handleSubmit(onValid, onInvalid)}
            text="Register"
            style={styles.loginBtn}
            textStyle={styles.loginText}
          />

          <Text style={styles.or}>Or Sign up with</Text>

          <IconButton
            iconName="google"
            onPress={() => {}}
            text="Continue with google"
            style={styles.google}
            textStyle={styles.googleText}
          />

          <View style={styles.signin}>
            <Text style={{ ...styles.text1, color: theme.secondaryTextColor }}>
              Already have an account?
            </Text>
            <Text onPress={navigateToSignin} style={styles.text2}>
              SignIn
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <Loader visible={loader} />
    </>
  );
};

export default Signup;
