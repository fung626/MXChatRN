import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SectionHeader = ({title}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

SectionHeader.propTypes = {
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingVertical: Sizes.padding.small,
    paddingHorizontal: Sizes.padding.normal,
  },
  title: {
    ...TextStyles.roboto.label,
    color: '#7E7E7E',
  },
});

export default SectionHeader;
