import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Badge} from 'react-native-elements';

const MyBadgeBtn = props => {
  const {onPress, imageSource, badge, color} = props;
  // console.log('MyBadgeBtn');
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={imageSource} resizeMode="contain" />
      {badge > 0 && (
        <Badge
          containerStyle={styles.badge}
          badgeStyle={{backgroundColor: '#F46A6A'}}
          textStyle={{fontSize: 10}}
          value={badge}
        />
      )}
    </TouchableOpacity>
  );
};

MyBadgeBtn.propTypes = {
  onPress: PropTypes.func,
  imageSource: PropTypes.node,
  badge: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 19,
    marginHorizontal: Sizes.margin.small,
    height: 22,
  },
  badge: {
    position: 'absolute',
    top: -Sizes.margin.small,
    end: 0,
    height: 18,
  },
});

export default MyBadgeBtn;
