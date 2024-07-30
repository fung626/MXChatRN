import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MaskedTextInput} from 'react-native-mask-text';

const NormalBorderColor = '#4F97F3';
const ErrorBorderColor = '#F45A56';

const MyFormDateInput = props => {
  const {onChange, onBlur, label, placeholder, value, required, error} = props;

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
        <MaskedTextInput
          style={styles.textInput}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          mask="99/99/9999"
          placeholder="DD/MM/YYYY"
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          onChangeText={text => onChange(text)}
        />
      </View>
    </>
  );
};

MyFormDateInput.propTypes = {
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
    borderColor: NormalBorderColor,
    borderWidth: 1,
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
  },
  errorMsg: {
    alignSelf: 'stretch',
    marginHorizontal: Sizes.margin.huge,
    color: '#F45A56',
  },
});

export default MyFormDateInput;
