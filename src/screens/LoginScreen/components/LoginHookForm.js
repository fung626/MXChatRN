import {MyIconInput} from '@components';
import strings from '@localization';
import {useNavigation} from '@react-navigation/native';
import {iconEmail, iconPassword} from '@src/assets/images';
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

const LoginHookForm = ({loading, error, onSubmit}) => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  return (
    <>
      <Controller
        name={'email'}
        control={control}
        defaultValue="fung626@gmail.com"
        rules={{
          required: {
            value: true,
            message: strings.requiredMsg,
          },
        }}
        render={({field}) => (
          <MyIconInput
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={field.value}
            error={errors.email}
            iconSource={iconEmail}
            placeholder={strings.emailOrUsername}
          />
        )}
      />
      <Controller
        name={'password'}
        control={control}
        defaultValue="2$Y0AMXGBR%O"
        rules={{
          required: {
            value: true,
            message: strings.requiredMsg,
          },
        }}
        render={({field}) => (
          <MyIconInput
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={field.value}
            error={errors.password}
            iconSource={iconPassword}
            placeholder={strings.password}
            secureTextEntry={true}
          />
        )}
      />
      {error && <Text style={styles.errorMsg}>{strings.loginErrorMsg}</Text>}
      <TouchableOpacity
        style={styles.forgotBtn}
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotText}>{strings.forgotpassword}?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        disabled={loading}
        onPress={handleSubmit(onSubmit)}>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.loginText}>{strings.login}</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

LoginHookForm.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
  error: PropTypes.bool,
};

const styles = StyleSheet.create({
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: Sizes.margin.huge * 2,
    marginBottom: Sizes.margin.huge,
    marginHorizontal: Sizes.margin.huge,
    padding: Sizes.padding.small,
    borderRadius: Sizes.borderRadius,
    alignSelf: 'stretch',
    height: Sizes.btn.height,
    backgroundColor: '#2198FA',
  },
  loginText: {
    ...TextStyles.manrope.title,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: '#FFFFFF',
  },
  forgotBtn: {
    marginHorizontal: 32,
    padding: 8,
    alignSelf: 'stretch',
  },
  forgotText: {fontSize: 12, color: '#2198FA'},
  errorMsg: {
    alignSelf: 'stretch',
    marginHorizontal: Sizes.margin.huge,
    color: '#F45A56',
  },
});

export default LoginHookForm;
