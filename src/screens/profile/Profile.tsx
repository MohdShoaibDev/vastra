import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '@screens/profile/style';
import FastImage from 'react-native-fast-image';
import { commonColors } from '@utility/appColors';
import useAppNavigation from '@hooks/useAppNavigation';
import { ScreenNames } from '@utility/screenNames';
import { signOut } from '@react-native-firebase/auth';
import auth from 'src/firebase/auth';
import { showToast, storage } from '@utility/helperMethod';
import ThemeModal from '@components/modal/ThemeModal';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

const settingsData = [
  { id: '1', title: 'Orders', icon: 'bag-outline' },
  { id: '5', title: 'Notifications', icon: 'notifications-outline' },
  { id: '6', title: 'Theme', icon: 'sunny-outline', rightText: 'Light' },
  { id: '7', title: 'Terms & Conditions', icon: 'document-text-outline' },
  { id: '10', title: 'Logout', icon: 'log-out-outline' },
];

const ProfileHeader = memo(({ theme }: RootState) => (
  <>
    <View style={styles.header}>
      <Text style={{ ...styles.headerTitle, color: theme.mainTextColor }}>
        Profile
      </Text>
    </View>

    <View style={styles.profileSection}>
      <View style={styles.imageWrapper}>
        <FastImage
          source={{
            uri: 'https://picsum.photos/id/237',
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.image}
        />

        <TouchableOpacity style={styles.editBtn}>
          <Icon
            name="create-outline"
            size={14}
            color={commonColors.primaryTextColor}
          />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ ...styles.name, color: theme.mainTextColor }}>
        Mohd Shoaib
      </Text>
    </View>

    <Text style={{ ...styles.sectionTitle, color: theme.mainTextColor }}>
      Settings
    </Text>
  </>
));

const Profile = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const navigation = useAppNavigation();
  const [showThemeModal, setShowThemeModal] = useState(false);
  const navigationHandler = (name: string) => {
    navigation.navigate(name);
  };

  const logouthandler = async () => {
    try {
      await signOut(auth);
      showToast('success', 'Logout Successfully');
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  const showLogoutAlert = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logouthandler();
          },
        },
      ],
      { cancelable: true },
    );
  };

  const themeModalHandler = () => {
    setShowThemeModal(value => !value);
  };

  const tabHandler = (id: string) => {
    switch (id) {
      case 'Orders':
        navigationHandler(ScreenNames.Orders);
        break;
      case 'Notifications':
        navigationHandler(ScreenNames.Notifications);
        break;
      case 'Theme':
        themeModalHandler();
        break;
      case 'Terms & Conditions':
        navigationHandler(ScreenNames.TermsAndCondition);
        break;
      default:
        showLogoutAlert();
    }
  };

  const subComponentRender = (item: any) => {
    if (item.name === 'Theme') {
      const _theme = storage.getString('theme');
      if (!_theme) return null;
      return (
        <Text style={{ ...styles.rightText, color: theme.mainTextColor }}>
          {_theme[0]?.toUpperCase() + _theme?.slice(1)}
        </Text>
      );
    }
    return null;
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={{ ...styles.row, backgroundColor: theme.card }}
      onPress={() => {
        tabHandler(item?.title);
      }}
    >
      <View style={styles.rowLeft}>
        <View
          style={{ ...styles.iconContainer, backgroundColor: theme.bgColor }}
        >
          <Icon name={item.icon} size={20} color={theme.primaryIconColor} />
        </View>
        <Text style={{ ...styles.rowText, color: theme.mainTextColor }}>
          {item.title}
        </Text>
      </View>

      <View style={styles.rowRight}>
        {item.rightText && subComponentRender(item)}
        <Icon name="chevron-forward" size={20} color={theme.primaryIconColor} />
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={{ ...styles.container, backgroundColor: theme.bgColor }}>
        <FlatList
          data={settingsData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={<ProfileHeader theme={theme} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
      {showThemeModal && (
        <ThemeModal visible={showThemeModal} onClose={themeModalHandler} />
      )}
    </>
  );
};

export default Profile;
