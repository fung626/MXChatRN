import {createStackNavigator} from '@react-navigation/stack';
import ForgetPwdSuccessScreen from '@screens/ForgetPwdSuccessScreen';
import ForgotPwdScreen from '@screens/ForgotPwdScreen';
import LoginScreen from '@screens/LoginScreen';
import React from 'react';

const Stack = createStackNavigator();

const NavTitle = '';

const AuthNavigator = () => {
  //
  return (
    <Stack.Navigator
      screenOptions={{
        title: NavTitle,
      }}>
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
    </Stack.Navigator>
  );
};

export default AuthNavigator;
