import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const BottomItem = ({onPress, text, img}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
        {img && <Image style={styles.img} source={img} resizeMode="contain" />}
      </TouchableOpacity>
    </View>
  );
};

BottomItem.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string.isRequired,
  img: PropTypes.node,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: Sizes.padding.normal,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    ...TextStyles.manrope.text,
  },
  img: {
    width: 22,
    height: 22,
  },
});

export default BottomItem;
