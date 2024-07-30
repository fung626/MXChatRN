import {AddTagRow, MyFormDateInput, MyFormInput} from '@components';
import selected_tags from '@constants/json/selected_tags.json';
import strings from '@localization';
import {useNavigation} from '@react-navigation/native';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const NewContactHookForm = ({loading, error, onSubmit}) => {
  //
  const navigation = useNavigation();
  const [tags, setTags] = useState(selected_tags);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <>
      <Controller
        name={'firstName'}
        control={control}
        rules={{
          required: {
            value: true,
            message: strings.requiredMsg,
          },
        }}
        render={({field}) => (
          <MyFormInput
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={field.value}
            label={strings.firstName}
            required={true}
            error={errors.firstName}
          />
        )}
      />
      <Controller
        name={'lastName'}
        control={control}
        rules={{
          required: {
            value: true,
            message: strings.requiredMsg,
          },
        }}
        render={({field}) => (
          <MyFormInput
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={field.value}
            label={strings.lastName}
            required={true}
            error={errors.lastName}
          />
        )}
      />
      <Controller
        name={'phone'}
        control={control}
        rules={{
          required: {
            value: true,
            message: strings.requiredMsg,
          },
        }}
        render={({field}) => (
          <MyFormInput
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={field.value}
            label={strings.phone}
            required={true}
            error={errors.phone}
            keyboardType="phone-pad"
          />
        )}
      />
      <Controller
        name={'email'}
        control={control}
        render={({field}) => (
          <MyFormInput
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={field.value}
            label={strings.email}
            error={errors.email}
          />
        )}
      />
      <Controller
        name={'gender'}
        control={control}
        render={({field}) => (
          <MyFormInput
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={field.value}
            label={strings.gender}
            error={errors.gender}
          />
        )}
      />
      <Controller
        name={'birthday'}
        control={control}
        render={({field}) => (
          <MyFormDateInput
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={field.value}
            label={strings.birthday}
            error={errors.birthday}
          />
        )}
      />
      <Controller
        name={'address'}
        control={control}
        render={({field}) => (
          <MyFormInput
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={field.value}
            label={strings.address}
            error={errors.address}
          />
        )}
      />
      <Controller
        name={'country'}
        control={control}
        render={({field}) => (
          <MyFormInput
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={field.value}
            label={strings.country}
            error={errors.country}
          />
        )}
      />
      <Controller
        name={'tags'}
        control={control}
        defaultValue={tags}
        render={({field}) => (
          <>
            <View style={styles.separator} />
            <AddTagRow
              data={tags}
              onTagChange={tags => {
                setTags(tags);
              }}
            />
          </>
        )}
      />
      <TouchableOpacity
        style={styles.confirmBtn}
        disabled={loading}
        onPress={handleSubmit(onSubmit)}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.confirmText}>{strings.confirm}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelBtn}
        disabled={loading}
        onPress={onCancel}>
        <Text style={styles.cancelText}>{strings.cancel}</Text>
      </TouchableOpacity>
    </>
  );
};

NewContactHookForm.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
  error: PropTypes.bool,
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#F5F5F5',
  },
  confirmBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: Sizes.margin.huge * 2,
    marginBottom: Sizes.margin.small,
    marginHorizontal: Sizes.margin.huge,
    padding: Sizes.padding.small,
    borderRadius: Sizes.borderRadius,
    alignSelf: 'stretch',
    height: Sizes.btn.height,
    backgroundColor: '#2198FA',
  },
  confirmText: {
    ...TextStyles.roboto.text,
    color: '#FFFFFF',
  },
  cancelBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: Sizes.margin.tiny,
    marginBottom: Sizes.margin.huge,
    marginHorizontal: Sizes.margin.huge,
    padding: Sizes.padding.small,
    borderRadius: Sizes.borderRadius,
    alignSelf: 'stretch',
    height: Sizes.btn.height,
    backgroundColor: '#E8E8E9',
    shadowColor: '#00000029',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  cancelText: {
    ...TextStyles.roboto.text,
  },
  errorMsg: {
    alignSelf: 'stretch',
    marginHorizontal: Sizes.margin.huge,
    color: '#F45A56',
  },
});

export default NewContactHookForm;
