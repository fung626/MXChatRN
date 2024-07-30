import strings from '@localization';
import {backgroundLower, backgroundUpper, logoSqure} from '@src/assets/images';
import {TextStyles} from '@styles';
import {height, Sizes, width} from '@theme';
import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

class ForgetPwdSuccessScreen extends Component {
  //
  render() {
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
        <ScrollView style={styles.container}>
          <Image
            style={styles.headerImage}
            resizeMode="contain"
            source={logoSqure}
          />
          <Text style={styles.headerText}>{strings.forgotpassword}</Text>
          <Text style={styles.descriptionText}>
            {strings.forgotPwdSuccessMsg}
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.popToTop();
            }}>
            <Text style={styles.btnText}>{strings.confirm}</Text>
          </TouchableOpacity>
        </ScrollView>
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
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: height * 0.25,
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
});

export default ForgetPwdSuccessScreen;
