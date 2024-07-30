import {isIOS} from '@utils/common';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {NewContactHookForm} from './components';

class NewContactScreen extends Component {
  //
  state = {
    notification: null,
  };

  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    // TODO: fetch data
  }

  render() {
    return (
      <View style={styles.container}>
        {isIOS() && <StatusBar barStyle="dark-content" />}
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80}
          enabled>
          <ScrollView>
            <NewContactHookForm />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default inject('langStore')(observer(NewContactScreen));
