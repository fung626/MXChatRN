import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SectionHeader = props => {
  const {title} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: Sizes.padding.normal,
  },
  text: {
    ...TextStyles.manrope.title,
    color: '#4E4E4E',
  },
});

export default SectionHeader;
