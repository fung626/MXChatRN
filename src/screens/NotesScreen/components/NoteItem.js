import {MyAvatar} from '@components';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const NoteItem = props => {
  const {avatarStyles, avatarTextStyles, avatar, title, content, date} = props;
  // console.log(props);
  return (
    <>
      <View style={styles.container}>
        <MyAvatar
          title={avatar}
          avatarStyles={{...styles.avatar, ...avatarStyles}}
          textStyles={{...styles.avatarTitle, ...avatarTextStyles}}
        />
        <View
          style={{
            flexDirection: 'column',
            marginStart: Sizes.margin.normal,
          }}>
          <Text style={styles.title}>{title}</Text>
          <View style={{marginEnd: Sizes.margin.normal * 5}}>
            <Text style={styles.content}>{content}</Text>
          </View>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </>
  );
};

NoteItem.propTypes = {
  avatarStyles: PropTypes.object,
  avatarTextStyles: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: Sizes.padding.small,
    marginHorizontal: Sizes.margin.huge,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    margin: Sizes.margin.small,
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: '#FCECD2',
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
  date: {
    ...TextStyles.roboto.label,
    fontSize: 10,
    color: '#5C5C5C',
    paddingVertical: Sizes.padding.small,
  },
});

export default NoteItem;
