import {MySearchInput, SectionHeader} from '@components';
import chat_list from '@constants/json/chat_list.json';
import chat_room from '@constants/json/chat_room.json';
import filter_options from '@constants/json/filter_options.json';
import strings from '@localization/Localization';
import {filterBtn, filterSelectedBtn, searchIcon} from '@src/assets/images';
import {Sizes} from '@theme';
import {copy, filterWithKeys, isIOS, selectedFilterKeys} from '@utils/common';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareSectionList} from 'react-native-keyboard-aware-scroll-view';
import {ChatListContactItem, ChatListMsgItem, FilterView} from './components';

const DefaultSearchResult = [
  {
    type: 'contact',
    title: strings.contact,
    localizedKey: 'contact',
    data: [],
  },
  {
    type: 'messages',
    title: strings.messages,
    localizedKey: 'messages',
    data: [],
  },
];

class ChatListScreen extends Component {
  //
  state = {
    isSearching: false,
    isFiltering: false,
    searchResult: DefaultSearchResult,
    filterOptions: filter_options,
  };

  constructor(props) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onFilterPress = this.onFilterPress.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderSectionItem = this.renderSectionItem.bind(this);
    this.renderView = this.renderView.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    // TODO: fetch contact from server
  }

  renderItem({item}) {
    const {filterOptions} = this.state;
    return (
      <ChatListContactItem
        {...item}
        filterOptions={filterOptions}
        onPress={() => {
          this.props.navigation.navigate('ChatRoom', item);
        }}
      />
    );
  }

  renderView({isSearching, searchResult, isFiltering, filterOptions}) {
    let filterKeys = [
      selectedFilterKeys('contact_type', filterOptions),
      selectedFilterKeys('channel', filterOptions),
    ];
    const filtered = filterWithKeys(filterKeys, chat_list);
    if (isSearching) {
      return (
        <KeyboardAwareSectionList
          sections={searchResult}
          renderItem={this.renderSectionItem}
          renderSectionHeader={({section}) => {
            const {localizedKey} = section;
            return <SectionHeader title={strings.getString(localizedKey)} />;
          }}
          keyExtractor={(item, index) => index + item}
          keyboardShouldPersistTaps="always"
        />
      );
    }
    if (isFiltering) {
      return (
        <FilterView
          options={copy(filterOptions)}
          onConfirm={options => {
            // console.log(options[0].data[1]);
            this.setState({
              filterOptions: options,
              isFiltering: false,
            });
          }}
          onCancel={() => {
            this.setState({
              isFiltering: false,
            });
          }}
        />
      );
    }
    return (
      <FlatList
        data={filtered}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
    );
  }

  renderSectionItem = ({section, item}) => {
    // console.log(item);
    const {type} = section;
    switch (type) {
      case 'contact':
        return (
          <ChatListContactItem
            {...item}
            onPress={() => {
              this.props.navigation.navigate('ChatRoom', item);
              Keyboard.dismiss();
            }}
          />
        );
      case 'messages':
        return <ChatListMsgItem {...item} />;
      default:
        return null;
    }
  };

  onSearchChange(value) {
    let contact = chat_list.filter(item => {
      if (value === '' || value === null) {
        return false;
      }
      const {name, contact} = item.user;
      return name.indexOf(value) !== -1 || contact.indexOf(value) !== -1;
    });

    let messages = chat_room.filter(item => {
      if (value === '' || value === null) {
        return false;
      }
      const {name, contact} = item.user;
      return name.indexOf(value) !== -1 || contact.indexOf(value) !== -1;
    });

    let result = [
      {
        type: 'contact',
        title: strings.contacts,
        localizedKey: 'contact',
        data: contact,
      },
      {
        title: 'Messages',
        type: strings.messages,
        localizedKey: 'messages',
        data: messages,
      },
    ];
    this.setState({
      searchResult: result,
    });
  }

  onFilterPress() {
    Keyboard.dismiss();
    this.setState({
      isSearching: false,
      isFiltering: !this.state.isFiltering,
    });
  }

  render() {
    const {isFiltering} = this.state;
    const {
      langStore: {lang},
    } = this.props;

    // console.log(langStore);
    return (
      <View style={styles.container}>
        {isIOS() && <StatusBar barStyle="dark-content" />}
        <View style={styles.searchContainer}>
          <View style={styles.searchInput}>
            <MySearchInput
              iconSource={searchIcon}
              placeholder={strings.search}
              onChange={this.onSearchChange}
              onFocus={() => {
                this.setState({
                  isSearching: true,
                  isFiltering: false,
                });
              }}
              onBlur={() => {
                this.setState({
                  isSearching: false,
                });
              }}
            />
          </View>
          <TouchableOpacity onPress={this.onFilterPress}>
            <Image
              style={styles.filterBtn}
              source={isFiltering ? filterSelectedBtn : filterBtn}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {this.renderView(this.state)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
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

export default inject('langStore')(observer(ChatListScreen));
