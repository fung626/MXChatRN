import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const DrawerItem = ({image, title, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touch} onPress={onPress}>
        <Image style={styles.image} source={image} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

DrawerItem.propTypes = {
  image: PropTypes.node,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 26,
    height: 26,
    margin: Sizes.margin.normal,
  },
  btn: {
    margin: Sizes.margin.normal,
  },
  title: {
    ...TextStyles.manrope.title,
    color: '#FFF',
  },
});

export default DrawerItem;
