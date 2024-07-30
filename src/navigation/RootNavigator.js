import stores from '@mobx/stores';
import {NavigationContainer} from '@react-navigation/native';
import {theme} from '@theme';
import {Provider} from 'mobx-react';
import React from 'react';
import {useColorScheme} from 'react-native';
import AppNavigator from './AppNavigator';

const RootNavigator = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={theme[scheme]}>
      <Provider {...stores}>
        <AppNavigator />
      </Provider>
    </NavigationContainer>
  );
};

export default RootNavigator;
