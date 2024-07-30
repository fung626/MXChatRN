import React from 'react';
import { StyleSheet } from 'react-native';
import { Bubble } from 'react-native-gifted-chat';

const GiftedChatBubble = props => {
  // console.log(navigation);
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: styles.leftWrapper,
        right: styles.rightWrapper,
      }}
      textStyle={{
        left: styles.text,
        right: styles.text,
      }}
    />
  );
};

const styles = StyleSheet.create({
  leftWrapper: { backgroundColor: '#FFFFFF' },
  rightWrapper: { backgroundColor: '#D0E9FF' },
  text: {
    color: '#7E7E7E',
  },
});

export default GiftedChatBubble;
