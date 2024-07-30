import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import {avatarMsgImg} from '@utils/common';
import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar, Badge} from 'react-native-elements';

const ChatListContactItem = props => {
  const {user} = props;
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <View>
          <Avatar
            rounded
            source={{
              uri: user.avatar,
            }}
            size="medium"
          />
          <Image
            style={styles.channelTypeImg}
            source={avatarMsgImg(props.channel)}
          />
        </View>
        <View style={styles.column}>
          <View style={{flexDirection: 'column', alignSelf: 'stretch'}}>
            <Text style={styles.text}>{user.name}</Text>
            <Text style={styles.label}>{user.contact}</Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
            <Text style={styles.tinyLabel}>{props.updated}</Text>
            {props.badge > 0 && (
              <Badge style={styles.badge} value={props.badge} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ChatListContactItem.propTypes = {
  onPress: PropTypes.func,
  filterOptions: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: Sizes.margin.normal,
  },
  column: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.margin.small,
  },
  channelTypeImg: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
  },
  badge: {
    marginHorizontal: Sizes.margin.small,
  },
  text: {
    ...TextStyles.manrope.text,
    marginHorizontal: Sizes.margin.small,
    marginBottom: Sizes.margin.small,
  },
  label: {
    ...TextStyles.manrope.label,
    color: '#5C5C5C',
    marginHorizontal: Sizes.margin.small,
  },
  tinyLabel: {
    ...TextStyles.manrope.tinyLabel,
    color: '#5C5C5C',
    marginHorizontal: Sizes.margin.small,
    marginBottom: Sizes.margin.small,
  },
});

export default ChatListContactItem;
