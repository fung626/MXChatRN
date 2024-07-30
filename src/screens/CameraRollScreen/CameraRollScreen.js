/* eslint-disable react-native/no-inline-styles */
import strings from '@localization/Localization';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import {TextStyles} from '@styles';
import {width} from '@theme';
import {isScrollEnded} from '@utils/common';
import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

class CameraRollScreen extends Component {
  //
  state = {
    data: [],
  };

  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {}

  async fetch() {
    // console.log('fetch');
    try {
      const result = await CameraRoll.getPhotos({
        first: 20,
        assetType: 'All',
      });
      console.log(result);
    } catch (e) {
      console.log('failed');
    }
  }

  append(data) {
    const assets = data.edges;
    const nextState = {
      loadingMore: false,
    };

    if (!data.page_info.has_next_page) {
      nextState.noMorePhotos = true;
    }

    if (assets.length > 0) {
      nextState.lastCursor = data.page_info.end_cursor;
      nextState.assets = this.state.assets.concat(assets);
      nextState.dataSource = this.state.dataSource.cloneWithRows(
        _.chunk(nextState.assets, 3),
      );
    }

    this.setState(nextState);
  }

  onScroll({event}) {
    if (isScrollEnded(event)) {
      console.log('Ended');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.data.length > 0 ? (
          <ScrollView onScroll={this.onScroll}>
            {this.state.assets.map((photo, index) => {
              return (
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                  <Image
                    key={index}
                    style={styles.img}
                    source={{uri: photo.node.image.uri}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.text}>{strings.noPhotoOrVideoFound}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: width / 3,
    height: width / 3,
  },
  text: {
    ...TextStyles.manrope.title,
  },
});

export default CameraRollScreen;
