import {MyBadgeBtn} from '@components';
import strings from '@localization/Localization';
import {addBtn, bellBtn} from '@src/assets/images';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const ChatListRightNav = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <MyBadgeBtn
        imageSource={bellBtn}
        badge={2}
        onPress={() => {
          navigation.navigate('Notifications', {
            title: strings.notifications,
          });
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NewContact', {
            title: strings.newContact,
          });
        }}>
        <Image style={styles.btn} source={addBtn} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

ChatListRightNav.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {width: 24, height: 24, borderRadius: 12},
  btn: {
    width: 28,
    height: 28,
    marginHorizontal: Sizes.margin.small,
  },
  title: {
    ...TextStyles.manrope.title,
    marginHorizontal: Sizes.margin.small,
    padding: Sizes.padding.small,
    fontSize: 24,
    textAlign: 'center',
    color: '#2198FA',
  },
});

export default ChatListRightNav;
