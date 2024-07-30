import {MyOptionBtn, MyTag} from '@components';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const TagItem = props => {
  const {title, bg_color, text_color, selected, onSelect} = props;
  // console.log(props);
  return (
    <>
      <View style={styles.container}>
        <MyTag
          containerStyles={{backgroundColor: bg_color}}
          textStyles={{color: text_color}}
          title={title}
        />
        <MyOptionBtn {...props} />
      </View>
    </>
  );
};

TagItem.propTypes = {
  title: PropTypes.string,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Sizes.padding.small,
    marginHorizontal: Sizes.margin.huge,
  },
  title: {
    ...TextStyles.roboto.text,
    color: '#333333',
  },
});

export default TagItem;
