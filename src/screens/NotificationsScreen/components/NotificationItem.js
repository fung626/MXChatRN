import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import {avatarMsgImg} from '@utils/common';
import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';

const NotificationItem = ({avatar, title, time, channel, read}) => {
  // console.log(props);
  return (
    <>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Avatar
              rounded
              source={{
                uri: avatar,
              }}
              size={50}
            />
            <Image
              style={styles.channelTypeImg}
              source={avatarMsgImg(channel)}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginStart: Sizes.margin.normal,
            }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>
        {!read && <View style={styles.dot} />}
      </View>
    </>
  );
};

NotificationItem.propTypes = {
  avatar: PropTypes.string,
  title: PropTypes.string,
  time: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: Sizes.padding.normal,
    marginHorizontal: Sizes.margin.huge,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#2198FA',
    borderRadius: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    margin: Sizes.margin.small,
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: '#FCECD2',
  },
  channelTypeImg: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
  },
  avatarTitle: {
    ...TextStyles.roboto.title,
    textAlign: 'center',
    fontSize: 22,
    color: '#F1B44C',
  },
  title: {
    ...TextStyles.roboto.text,
    color: '#333333',
  },
  content: {
    ...TextStyles.roboto.label,
    color: '#5C5C5C',
    flex: 1,
    flexWrap: 'wrap',
    paddingVertical: Sizes.padding.small,
  },
  time: {
    ...TextStyles.roboto.label,
    fontSize: 10,
    color: '#5C5C5C',
    paddingVertical: Sizes.padding.small,
  },
});

export default NotificationItem;
