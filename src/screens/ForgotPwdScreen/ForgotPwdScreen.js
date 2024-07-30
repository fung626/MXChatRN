import strings from '@localization';
import {backgroundLower, backgroundUpper, logoSqure} from '@src/assets/images';
import {TextStyles} from '@styles';
import {height, Sizes, width} from '@theme';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import ForgotPasswordHookForm from './components/ForgotPasswordHookForm';

class ForgotPwdScreen extends Component {
  //
  state = {error: false};

  render() {
    const {forgotPwdStore} = this.props;
    return (
      <>
        <Image
          style={styles.upperImage}
          resizeMode="cover"
          source={backgroundUpper}
        />
        <Image
          style={styles.lowerImage}
          resizeMode="cover"
          source={backgroundLower}
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior="height"
          keyboardVerticalOffset={80}
          enabled>
          <ScrollView style={styles.container}>
            <Image
              style={styles.headerImage}
              resizeMode="contain"
              source={logoSqure}
            />
            <Text style={styles.headerText}>{strings.forgotpassword}</Text>
            <Text style={styles.descriptionText}>{strings.forgotPwdMsg}</Text>
            <ForgotPasswordHookForm
              loading={forgotPwdStore.fetching}
              error={this.state.error}
              onSubmit={async params => {
                await forgotPwdStore.post(params);
                this.setState({
                  error: !success,
                });
                const {success} = forgotPwdStore;
                if (success) {
                  this.props.navigation.replace('ForgotPasswordSuccess');
                }
              }}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperImage: {
    width: '100%',
    height: width / 3,
    position: 'absolute',
    top: 0,
  },
  lowerImage: {
    width: '100%',
    height: width / 3,
    position: 'absolute',
    bottom: 0,
  },
  headerImage: {
    // flex: 1,
    marginTop: height * 0.2,
    marginBottom: Sizes.margin.normal,
    alignSelf: 'center',
    width: 86,
    height: 86,
  },
  headerText: {
    ...TextStyles.manrope.largeTitle,
    marginHorizontal: Sizes.margin.huge,
    padding: Sizes.padding.normal,
    textAlign: 'center',
    color: '#2198FA',
  },
  descriptionText: {
    ...TextStyles.manrope.subTitle,
    marginHorizontal: Sizes.margin.huge,
    padding: Sizes.padding.normal,
    textAlign: 'center',
    lineHeight: 25,
    color: '#8B8B8B',
  },
});

export default inject('forgotPwdStore')(observer(ForgotPwdScreen));
