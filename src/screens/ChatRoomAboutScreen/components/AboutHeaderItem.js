import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import {avatarMsgImg} from '@utils/common';
import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';

const AboutHeaderItem = props => {
  const {
    data: {avatar, name, contact, channel},
  } = props;
  // console.log(channel);
  return (
    <View style={styles.container}>
      <View style={{paddingEnd: Sizes.padding.normal}}>
        <Avatar
          rounded
          source={{
            uri: avatar,
          }}
          size="medium"
        />
      </View>
      <View style={styles.contact}>
        <Text style={styles.title}>{name}</Text>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.msgTypeImg} source={avatarMsgImg(channel)} />
          <Text style={styles.subTitle}>{contact}</Text>
        </View>
      </View>
    </View>
  );
};

AboutHeaderItem.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  contact: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Sizes.padding.normal,
  },
  msgTypeImg: {
    width: 14,
    height: 14,
    marginEnd: Sizes.padding.tiny,
  },
  contact: {
    flexDirection: 'column',
  },
  title: {
    ...TextStyles.roboto.label,
    fontSize: 16,
    color: '#4E4E4E',
    paddingVertical: Sizes.padding.tiny,
  },
  subTitle: {
    ...TextStyles.roboto.label,
    color: '#4E4E4E',
  },
});

export default AboutHeaderItem;
