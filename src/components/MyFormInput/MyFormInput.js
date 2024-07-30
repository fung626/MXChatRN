import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const NormalBorderColor = '#4F97F3';
const ErrorBorderColor = '#F45A56';

const MyFormInput = props => {
  const {
    onChange,
    onBlur,
    label,
    placeholder,
    value,
    required,
    secureTextEntry,
    keyboardType,
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
          borderColor: error ? ErrorBorderColor : NormalBorderColor,
        }}>
        <TextInput
          style={styles.textInput}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          underlineColorAndroid="transparent"
          secureTextEntry={secureTextEntry}
          onChangeText={value => onChange(value)}
          keyboardType={keyboardType}
        />
      </View>
    </>
  );
};

MyFormInput.propTypes = {
  error: PropTypes.object,
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
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
    borderColor: NormalBorderColor,
    borderWidth: 0.9,
    borderRadius: 10,
  },
  label: {
    ...TextStyles.roboto.label,
    paddingHorizontal: Sizes.padding.huge,
    paddingVertical: Sizes.padding.small,
  },
  textInput: {
    ...TextStyles.roboto.label,
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

export default MyFormInput;
