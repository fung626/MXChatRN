import {backBtn} from '@src/assets/images';
import {Sizes} from '@theme';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const CameraRollLeftNav = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={backBtn} style={styles.btnImage} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

CameraRollLeftNav.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: Sizes.margin.small,
    marginEnd: Sizes.margin.normal,
  },
  btnImage: {
    width: 12,
    width: 12,
  },
});

export default CameraRollLeftNav;
