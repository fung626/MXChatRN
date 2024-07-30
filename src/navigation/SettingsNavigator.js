/* eslint-disable react/no-unstable-nested-components */
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '@screens/SettingsScreen';
import {SettingsLeftNav} from '@screens/SettingsScreen/components';
import React from 'react';

const Stack = createStackNavigator();

const NavTitle = '';

const SettingsNavigator = () => {
  //
  return (
    <Stack.Navigator
      screenOptions={{
        title: NavTitle,
      }}
      initialRouteName={'Settings'}>
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
  );
};

export default SettingsNavigator;
