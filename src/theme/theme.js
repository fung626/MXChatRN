import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Dimensions, StatusBar } from 'react-native';
// import { Header } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

export { width, height };

export const theme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2198FA',
      secondary: '#F2F2F7FF',
      background: '#FFFFFFFF',
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#2198FA',
      secondary: '#F2F2F7FF',
      background: '#212636',
    },
  },
};

export const Sizes = {
  // global sizes
  borderWidth: 1,
  borderRadius: 10,
  margin: {
    tiny: 4,
    small: 8,
    normal: 16,
    huge: 32,
  },
  padding: {
    tiny: 4,
    small: 8,
    normal: 16,
    huge: 32,
  },
  // font sizes
  font: {
    largeTitle: 28,
    title: 18,
    subTitle: 16,
    text: 16,
    label: 14,
    tinyLabel: 10,
  },
  btn: {
    height: 50,
  },
  // app dimensions
  dimensions: {
    width,
    height,
    navBarHeight: StatusBar.currentHeight || 64,
  },
};
