/* eslint-disable react/no-unstable-nested-components */
import {BackLeftNav} from '@components';
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
import NewContactScreen from '@screens/NewContactScreen';
import NotesScreen from '@screens/NotesScreen';
import NotificationsScreen from '@screens/NotificationsScreen';
import React from 'react';

const Stack = createStackNavigator();

const NavTitle = '';

const HomeNavigator = () => {
  //
  return (
    <Stack.Navigator
      screenOptions={{
        title: NavTitle,
      }}
      initialRouteName={'ChatList'}>
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
    </Stack.Navigator>
  );
};

export default HomeNavigator;
