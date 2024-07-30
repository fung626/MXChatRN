import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const NewContactInput = props => {
  const {
    onChange,
    onBlur,
    label,
    placeholder,
    value,
    required,
    secureTextEntry,
    error,
  } = props;

  return (
    <>
      <Text style={styles.label}>
        {label}
        {required ? '*' : ''}
      </Text>
      {error && <Text style={styles.errorMsg}>{error.message}</Text>}
      <View
        style={{
          ...styles.container,
          borderColor: error ? '#F45A56' : '#00000029',
          shadowColor: error ? '#F45A56' : '#00000029',
        }}>
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

NewContactInput.propTypes = {
  error: PropTypes.object,
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
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
  label: {
    ...TextStyles.roboto.text,
    paddingHorizontal: Sizes.padding.huge,
  },
  textInput: {
    ...TextStyles.roboto.text,
    padding: Sizes.padding.normal,
    // height: 46,
  },
  errorMsg: {
    alignSelf: 'stretch',
    marginHorizontal: Sizes.margin.huge,
    color: '#F45A56',
  },
});

export default NewContactInput;
