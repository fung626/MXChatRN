import {backBtn} from '@src/assets/images';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import {avatarMsgImg} from '@utils/common';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';

const ChatRoomLeftNav = ({route, navigation}) => {
  const {
    params,
    params: {user},
  } = route;
  // console.log(navigation);

  const onAboutPress = () => {
    // console.log(user.name);
    navigation.navigate('ChatRoomAbout', {title: user.name});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={backBtn} style={styles.btnImage} resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onAboutPress}>
        <View>
          <Avatar
            rounded
            source={{
              uri: user.avatar,
            }}
            size="small"
          />
          <Image
            style={styles.msgTypeImg}
            source={avatarMsgImg(params.messenge_type)}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onAboutPress}>
        <Text style={styles.label}>{user.name}</Text>
        <Text style={styles.tinyLabel}>{user.contact}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: Sizes.margin.small,
    marginEnd: Sizes.margin.normal,
  },
  btnImage: {
    width: 12,
    width: 12,
  },
  msgTypeImg: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
  },
  label: {
    ...TextStyles.manrope.label,
    marginHorizontal: Sizes.margin.small,
  },
  tinyLabel: {
    ...TextStyles.manrope.tinyLabel,
    color: '#5C5C5C',
    fontSize: 12,
    marginHorizontal: Sizes.margin.small,
  },
});

export default ChatRoomLeftNav;
