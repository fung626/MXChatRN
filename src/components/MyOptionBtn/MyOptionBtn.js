import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const MyOptionBtn = ({ selected, onSelect }) => {
  // console.log(props);
  return (
    <>
      <TouchableOpacity onPress={onSelect}>
        <View style={styles.container}>
          {selected && <View style={styles.option} />}
        </View>
      </TouchableOpacity>
    </>
  );
};

MyOptionBtn.propTypes = {
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    width: 21,
    height: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#4F97F3',
    borderRadius: 4,
    borderWidth: 1,
  },
  option: {
    width: 17,
    height: 17,
    backgroundColor: '#4F97F3',
    borderRadius: 4,
  },
});

export default MyOptionBtn;
