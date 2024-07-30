import {chatPlayBtn} from '@src/assets/images';
import {Sizes, width} from '@theme';
import {isIOS} from '@utils/common';
import React, {useRef, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';

const GiftedChatVideoBubble = ({currentMessage}) => {
  let player = useRef(null);
  const [isVideoPaused, setIsVideoPaused] = useState(true);

  const play = () => {
    player && player.seek(0);
    setIsVideoPaused(false);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={ref => {
          player = ref;
        }}
        style={styles.video}
        useNativeControls
        shouldPlay={false}
        repeat={false}
        // controls={true}
        fullscreen={true}
        paused={isVideoPaused}
        source={{
          uri: currentMessage.video,
        }}
        onVideoLoad={response => {
          // const { naturalSize } = response;
          // const aspectRatio = naturalSize.height / naturalSize.width;
          // const newHeight = width * aspectRatio < height * 0.55;
        }}
        resizeMode="cover">
        <View></View>
      </Video>
      {!isIOS() && isVideoPaused && (
        <View style={styles.playBtn}>
          <TouchableOpacity onPress={play}>
            <Image style={styles.playImg} source={chatPlayBtn} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 150,
    width: width * 0.5,
  },
  video: {
    marginVertical: Sizes.margin.tiny,
    marginHorizontal: Sizes.margin.tiny,
    height: 150 - Sizes.margin.tiny * 2,
    width: width * 0.5 - Sizes.margin.tiny * 2,
    borderRadius: 10,
    alignContent: 'center',
    backgroundColor: 'black',
  },
  playBtn: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  playImg: {
    width: 48,
    height: 48,
  },
});

export default GiftedChatVideoBubble;
