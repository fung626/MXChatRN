/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import strings from '@localization/Localization';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import {
  cameraRollBtn,
  closeBtn,
  flashAutoBtn,
  flashOffBtn,
  flashOnBtn,
  shutterBtn,
  switchCameraBtn,
} from '@src/assets/images';
import {TextStyles} from '@styles';
import {height, Sizes, width} from '@theme';
import {isIOS} from '@utils/common';
import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import SafeArea from 'react-native-safe-area';
import {RNCamera} from 'react-native-vision-camera';

const FlashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const WBOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

class CameraScreen extends React.Component {
  //
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    autoFocusPoint: {
      normalized: {x: 0.5, y: 0.5}, // normalized values required for autoFocusPointOfInterest
      drawRectPosition: {
        x: width * 0.5 - 32,
        y: height * 0.5 - 32,
      },
    },
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    recordOptions: {
      mute: false,
      maxDuration: 60,
      quality: RNCamera.Constants.VideoQuality['720p'],
    },
    isRecording: false,
    canDetectFaces: false,
    faces: [],
    safeAreaInset: {
      top: 0,
      bottom: 0,
    },
  };

  constructor(props) {
    super(props);
    this.camera = React.createRef();
    this.takePicture = this.takePicture.bind(this);
    this.takeVideo = this.takeVideo.bind(this);
    this.onClosePress = this.onClosePress.bind(this);
    this.onFlashPress = this.onFlashPress.bind(this);
    this.onCameraRollPress = this.onCameraRollPress.bind(this);
  }

  componentDidMount() {
    SafeArea.getSafeAreaInsetsForRootView().then(result => {
      this.setState({
        safeAreaInset: {
          top: result.safeAreaInsets.top,
          bottom: result.safeAreaInsets.bottom,
        },
      });
    });
    this.switchCamera = this.switchCamera.bind(this);
  }

  async takePicture() {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      // const saved = await CameraRoll.save(data.uri);
      const {params} = this.props.route;
      params.onCameraImgTaken(data);
      this.props.navigation.goBack();
      // console.log(data);
      // if (saved) {
      //   Vibration.vibrate(1 * 100);
      // }
    }
  }

  async takeVideo() {
    const {isRecording} = this.state;
    if (this.camera && !isRecording) {
      try {
        const promise = this.camera.recordAsync(this.state.recordOptions);
        if (promise) {
          this.setState({isRecording: true});
          const data = await promise;
          const saved = await CameraRoll.save(data.uri);
          const {params} = this.props.route;
          params.onCameraVideoTaken(data);
          this.props.navigation.goBack();
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  async stopVideo() {
    await this.camera.stopRecording();
    this.setState({isRecording: false});
  }

  switchCamera() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  onClosePress() {
    this.props.navigation.goBack();
  }

  onFlashPress() {
    this.setState({
      flash: FlashModeOrder[this.state.flash],
    });
  }

  onCameraRollPress() {
    // this.props.navigation.navigate('CameraRoll');
    launchImageLibrary({selectionLimit: 1, mediaType: 'photo'}, res => {
      // console.log(res);
      if (res.didCancel || !res.assets) {
        return;
      }
      const {params} = this.props.route;
      params.onImgSelected(res.assets[0]);
      this.props.navigation.goBack();
    });
  }

  flashBtnImg(mode) {
    switch (mode) {
      case 'off':
        return flashOffBtn;
      case 'on':
        return flashOnBtn;
      case 'auto':
        return flashAutoBtn;
      case 'torch':
        return flashOnBtn;
    }
  }

  render() {
    const {canDetectFaces} = this.state;
    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 32,
      left: this.state.autoFocusPoint.drawRectPosition.x - 32,
    };
    return (
      <View style={styles.container}>
        {isIOS() && <StatusBar barStyle="light-content" />}
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={isIOS() ? styles.cameraIOS : styles.cameraAndroid}
          type={this.state.type}
          flashMode={this.state.flash}
          autoFocus={this.state.autoFocus}
          // autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
          zoom={this.state.zoom}
          whiteBalance={this.state.whiteBalance}
          ratio={this.state.ratio}
          focusDepth={this.state.depth}
          androidCameraPermissionOptions={{
            title: strings.useCameraPermission,
            message: strings.requestCameraPermission,
            buttonPositive: strings.confirm,
            buttonNegative: strings.cancel,
          }}
          faceDetectionLandmarks={
            RNCamera.Constants.FaceDetection.Landmarks
              ? RNCamera.Constants.FaceDetection.Landmarks.all
              : undefined
          }
          onFacesDetected={
            canDetectFaces ? this.facesDetected : null
          }></RNCamera>
        <View
          style={{
            ...styles.top,
            height: 66 + this.state.safeAreaInset.top,
          }}>
          <TouchableOpacity onPress={this.onClosePress}>
            <Image style={styles.btn} source={closeBtn} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onFlashPress}>
            <Image
              style={styles.btn}
              source={this.flashBtnImg(this.state.flash)}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...styles.bottomColumn,
            height: 128 + this.state.safeAreaInset.bottom,
          }}>
          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={this.onCameraRollPress}>
              <Image
                style={styles.btn}
                source={cameraRollBtn}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.takePicture}
              onLongPress={() => {
                this.takeVideo();
              }}
              onPressOut={() => {
                this.stopVideo();
              }}>
              <Image
                style={styles.shutterBtn}
                source={shutterBtn}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.switchCamera}>
              <Image
                style={styles.btn}
                source={switchCameraBtn}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>{strings.cameraGuide}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  cameraIOS: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: (16 * width) / 9,
    width: width,
  },
  cameraAndroid: {
    // flex: 1,
    height: (16 * width) / 9,
    width: width,
  },
  shutterBtn: {
    width: 64,
    height: 64,
    marginTop: Sizes.margin.small,
    marginHorizontal: Sizes.margin.normal,
  },
  btn: {
    width: 24,
    height: 24,
    marginTop: Sizes.margin.huge,
    marginHorizontal: Sizes.margin.huge,
  },
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomColumn: {
    position: 'absolute',
    bottom: 0,
    width: width,
    flexDirection: 'column',
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomRow: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    ...TextStyles.manrope.text,
    color: '#FFF',
    marginVertical: Sizes.margin.normal,
    textAlign: 'center',
  },
});

export default CameraScreen;
