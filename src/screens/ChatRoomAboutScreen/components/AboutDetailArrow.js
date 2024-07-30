import strings from '@localization/Localization';
import {useNavigation} from '@react-navigation/native';
import {arrowBtn} from '@src/assets/images';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const AboutDetailArrow = props => {
  //
  const navigation = useNavigation();
  const {localizedKey, detail, route} = props;
  // console.log(props);

  const onPress = () => {
    if (route) {
      navigation.navigate(route, {title: strings.getString(localizedKey)});
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{strings.getString(localizedKey)}</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detail}>{detail}</Text>
          <Image
            style={styles.arrowBtnImg}
            source={arrowBtn}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

AboutDetailArrow.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Sizes.padding.tiny,
    marginHorizontal: Sizes.margin.normal,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.padding.normal,
  },
  title: {
    ...TextStyles.roboto.label,
    padding: Sizes.padding.normal,
  },
  detail: {
    ...TextStyles.roboto.label,
    color: '#AAAAAA',
    paddingHorizontal: Sizes.padding.normal,
  },
  arrowBtnImg: {
    width: 12,
    // height: 12,
  },
});

export default AboutDetailArrow;
