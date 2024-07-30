import { Dimensions } from 'react-native';

export function isLandscape() {
  let { width, height } = Dimensions.get('window');
  return width > height;
}

export function parseRatio(value) {
  let [p1, p2] = value.split(':');
  p1 = parseInt(p1);
  p2 = parseInt(p2);
  return p1 / p2;
}

export function getOrientation() {
  let { width, height } = Dimensions.get('window');
  let isLandscape = width > height;
  return {
    width: width,
    height: height,
    isLandscape: isLandscape,
    isPortrait: !isLandscape,
  };
}
