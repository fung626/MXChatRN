import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MyAvatar = ({title, avatarStyles, textStyles}) => {
  // console.log(props);
  return (
    <>
      <View
        style={{
          ...styles.avatar,
          ...avatarStyles,
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

MyAvatar.propTypes = {
  title: PropTypes.string,
  avatarStyles: PropTypes.object,
  textStyles: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: Sizes.margin.small,
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    margin: Sizes.margin.small,
    borderRadius: 15,
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

export default MyAvatar;
