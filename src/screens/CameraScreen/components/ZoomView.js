import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dimensions, PanResponder, StyleSheet, View } from 'react-native';

class ZoomView extends Component {
  //
  constructor(props) {
    super(props);
    this.panResponder = PanResponder.create({
      onPanResponderMove: (e, { dy }) => {
        const { height: windowHeight } = Dimensions.get(`window`);
        return this.props.onZoomProgress(
          Math.min(Math.max((dy * -1) / windowHeight, 0), 0.5),
        );
      },
      onMoveShouldSetPanResponder: (ev, { dx }) => {
        return dx !== 0;
      },
      onPanResponderGrant: () => {
        return this.props.onZoomStart();
      },
      onPanResponderRelease: () => {
        return this.props.onZoomEnd();
      },
    });
  }

  render() {
    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        {this.props.children}
      </View>
    );
  }
}

ZoomView.propTypes = {
  onZoomStart: PropTypes.func.isRequired,
  onZoomEnd: PropTypes.func.isRequired,
  onZoomProgress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: `100%`,
  },
});

export default ZoomView;

// import React, { Component } from 'react';
// import { View } from 'react-native';
// import { PinchGestureHandler, State } from 'react-native-gesture-handler';

// export default class ZoomView extends Component {
//   onGesturePinch = ({ nativeEvent }) => {
//     this.props.onPinchProgress(nativeEvent.scale)
//   }

//   onPinchHandlerStateChange = event => {
//     const pinch_start = event.nativeEvent.state === State.END
//     const pinch_begin = event.nativeEvent.oldState === State.BEGAN
//     const pinch_active = event.nativeEvent.state === State.ACTIVE
//     if (pinch_start) {
//       this.props.onPinchEnd()
//     }
//     else if (pinch_begin && pinch_active) {
//       this.props.onPinchStart()
//     }
//   }

//   render() {
//     const { style } = this.props
//     return (
//       <PinchGestureHandler
//         onGestureEvent={this.onGesturePinch}
//         onHandlerStateChange={this.onPinchHandlerStateChange}>
//         { this.props.children }
//       </PinchGestureHandler>
//     )
//   }
// }
