/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import strings from '@localization/Localization';
import {useDrawerStatus} from '@react-navigation/drawer';
import {backBtn, logoutBtn} from '@src/assets/images';
import {TextStyles} from '@styles';
import {Sizes, width} from '@theme';
import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  ScrollView,
  StyleSheet,
  // Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getVersion} from 'react-native-device-info';
import {Avatar} from 'react-native-elements';
import SafeArea from 'react-native-safe-area';
import {Switch} from 'react-native-switch';
import DrawerItem from './components/DrawerItem';

const USER_IMAGE = 'https://placeimg.com/140/140/any';
const IS_ONLINE = true;

const DrawerItems = [
  {
    image: '@assets/images/live_chat_btn.png',
    title: strings.liveChat,
    localizedKey: 'liveChat',
    route: 'HomeNavigator',
  },
  {
    image: '@assets/images/settings_btn.png',
    title: strings.settings,
    localizedKey: 'settings',
    route: 'SettingsNavigator',
  },
];

const AppDrawerView = props => {
  //
  const {
    authStore,
    langStore: {lang},
    navigation,
  } = props;
  const isDrawerOpen = useDrawerStatus();
  const [drawerItems, setDrawerItems] = useState(DrawerItems);
  const [isOnline, setIsOnline] = useState(IS_ONLINE);
  const [safeAreaInset, setSafeAreaInset] = useState({top: 0, bottom: 0});
  const {user} = authStore;

  useEffect(() => {
    setupAuth();
    SafeArea.getSafeAreaInsetsForRootView().then(result => {
      setSafeAreaInset({
        top: result.safeAreaInsets.top,
        bottom: result.safeAreaInsets.bottom,
      });
    });
  }, []);

  useEffect(() => {
    // console.log('AppDrawerView');
    // console.log(lang);
    let temp = drawerItems;
    let index = 0;
    for (item of temp) {
      const {localizedKey} = item;
      temp[index] = {
        ...item,
        title: strings.getString(localizedKey),
      };
      index++;
    }
    setDrawerItems(temp);
  }, [lang]);

  useEffect(() => {
    if (isDrawerOpen === 'open') {
      Keyboard.dismiss();
    }
  }, [isDrawerOpen]);

  const setupAuth = async () => {
    await authStore.onLoad();
  };

  const onClose = () => {
    navigation.closeDrawer();
  };

  const onOnlineSwitch = () => {
    setIsOnline(!isOnline);
  };

  const onLogout = () => {
    authStore.logout();
    navigation.navigate('AuthNavigator', {
      screen: 'Login',
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} resizeMode="cover">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: safeAreaInset.top,
          }}>
          <TouchableOpacity onPress={onClose}>
            <Image
              style={styles.closeBtn}
              source={backBtn}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: Sizes.margin.normal,
            }}>
            <Text style={{...styles.subTitle, fontSize: 12}}>
              {isOnline ? strings.online : strings.offline}
            </Text>
            <Switch
              style={styles.switch}
              activeText={''}
              inActiveText={''}
              backgroundActive={'#FFFFFF'}
              backgroundInactive={'#FFFFFF'}
              circleActiveColor={'#2198FA'}
              circleInActiveColor={'#CCCCCC'}
              innerCircleStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{scaleX: 0.7}, {scaleY: 0.7}],
              }}
              circleSize={20}
              circleBorderWidth={0}
              switchLeftPx={4}
              switchRightPx={4}
              onValueChange={onOnlineSwitch}
              value={isOnline}
            />
          </View>
        </View>
        <View style={styles.center}>
          <ScrollView>
            <View style={styles.top}>
              <View style={styles.avatar}>
                <Avatar
                  rounded
                  source={{
                    uri: USER_IMAGE,
                  }}
                  size="large"
                />
              </View>
              <View style={styles.profile}>
                <View style={styles.profileTop}>
                  <View style={styles.status}></View>
                  <Text style={styles.title}>{user ? user.username : ''}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: Sizes.margin.normal,
                  }}>
                  <Text style={{...styles.text, fontSize: 12}}>
                    {user ? user.email : ''}
                  </Text>
                </View>
              </View>
            </View>
            {drawerItems.map((item, index) => {
              return (
                <DrawerItem
                  {...item}
                  key={index}
                  onPress={() => {
                    const {route} = item;
                    if (route) {
                      navigation.navigate(route);
                    }
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            ...styles.bottom,
            marginBottom: safeAreaInset.bottom + Sizes.margin.small,
          }}>
          <TouchableOpacity onPress={onLogout}>
            <Image
              style={styles.logoutBtn}
              source={logoutBtn}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.text}>v {getVersion()}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

AppDrawerView.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  top: {
    marginVertical: Sizes.margin.huge,
    alignSelf: 'center',
  },
  closeBtn: {
    width: 16,
    height: 16,
    margin: Sizes.margin.normal,
  },
  switch: {
    marginHorizontal: Sizes.margin.normal,
    paddingHorizontal: Sizes.margin.normal,
    // transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
  },
  avatar: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  profile: {
    flexDirection: 'column',
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Sizes.margin.normal,
  },
  status: {
    backgroundColor: '#26CCA4',
    marginHorizontal: Sizes.margin.small,
    width: 8,
    height: 8,
    borderRadius: 16,
  },
  center: {
    flex: 3,
  },
  bottom: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: Sizes.margin.normal,
  },
  logoutBtn: {
    alignSelf: 'center',
    margin: Sizes.margin.normal,
    height: width * 0.5 * 0.2,
    width: width * 0.5,
  },
  title: {
    ...TextStyles.manrope.title,
    color: '#FFF',
  },
  subTitle: {
    ...TextStyles.roboto.subTitle,
    marginHorizontal: Sizes.margin.small,
    color: '#FFF',
  },
  text: {
    ...TextStyles.manrope.text,
    color: '#FFF',
  },
});

export default inject('authStore', 'langStore')(observer(AppDrawerView));
