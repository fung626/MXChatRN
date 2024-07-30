import {chatBotBtn, chatRefreshBtn, chatSearchBtn} from '@src/assets/images';
import {Sizes} from '@theme';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const ChatRoomRightNav = props => {
  const {chatRoomStore} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          // TODO: search
          chatRoomStore.setIsSearching();
        }}>
        <Image style={styles.btn} source={chatSearchBtn} resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // TODO: refresh
          console.log('refresh');
        }}>
        <Image
          style={styles.btn}
          source={chatRefreshBtn}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // TODO: bot page
          console.log('bot page');
        }}>
        <Image style={styles.btn} source={chatBotBtn} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

ChatRoomRightNav.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    width: 22,
    height: 22,
    marginHorizontal: Sizes.margin.small,
  },
});

export default inject('chatRoomStore')(observer(ChatRoomRightNav));
