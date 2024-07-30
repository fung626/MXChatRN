import {configure} from 'mobx';
import React from 'react';
import {enableScreens} from 'react-native-screens';
import RootNavigator from './navigation';

configure({
  enforceActions: 'never',
  // enforceActions: 'observed',
  // isolateGlobalState: false,
  // computedRequiresReaction: true,
  // reactionRequiresObservable: true,
  // observableRequiresReaction: true,
  // disableErrorBoundaries: true,
});

// console.disableYellowBox = true;
// LogBox.ignoreAllLogs()

enableScreens();

const App = () => {
  return <RootNavigator />;
};

export default App;
