import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '@screens/SplashScreen';
import React from 'react';

const Stack = createStackNavigator();

const NavTitle = '';

const LandingNavigator = () => {
  //
  return (
    <Stack.Navigator
      screenOptions={{
        title: NavTitle,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name={'Splash'}
        component={SplashScreen}
      />
    </Stack.Navigator>
  );
};

export default LandingNavigator;
