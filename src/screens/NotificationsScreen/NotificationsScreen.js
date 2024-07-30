import notification from '@constants/json/notification.json';
import {isIOS} from '@utils/common';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import {NotificationItem} from './components';

class NotificationsScreen extends Component {
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
    // TODO: fetch notifications data
  }

  renderItem({item}) {
    return <NotificationItem {...item} />;
  }

  render() {
    return (
      <View style={styles.container}>
        {isIOS() && <StatusBar barStyle="dark-content" />}
        <FlatList
          data={notification}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default inject('langStore')(observer(NotificationsScreen));
