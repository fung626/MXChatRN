import {backBtn} from '@src/assets/images';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const BackLeftNav = props => {
  const {
    route: {params},
    navigation,
  } = props;
  // console.log(params);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={backBtn} style={styles.btnImage} resizeMode="contain" />
      </TouchableOpacity>
      <Text style={styles.title}>{params.title}</Text>
    </View>
  );
};

BackLeftNav.propTypes = {
  title: PropTypes.string,
};

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
  title: {
    ...TextStyles.roboto.text,
    color: '#4E4E4E',
  },
});

export default BackLeftNav;
