import notes from '@constants/json/notes.json';
import strings from '@localization';
import {chatSendBtn} from '@src/assets/images';
import {TextStyles} from '@styles';
import {height, Sizes} from '@theme';
import {isIOS} from '@utils/common';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {NoteItem} from './components';

class NotesScreen extends Component {
  //
  state = {
    isAddNote: false,
    isKeyboardVisible: false,
    safeAreaInsetBottom: null,
    keyboardHeight: 0,
  };

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.onAddNote = this.onAddNote.bind(this);
    this.onPostNote = this.onPostNote.bind(this);
  }

  componentDidMount() {
    this.fetch();
    this.keyboardWillShowSubscription = Keyboard.addListener(
      'keyboardWillShow',
      e => {
        // console.log(e);
        this.setState({
          isKeyboardVisible: true,
          keyboardHeight: e.startCoordinates.height,
        });
      },
    );
    this.keyboardWillideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      e => {
        this.setState({
          isKeyboardVisible: false,
          keyboardHeight: 0,
        });
      },
    );
  }

  componentWillUnmount() {
    // this.keyboardWillShowSubscription.remove();
    // this.keyboardWillideSubscription.remove();
  }

  fetch() {
    // TODO: fetch notes from server
  }

  post() {
    // TODO: post note to server
  }

  renderItem({item, index}) {
    // console.log(notes.length);s
    const {bg_color, text_color} = item;
    return (
      <>
        <NoteItem
          {...item}
          avatarStyles={{backgroundColor: bg_color}}
          avatarTextStyles={{color: text_color}}
        />
        {index + 1 === notes.length && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {notes.length} {strings.notes}
            </Text>
          </View>
        )}
      </>
    );
  }

  onPostNote(event) {
    this.setState({isAddNote: false});
  }

  onAddNote() {
    this.setState({isAddNote: true});
  }

  render() {
    const {isAddNote, keyboardHeight} = this.state;
    const {
      langStore: {lang},
    } = this.props;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}>
        {isIOS() && <StatusBar barStyle="dark-content" />}
        <KeyboardAwareFlatList
          style={{height: height}}
          data={notes}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
        <ScrollView
          style={{height: keyboardHeight + Sizes.padding.normal * 2 + 44}}
          scrollEnabled={false}>
          {isAddNote && (
            <View style={styles.addNoteContainer}>
              <View
                style={{
                  flex: 7,
                  backgroundColor: '#F4F4F4',
                  borderRadius: 13,
                  padding: Sizes.padding.normal,
                  marginHorizontal: Sizes.margin.normal,
                }}>
                <TextInput
                  style={{height: 62}}
                  ref={this.textInput}
                  placeholder={strings.writeANote}
                  multiline={true}
                  onEndEditing={this.onPostNote}
                  autoFocus={true}
                />
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity onPress={this.onAddNote}>
                  <Image style={styles.addNoteBtn} source={chatSendBtn} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
        <TouchableOpacity style={styles.btn} onPress={this.onAddNote}>
          <Text style={styles.btnText}>{strings.addNote}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addNoteContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: Sizes.padding.normal,
    height: 104,
  },
  footer: {
    flex: 1,
    padding: Sizes.padding.normal,
    alignItems: 'center',
  },
  footerText: {
    ...TextStyles.roboto.label,
    fontSize: 12,
    color: '#4E4E4E',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: Sizes.margin.small,
    marginBottom: Sizes.margin.huge,
    marginHorizontal: Sizes.margin.huge,
    padding: Sizes.padding.small,
    borderRadius: Sizes.borderRadius,
    alignSelf: 'stretch',
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
  addNoteBtn: {
    width: 26,
    height: 26,
  },
});

export default inject('langStore')(observer(NotesScreen));
