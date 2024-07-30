/* eslint-disable react/no-unstable-nested-components */
// import { useTheme } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackLeftNav} from '@components';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddTagScreen from '@screens/AddTagScreen';
import CameraRollScreen from '@screens/CameraRollScreen';
import {CameraRollLeftNav} from '@screens/CameraRollScreen/components';
import CameraScreen from '@screens/CameraScreen';
import ChatListScreen from '@screens/ChatListScreen';
import {
  ChatListLeftNav,
  ChatListRightNav,
} from '@screens/ChatListScreen/components';
import ChatRoomAboutScreen from '@screens/ChatRoomAboutScreen';
import ChatRoomScreen from '@screens/ChatRoomScreen';
import {
  ChatRoomLeftNav,
  ChatRoomRightNav,
} from '@screens/ChatRoomScreen/components';
import ForgetPwdSuccessScreen from '@screens/ForgetPwdSuccessScreen';
import ForgotPwdScreen from '@screens/ForgotPwdScreen';
import LoginScreen from '@screens/LoginScreen';
import NewContactScreen from '@screens/NewContactScreen';
import NotesScreen from '@screens/NotesScreen';
import NotificationsScreen from '@screens/NotificationsScreen';
import SettingsScreen from '@screens/SettingsScreen';
import {SettingsLeftNav} from '@screens/SettingsScreen/components';
import SplashScreen from '@screens/SplashScreen';
import React from 'react';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name={'Splash'}
          component={SplashScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'Login'}
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'ForgotPassword'}
          component={ForgotPwdScreen}
        />
        <Stack.Screen
          options={{headerShown: false, gestureEnabled: false}}
          name={'ForgotPasswordSuccess'}
          component={ForgetPwdSuccessScreen}
        />
        <Stack.Screen
          options={({route, navigation}) => ({
            headerShadowVisible: false,
            headerLeft: () => (
              <ChatListLeftNav route={route} navigation={navigation} />
            ),
            headerRight: () => (
              <ChatListRightNav route={route} navigation={navigation} />
            ),
          })}
          name={'ChatList'}
          component={ChatListScreen}
        />
        <Stack.Screen
          options={({route, navigation}) => ({
            headerShadowVisible: false,
            headerLeft: () => (
              <ChatRoomLeftNav route={route} navigation={navigation} />
            ),
            headerRight: () => <ChatRoomRightNav />,
          })}
          name={'ChatRoom'}
          component={ChatRoomScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={'Camera'}
          component={CameraScreen}
        />
        <Stack.Screen
          options={({route, navigation}) => ({
            headerShadowVisible: false,
            headerLeft: () => (
              <CameraRollLeftNav route={route} navigation={navigation} />
            ),
          })}
          name={'CameraRoll'}
          component={CameraRollScreen}
        />
        <Stack.Screen
          options={({route, navigation}) => ({
            headerShadowVisible: false,
            headerLeft: () => (
              <BackLeftNav route={route} navigation={navigation} />
            ),
          })}
          name={'ChatRoomAbout'}
          component={ChatRoomAboutScreen}
        />
        <Stack.Screen
          options={({route, navigation}) => ({
            headerShadowVisible: false,
            headerLeft: () => (
              <BackLeftNav route={route} navigation={navigation} />
            ),
          })}
          name={'Notes'}
          component={NotesScreen}
        />
        <Stack.Screen
          options={({route, navigation}) => ({
            headerShadowVisible: false,
            headerLeft: () => (
              <BackLeftNav route={route} navigation={navigation} />
            ),
          })}
          name={'Notifications'}
          component={NotificationsScreen}
        />
        <Stack.Screen
          options={({route, navigation}) => ({
            headerShadowVisible: false,
            headerLeft: () => (
              <BackLeftNav route={route} navigation={navigation} />
            ),
          })}
          name={'NewContact'}
          component={NewContactScreen}
        />
        <Stack.Screen
          options={({route, navigation}) => ({
            headerShadowVisible: false,
            headerLeft: () => (
              <BackLeftNav route={route} navigation={navigation} />
            ),
          })}
          name={'AddTag'}
          component={AddTagScreen}
        />
        <Stack.Screen
          options={({route, navigation}) => ({
            headerShadowVisible: false,
            headerLeft: () => (
              <SettingsLeftNav route={route} navigation={navigation} />
            ),
          })}
          name={'Settings'}
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
