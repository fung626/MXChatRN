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
import LoginHookForm from './components/LoginHookForm';

class LoginScreen extends Component {
  //
  state = {error: false};

  render() {
    const {loginStore, authStore} = this.props;
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
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80}
          enabled>
          <ScrollView>
            <Image
              style={styles.headerImage}
              resizeMode="contain"
              source={logoSqure}
            />
            <Text style={styles.headerText}>{strings.logIn}</Text>
            <Text style={styles.descriptionText}>{strings.loginMsg}</Text>
            <LoginHookForm
              loading={loginStore.fetching}
              error={this.state.error}
              onSubmit={async params => {
                await loginStore.post(params);
                const {success} = loginStore;
                this.setState({
                  error: !success,
                });
                if (success) {
                  authStore.onLoad();
                  this.props.navigation.navigate('HomeNavigator', {
                    screen: 'Chat',
                  });
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
    flexDirection: 'column',
    justifyContent: 'center',
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
    padding: Sizes.padding.small,
    textAlign: 'center',
    color: '#2198FA',
  },
  descriptionText: {
    ...TextStyles.manrope.subTitle,
    // marginHorizontal: Sizes.margin.huge,
    padding: Sizes.padding.normal,
    width: width * 0.7,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 25,
    color: '#8B8B8B',
  },
});

export default inject('loginStore', 'authStore')(observer(LoginScreen));
