import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';

const MySearchInput = props => {
  const {onChange, onFocus, onBlur, placeholder, value, iconSource} = props;

  const [focus, setFocus] = useState(false);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: focus ? '#FFF' : '#F4F4F4',

        borderColor: focus ? '#4F97F3' : '#FFF',
      }}>
      <Image style={styles.image} resizeMode="contain" source={iconSource} />
      <TextInput
        style={styles.textInput}
        onFocus={() => {
          if (onFocus) {
            onFocus();
          }
          setFocus(true);
        }}
        onBlur={() => {
          if (onBlur) {
            onBlur();
          }
          setFocus(false);
        }}
        value={value}
        placeholder={placeholder}
        clearButtonMode="while-editing"
        underlineColorAndroid="transparent"
        onChangeText={value => onChange(value)}
      />
    </View>
  );
};

MySearchInput.propTypes = {
  placeholder: PropTypes.string,
  iconSource: PropTypes.node,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    marginTop: Sizes.margin.small,
    marginBottom: Sizes.margin.small,
    marginHorizontal: Sizes.margin.normal,
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    borderWidth: 1,
    alignSelf: 'stretch',
    borderRadius: 21,
  },
  image: {
    alignSelf: 'center',
    margin: Sizes.margin.small,
    height: 24,
    width: 24,
  },
  textInput: {
    flex: 1,
    padding: Sizes.padding.small,
    // height: 46,
  },
});

export default MySearchInput;
