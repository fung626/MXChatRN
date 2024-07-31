/* eslint-disable react/no-unstable-nested-components */
// import { useTheme } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React from 'react';
import AppDrawerView from './AppDrawerView';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import LandingNavigator from './LandingNavigator';
import SettingsNavigator from './SettingsNavigator';

const AppDrawer = createDrawerNavigator();

const getSwipeEnabled = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'ChatList';
  switch (routeName) {
    case 'ChatList':
      return true;
    default:
      return false;
  }
};

function AppNavigator() {
  return (
    <AppDrawer.Navigator
      screenOptions={{
        animationEnabled: false,
        headerShown: false,
        drawerType: 'front',
      }}
      drawerContent={props => <AppDrawerView {...props} />}
      initialRouteName={'LandingNavigator'}>
      <AppDrawer.Screen
        name={'LandingNavigator'}
        component={LandingNavigator}
        options={() => {
          return {
            swipeEnabled: false,
          };
        }}
      />
      <AppDrawer.Screen
        name={'AuthNavigator'}
        component={AuthNavigator}
        options={() => {
          return {
            swipeEnabled: false,
          };
        }}
      />
      <AppDrawer.Screen
        name={'HomeNavigator'}
        component={HomeNavigator}
        options={({route}) => {
          return {
            swipeEnabled: getSwipeEnabled(route),
          };
        }}
      />
      <AppDrawer.Screen
        name={'SettingsNavigator'}
        component={SettingsNavigator}
        options={({route}) => {
          return {
            swipeEnabled: getSwipeEnabled(route),
          };
        }}
      />
    </AppDrawer.Navigator>
  );
}

export default AppNavigator;
