import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MyTag = ({title, containerStyles, textStyles}) => {
  // console.log(props);
  return (
    <>
      <View
        style={{
          ...styles.container,
          ...containerStyles,
        }}>
        <Text
          style={{
            ...styles.title,
            ...textStyles,
          }}>
          {title}
        </Text>
      </View>
    </>
  );
};

MyTag.propTypes = {
  title: PropTypes.string,
  containerStyles: PropTypes.object,
  textStyles: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    margin: Sizes.margin.small,
    paddingVertical: Sizes.padding.tiny,
    paddingHorizontal: Sizes.padding.small,
    borderRadius: 13,
    backgroundColor: '#FCECD2',
    justifyContent: 'center',
  },
  title: {
    ...TextStyles.roboto.title,
    textAlign: 'center',
    fontSize: 14,
    color: '#F1B44C',
  },
});

export default MyTag;
