import {AddTagRow} from '@components';
import chat_about from '@constants/json/chat_about.json';
import {Sizes} from '@theme';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  AboutAgentItem,
  AboutDetailArrow,
  AboutHeaderItem,
  AboutInfoItem,
} from './components';

class ChatRoomAboutScreen extends Component {
  //
  state = {
    data: chat_about,
  };

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    // TODO: fetch contact from server
  }

  renderItem({item}) {
    const {type, id} = item;
    // console.log(type);
    switch (type) {
      case 'header':
        return (
          <>
            <AboutHeaderItem {...item} />
            <View style={styles.separator} />
          </>
        );
      case 'info':
        return (
          <>
            <AboutInfoItem {...item} />
            <View style={styles.separator} />
          </>
        );
      case 'agents':
        return (
          <>
            <AboutAgentItem {...item} />
            <View style={styles.separator} />
          </>
        );
      case 'tags':
        return (
          <>
            <AddTagRow
              {...item}
              onTagChange={tags => {
                let temp = this.state.data;
                let updated = false;
                let index = 0;
                for (const item of temp) {
                  if (item.id === id) {
                    temp[index] = {
                      ...item,
                      data: tags,
                    };
                    updated = true;
                  }
                  index++;
                }
                if (updated) {
                  this.setState({data: temp});
                }
              }}
            />
            <View style={styles.separator} />
          </>
        );
      case 'details':
        const {data} = item;
        return (
          <>
            {data.map((item, index) => {
              return <AboutDetailArrow {...item} />;
            })}
            <View style={styles.separator} />
          </>
        );
      default:
        return <></>;
    }
  }

  render() {
    const {
      langStore: {lang},
    } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
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
  separator: {
    height: 10,
    backgroundColor: '#F5F5F5',
  },
  searchInput: {
    flex: 3,
  },
  filterBtn: {
    flex: 1,
    width: 32,
    height: 32,
    marginEnd: Sizes.margin.small,
  },
  chat: {
    backgroundColor: '#EDF5F9',
  },
});

export default inject('langStore')(observer(ChatRoomAboutScreen));
