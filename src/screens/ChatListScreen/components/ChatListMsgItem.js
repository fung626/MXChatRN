import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ChatListMsgItem = props => {
  const {user, text, updated} = props;
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View>
            <Text style={styles.text}>{user.name}</Text>
            <Text style={styles.label}>{text}</Text>
          </View>
          <View>
            <Text style={styles.tinyLabel}>{updated}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ChatListMsgItem.propTypes = {
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: Sizes.margin.normal,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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

export default ChatListMsgItem;
