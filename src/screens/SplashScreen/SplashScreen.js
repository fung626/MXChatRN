import {
  landingBackgroundLower,
  landingBackgroundUpper,
  landingLogo,
} from '@src/assets/images';
import {Sizes} from '@theme';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';

class SplashScreen extends Component {
  //
  componentDidMount() {
    this.redirect();
  }

  redirect = async () => {
    // check auth
    try {
      const {authStore, langStore} = this.props;
      await authStore.onLoad();
      await langStore.onLoad();
      const {user, token} = authStore;
      // console.log(user['channels']);
      if (user !== null && token !== null) {
        this.props.navigation.navigate('HomeNavigator', {
          screen: 'ChatList',
        });
        // this.props.navigation.navigate('AuthNavigator', {
        //   screen: 'Login',
        // });
      } else {
        // this.props.navigation.navigate('HomeNavigator', {
        //   screen: 'ChatList',
        // });
        this.props.navigation.navigate('AuthNavigator', {
          screen: 'Login',
        });
      }
    } catch (e) {
      console.log(e.toString());
      this.props.navigation.navigate('AuthNavigator', {
        screen: 'Login',
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.upperImage}
          // resizeMode="contain"
          source={landingBackgroundUpper}
        />
        <Image
          style={styles.logoImage}
          resizeMode="contain"
          source={landingLogo}
        />
        <Image style={styles.lowerImage} source={landingBackgroundLower} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoImage: {
    flex: 1,
    alignSelf: 'center',
    margin: Sizes.margin.normal,
    padding: Sizes.padding.normal,
    width: 86,
    height: 86,
  },
  upperImage: {
    flex: 1,
    width: '100%',
  },
  lowerImage: {
    flex: 2,
    width: '100%',
  },
});

export default inject('authStore', 'langStore')(observer(SplashScreen));
