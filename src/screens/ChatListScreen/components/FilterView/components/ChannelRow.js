import {MyOptionBtn} from '@components';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import {msgTypeImg} from '@utils/common';
import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const ChannelRow = props => {
  const {title, type} = props;
  return (
    <>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.image}
            source={msgTypeImg(type)}
            resizeMode="contain"
          />
          <Text style={styles.text}>{title}</Text>
        </View>
        <MyOptionBtn {...props} />
      </View>
    </>
  );
};

ChannelRow.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  onSelect: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Sizes.padding.normal,
    paddingHorizontal: Sizes.padding.huge,
  },
  image: {
    width: 19,
    height: 19,
    paddingHorizontal: Sizes.padding.normal,
  },
  text: {
    ...TextStyles.roboto.label,
    color: '#4E4E4E',
    fontSize: 16,
  },
});

export default ChannelRow;
