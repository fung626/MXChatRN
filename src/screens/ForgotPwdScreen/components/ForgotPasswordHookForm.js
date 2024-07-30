import {MyIconInput} from '@components';
import strings from '@localization';
import {iconEmail} from '@src/assets/images';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const emailValidPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const ForgotPasswordHookForm = ({loading, error, onSubmit}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  // console.log(handleSubmit);
  return (
    <>
      <Controller
        name={'address'}
        control={control}
        defaultValue="fung626@gmail.com"
        rules={{
          required: {
            value: true,
            message: strings.requiredMsg,
          },
          pattern: {
            value: emailValidPattern,
            message: strings.validMsg,
          },
        }}
        render={({field}) => (
          <MyIconInput
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={field.value}
            error={errors.email}
            iconSource={iconEmail}
            placeholder={strings.email}
          />
        )}
      />
      {error && (
        <Text style={styles.errorMsg}>{strings.forgotPwdErrorMsg}</Text>
      )}
      <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.btnText}>{strings.reset}</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

ForgotPasswordHookForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onSubmit: PropTypes.func,
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: Sizes.margin.huge * 2,
    marginBottom: Sizes.margin.huge,
    marginHorizontal: Sizes.margin.huge,
    padding: Sizes.padding.small,
    borderRadius: Sizes.borderRadius,
    height: Sizes.btn.height,
    backgroundColor: '#2198FA',
  },
  btnText: {
    ...TextStyles.manrope.title,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: '#FFFFFF',
  },
  errorMsg: {
    alignSelf: 'stretch',
    marginHorizontal: Sizes.margin.huge,
    color: '#F45A56',
  },
});

export default ForgotPasswordHookForm;
