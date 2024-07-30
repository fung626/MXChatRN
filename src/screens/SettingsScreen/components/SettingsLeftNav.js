import strings from '@localization';
import {navDrawerBtn} from '@src/assets/images';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const SettingsLeftNav = props => {
  const {
    langStore: {lang},
    route,
    navigation,
  } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Image style={styles.btn} source={navDrawerBtn} resizeMode="contain" />
      </TouchableOpacity>
      <Text style={styles.title}>{strings.settings}</Text>
    </View>
  );
};

SettingsLeftNav.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {width: 24, height: 24, borderRadius: 12},
  btn: {
    width: 18,
    height: 28,
    marginHorizontal: Sizes.margin.small,
  },
  title: {
    ...TextStyles.manrope.title,
    padding: Sizes.padding.small,
    fontSize: 24,
    textAlign: 'center',
    color: '#2198FA',
  },
});

export default inject('langStore')(observer(SettingsLeftNav));
