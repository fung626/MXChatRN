import {MyOptionBtn} from '@components';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ContactRow = props => {
  const {title} = props;
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <MyOptionBtn {...props} />
      </View>
    </>
  );
};

ContactRow.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  onSelect: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Sizes.padding.normal,
    paddingHorizontal: Sizes.padding.huge,
  },
  image: {
    width: 19,
    height: 19,
    paddingHorizontal: Sizes.padding.normal,
  },
  text: {
    ...TextStyles.roboto.label,
    color: '#4E4E4E',
    fontSize: 16,
  },
});

export default ContactRow;
