import {Sizes, theme} from '@theme';
import {StyleSheet} from 'react-native';

const TextStyles = {
  manrope: StyleSheet.create({
    largeTitle: {
      fontSize: Sizes.font.largeTitle,
      fontFamily: 'Manrope-ExtraBold',
      color: theme.light.colors.text,
    },
    title: {
      fontSize: Sizes.font.title,
      fontFamily: 'Manrope-Bold',
      color: theme.light.colors.text,
    },
    subTitle: {
      fontSize: Sizes.font.subTitle,
      fontFamily: 'Manrope-SemiBold',
      color: theme.light.colors.text,
    },
    text: {
      fontSize: Sizes.font.text,
      fontFamily: 'Manrope-Medium',
      color: theme.light.colors.text,
    },
    label: {
      fontSize: Sizes.font.label,
      fontFamily: 'Manrope-Medium',
      color: theme.light.colors.text,
    },
    tinyLabel: {
      fontSize: Sizes.font.tinyLabel,
      fontFamily: 'Manrope-Medium',
      color: theme.light.colors.text,
    },
  }),
  roboto: StyleSheet.create({
    largeTitle: {
      fontSize: Sizes.font.largeTitle,
      fontFamily: 'Roboto-Bold',
      color: theme.light.colors.text,
    },
    title: {
      fontSize: Sizes.font.title,
      fontFamily: 'Roboto-Bold',
      color: theme.light.colors.text,
    },
    subTitle: {
      fontSize: Sizes.font.subTitle,
      fontFamily: 'Roboto-Bold',
      color: theme.light.colors.text,
    },
    text: {
      fontSize: Sizes.font.text,
      fontFamily: 'Roboto-Medium',
      color: theme.light.colors.text,
    },
    label: {
      fontSize: Sizes.font.label,
      fontFamily: 'Roboto-Regular',
      color: theme.light.colors.text,
    },
    tinyLabel: {
      fontSize: Sizes.font.tinyLabel,
      fontFamily: 'Roboto-Regular',
      color: theme.light.colors.text,
    },
  }),
};

export default TextStyles;
