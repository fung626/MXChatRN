import {MyAvatar} from '@components';
import strings from '@localization/Localization';
import {addBtnGrey} from '@src/assets/images';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const AboutAgentItem = ({data, onAvatarPress, onAddPress}) => {
  //
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.agents}</Text>
      <View style={styles.avatarsContainer}>
        <TouchableOpacity onPress={onAddPress}>
          <Image style={styles.addBtnImg} source={addBtnGrey} />
        </TouchableOpacity>
        {data.map((item, index) => {
          const {bg_color, text_color} = item;
          return (
            <TouchableOpacity onPress={onAvatarPress}>
              <MyAvatar
                avatarStyles={{backgroundColor: bg_color}}
                textStyles={{color: text_color}}
                title={item.title}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

AboutAgentItem.propTypes = {
  onAvatarPress: PropTypes.func,
  onAddPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.padding.normal,
    marginHorizontal: Sizes.margin.normal,
  },
  title: {
    ...TextStyles.roboto.label,
  },
  avatarsContainer: {
    flexDirection: 'row',
    paddingVertical: Sizes.margin.small,
    alignItems: 'center',
  },
  addBtnImg: {
    width: 30,
    height: 30,
    margin: Sizes.margin.small,
    justifyContent: 'center',
  },
});

export default AboutAgentItem;
