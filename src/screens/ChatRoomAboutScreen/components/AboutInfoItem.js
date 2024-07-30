import strings from '@localization/Localization';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const AboutInfoItem = props => {
  const {data} = props;
  // console.log(data);
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        return (
          <View style={styles.item}>
            <Text style={styles.title}>
              {strings.getString(item.localizedKey)}
            </Text>
            <Text style={styles.detail}>{item.value}</Text>
          </View>
        );
      })}
    </View>
  );
};

AboutInfoItem.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: Sizes.padding.normal,
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: Sizes.padding.normal,
    paddingVertical: Sizes.padding.small,
  },
  title: {
    ...TextStyles.roboto.label,
    color: '#7E7E7E',
    paddingEnd: Sizes.padding.normal,
    width: 124,
  },
  detail: {
    ...TextStyles.roboto.label,
    color: '#4E4E4Es',
  },
});

export default AboutInfoItem;
