import React from 'react';
import { StyleSheet } from 'react-native';
import { Time } from 'react-native-gifted-chat';

const GiftedChatTime = props => {
  // console.log(navigation);
  return (
    <Time
      {...props}
      timeTextStyle={{
        right: styles.text,
        right: styles.text,
      }}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#7E7E7E',
  },
});

export default GiftedChatTime;
