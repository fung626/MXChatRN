import {ChatBottomModal} from '@components';
import strings from '@localization';
import {
  chatAddBtn,
  chatCameraBtn,
  chatExpandActionsbtn,
  chatMsgBtn,
  chatSendBtn,
  chatStickersBtn,
  closeBtn,
  moreBtn,
  paymentBtn,
  photoLibBtn,
} from '@src/assets/images';
import {Sizes} from '@theme';
import {isIOS} from '@utils/common';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {
  Animated,
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import {launchImageLibrary} from 'react-native-image-picker';
import SafeArea from 'react-native-safe-area';
import uuid from 'react-native-uuid';
import {
  GiftedChatBubble,
  GiftedChatTime,
  GiftedChatVideoBubble,
} from './components';

const Phone = '85292443663';
const ChatRoomId = '92443663';
const Channel = 'whatsapp';

const ActionBtnWidth = 24 + Sizes.margin.small * 2;

const BottomModalArray = [
  {
    type: 'payment',
    text: strings.chatToPay,
    localizedKey: 'chatToPay',
    img: paymentBtn,
  },
  {
    type: 'library',
    text: strings.photoVideoLibrary,
    localizedKey: 'photoVideoLibrary',
    img: photoLibBtn,
  },
  {
    type: 'browse',
    text: strings.browse,
    localizedKey: 'browse',
    img: moreBtn,
  },
];

class ChatRoomScreen extends Component {
  //
  state = {
    bottomModalArray: BottomModalArray,
    animation: {
      expanded: false,
      value: new Animated.Value(ActionBtnWidth),
    },
    isKeyboardVisible: false,
    safeAreaInsetBottom: 0,
    isBottomModalVisible: false,
    messages: [
      {
        _id: 5,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Loretta McKenzie',
        },
        video:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      },
      {
        _id: 4,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Loretta McKenzie',
        },
        video:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      },
      {
        _id: 3,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Loretta McKenzie',
        },
        image:
          'https://www.kindpng.com/picc/m/296-2968253_1460px-react-logo-react-native-logo-png-transparent.png',
      },
      {
        _id: 2,
        text: 'Hello there.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Loretta McKenzie',
        },
      },
      {
        _id: 1,
        text: 'Hello there. I am Loretta McKenzie, nice to meet you.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Loretta McKenzie',
        },
      },
    ],
  };

  constructor(props) {
    super(props);
    this.onToolbarPress = this.onToolbarPress.bind(this);
    this.onSend = this.onSend.bind(this);
    this.inputToolbar = this.inputToolbar.bind(this);
    this.onChatAddPress = this.onChatAddPress.bind(this);
    this.onChatCameraPress = this.onChatCameraPress.bind(this);
    this.onModalPress = this.onModalPress.bind(this);
    this.onModalCancelPress = this.onModalCancelPress.bind(this);
  }

  componentDidMount() {
    this.fetch();
    this.keyboardWillShowSubscription = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        this.setState({isKeyboardVisible: true});
      },
    );
    this.keyboardWillideSubscription = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        this.setState({isKeyboardVisible: false});
      },
    );
    SafeArea.getSafeAreaInsetsForRootView().then(result => {
      this.setState({safeAreaInsetBottom: result.safeAreaInsets.bottom});
    });
  }

  componentWillUnmount() {
    // Keyboard.removeAllListeners('keyboardWillShow');
    // Keyboard.removeAllListeners('keyboardWillHide');
    // this.keyboardWillShowSubscription.remove();
    // this.keyboardWillideSubscription.remove();
  }

  fetch() {
    // TODO: fetch messages from server
  }

  onSend(messages = []) {
    // TODO: post new messages to server
    if (messages.length > 0) {
      const {text} = messages[0];
      const {chatMsgStore} = this.props;
      const data = {
        channel: Channel,
        phone: Phone,
        chatroom_id: ChatRoomId,
        message: text,
      };
      // console.log(data);
      chatMsgStore.post(data);
    }
    /*this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });*/
  }

  onChatAddPress() {
    const {bottomModalArray} = this.state;
    let index = 0;
    for (const item of bottomModalArray) {
      const {localizedKey} = item;
      bottomModalArray[index] = {
        ...item,
        text: strings.getString(localizedKey),
      };
      index++;
    }
    this.setState({
      bottomModalArray: bottomModalArray,
      isBottomModalVisible: true,
    });
  }

  onChatCameraPress() {
    const onImgSelected = params => {
      let message = {
        _id: uuid.v4(),
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Loretta McKenzie',
        },
        image: params.uri,
      };
      this.onSend([message]);
    };
    const onCameraImgTaken = params => {
      let message = {
        _id: uuid.v4(),
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Loretta McKenzie',
        },
        image: params.uri,
      };
      this.onSend([message]);
    };
    const onCameraVideoTaken = params => {
      let message = {
        _id: uuid.v4(),
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Loretta McKenzie',
        },
        video: params.uri,
      };
      this.onSend([message]);
    };
    this.props.navigation.navigate('Camera', {
      onImgSelected,
      onCameraImgTaken,
      onCameraVideoTaken,
    });
  }

  onToolbarPress() {
    const {
      animation: {expanded, value},
    } = this.state;
    let initialValue = expanded ? ActionBtnWidth * 3 : ActionBtnWidth;
    let finalValue = expanded ? ActionBtnWidth : ActionBtnWidth * 3;
    this.setState({
      animation: {
        ...this.state.animation,
        expanded: !this.state.animation.expanded,
      },
    });
    this.state.animation.value.setValue(initialValue);
    Animated.spring(value, {
      toValue: finalValue,
      useNativeDriver: false,
    }).start();
  }

  onModalPress({type}) {
    switch (type) {
      case 'payment':
        break;
      case 'library':
        launchImageLibrary({selectionLimit: 1, mediaType: 'photo'}, res => {
          // console.log(res);
          if (res.didCancel || !res.assets) {
            return;
          }
          const {uri} = res.assets[0];
          let message = {
            _id: uuid.v4(),
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Loretta McKenzie',
            },
            image: uri,
          };
          this.onSend([message]);
          setTimeout(() => {
            this.onModalCancelPress();
          }, 300);
        });
        break;
      case 'browse':
        break;
    }
  }

  onModalCancelPress() {
    this.setState({isBottomModalVisible: false});
  }

  inputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderTopWidth: 0,
        }}
        primaryStyle={{alignItems: 'center'}}
        renderActions={props => {
          return (
            <Animated.View style={{width: this.state.animation.value}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {!this.state.animation.expanded && (
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={this.onToolbarPress}>
                    <Image
                      source={chatExpandActionsbtn}
                      style={styles.expandBtnImg}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                )}
                {this.state.animation.expanded && (
                  <>
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={this.onChatAddPress}>
                      <Image
                        source={chatAddBtn}
                        style={styles.btnImg}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={this.onChatCameraPress}>
                      <Image
                        source={chatCameraBtn}
                        style={styles.btnImg}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                      <Image
                        source={chatMsgBtn}
                        style={styles.btnImg}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </Animated.View>
          );
        }}
        renderComposer={props => {
          return (
            <View style={styles.composer}>
              <Composer {...props} textInputStyle={styles.textInput} />
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => {
                  // TODO: stickers button
                  console.log('stickers button');
                }}>
                <Image source={chatStickersBtn} style={styles.btnImg} />
              </TouchableOpacity>
            </View>
          );
        }}
        renderSend={props => {
          return (
            <Send
              {...props}
              disabled={!props.text}
              containerStyle={styles.sendBtn}>
              <Image source={chatSendBtn} style={styles.btnImg} />
            </Send>
          );
        }}
      />
    );
  };

  render() {
    // const { chatMsgStore } = this.props;
    // console.log(chatMsgStore);
    const {
      params: {user},
    } = this.props.route;
    return (
      <View style={styles.container}>
        {isIOS() && <StatusBar barStyle="dark-content" />}
        <GiftedChat
          ref={ref => {
            this.chatListView = ref;
          }}
          listViewProps={{
            style: {
              ...styles.chat,
              marginBottom: this.state.isKeyboardVisible ? 0 : 22,
            },
            keyboardDismissMode: isIOS() ? 'interactive' : 'on-drag',
          }}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: user._id,
          }}
          placeholder={strings.typeAMsg}
          alwaysShowSend={true}
          showAvatarForEveryMessage={true}
          bottomOffset={isIOS() ? -(16 - this.state.safeAreaInsetBottom) : null}
          renderAvatar={() => null}
          renderInputToolbar={props => this.inputToolbar(props)}
          renderBubble={props => <GiftedChatBubble {...props} />}
          renderTime={props => <GiftedChatTime {...props} />}
          renderMessageVideo={props => <GiftedChatVideoBubble {...props} />}
          locale={'zh-hk'}
          lightboxProps={{
            renderHeader: close => (
              <TouchableOpacity onPress={close}>
                <Image style={styles.closeBtn} source={closeBtn} />
              </TouchableOpacity>
            ),
          }}
        />
        <ChatBottomModal
          items={this.state.bottomModalArray}
          isModalVisible={this.state.isBottomModalVisible}
          onPress={this.onModalPress}
          onCancelPress={this.onModalCancelPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chat: {
    backgroundColor: '#EDF5F9',
    // marginBottom: 24,
  },
  composer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 13,
    marginVertical: Sizes.margin.small,
  },
  textInput: {
    backgroundColor: '#F4F4F4',
    borderRadius: 13,
    paddingTop: Sizes.padding.small,
    paddingStart: Sizes.padding.small,
    paddingEnd: Sizes.padding.normal,
  },
  sendBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.margin.small,
  },
  actionBtn: {
    width: 24,
    height: 24,
    marginHorizontal: Sizes.margin.small - 2,
  },
  expandBtnImg: {
    width: 20,
    height: 20,
  },
  btnImg: {
    width: 22,
    height: 22,
  },
  closeBtn: {
    width: 22,
    height: 22,
    marginTop: 64,
    marginHorizontal: Sizes.margin.normal,
  },
});

export default inject(
  'chatRoomStore',
  'chatMsgStore',
)(observer(ChatRoomScreen));
