import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const SectionDetailsItem = ({img, title, details, onPress}) => {
  // console.log(title);
  return (
    <View style={styles.containers}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          padding: Sizes.padding.normal,
          alignItems: 'stretch',
        }}
        onPress={onPress}>
        {img && <Image style={styles.img} source={img} resizeMode="contain" />}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.details}>{details}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

SectionDetailsItem.propTypes = {
  img: PropTypes.node,
  title: PropTypes.string,
  details: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: 20,
    height: 20,
    marginEnd: Sizes.margin.small,
  },
  title: {
    ...TextStyles.roboto.text,
    color: '#333333',
  },
  details: {
    ...TextStyles.roboto.label,
    fontSize: 16,
    color: '#7E7E7E',
  },
});

export default SectionDetailsItem;
