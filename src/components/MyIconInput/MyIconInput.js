import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';

const MyIconInput = props => {
  const {
    onChange,
    onBlur,
    placeholder,
    value,
    iconSource,
    secureTextEntry,
    error,
  } = props;
  // console.log(props);

  return (
    <>
      {error && <Text style={styles.errorMsg}>{error.message}</Text>}
      <View
        style={{
          ...styles.container,
          borderColor: error ? '#F45A56' : '#00000029',
          shadowColor: error ? '#F45A56' : '#00000029',
        }}>
        <Image style={styles.image} resizeMode="contain" source={iconSource} />
        <TextInput
          style={styles.textInput}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          underlineColorAndroid="transparent"
          secureTextEntry={secureTextEntry}
          onChangeText={value => onChange(value)}
        />
      </View>
    </>
  );
};

MyIconInput.propTypes = {
  error: PropTypes.object,
  placeholder: PropTypes.string,
  iconSource: PropTypes.node,
  onChange: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    marginTop: Sizes.margin.small,
    marginBottom: Sizes.margin.normal,
    marginHorizontal: Sizes.margin.huge,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    height: Sizes.textInputHeight,
    alignSelf: 'stretch',
    borderColor: '#00000029',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#00000029',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  image: {
    alignSelf: 'center',
    margin: Sizes.margin.small,
    height: 24,
    width: 24,
  },
  textInput: {
    flex: 1,
    padding: Sizes.padding.normal,
    // height: 46,
  },
  errorMsg: {
    alignSelf: 'stretch',
    marginHorizontal: Sizes.margin.huge,
    color: '#F45A56',
  },
});

export default MyIconInput;
