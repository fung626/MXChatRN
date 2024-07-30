/* eslint-disable react-native/no-inline-styles */
import {MyTag} from '@components';
import strings from '@localization/Localization';
import {useNavigation} from '@react-navigation/native';
import {addTagBtn} from '@src/assets/images';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const AddTagRow = ({data, onTagChange}) => {
  //
  const navigation = useNavigation();

  const onAddTag = () => {
    navigation.navigate('AddTag', {
      title: strings.tag,
      selectedTags: data,
      onTagChange: onTagChange,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{strings.tags}</Text>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={onAddTag}>
          <Image style={styles.addBtnImg} source={addTagBtn} />
          <Text style={styles.title}>{strings.addTag}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.avatarsContainer}>
        {data.map(item => {
          const {bg_color, text_color} = item;
          return (
            <MyTag
              containerStyles={{backgroundColor: bg_color}}
              textStyles={{color: text_color}}
              title={item.title}
            />
          );
        })}
      </View>
    </View>
  );
};

AddTagRow.propTypes = {
  data: PropTypes.array,
  onTagChange: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.padding.normal,
    marginHorizontal: Sizes.margin.normal,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...TextStyles.roboto.label,
  },
  avatarsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: Sizes.margin.small,
    alignItems: 'center',
  },
  addBtnImg: {
    width: 20,
    height: 20,
    margin: Sizes.margin.small,
    justifyContent: 'center',
  },
});

export default AddTagRow;
