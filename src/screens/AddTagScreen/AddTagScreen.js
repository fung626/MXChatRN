import {MySearchInput} from '@components';
import tags from '@constants/json/tags.json';
import strings from '@localization/Localization';
import {searchIcon} from '@src/assets/images';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import {isIOS, strContains} from '@utils/common';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TagItem} from './components';

class AddTagScreen extends Component {
  //
  state = {
    tags: tags,
    keyword: null,
  };

  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onItemOptionSelect = this.onItemOptionSelect.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    // TODO: fetch notifications data
    const {tags} = this.state;
    const {
      route: {params},
    } = this.props;
    let index = 0;
    for (const tag of tags) {
      const {id} = tag;
      tags[index] = {
        ...tag,
        selected: false,
      };
      for (const selectedTag of params.selectedTags) {
        if (id === selectedTag.id) {
          tags[index] = {
            ...tag,
            selected: true,
          };
        }
      }
      index++;
    }
    this.setState({tags: tags});
  }

  onSearchChange(value) {
    this.setState({keyword: value});
  }

  onItemOptionSelect(item) {
    const {id} = item;
    const {tags} = this.state;
    let index = 0;
    let updated = false;
    for (const tag of tags) {
      if (id === tag.id) {
        tags[index] = {
          ...tag,
          selected: !tag.selected,
        };
        updated = true;
      }
      index++;
    }
    if (updated) {
      this.setState({tags: tags});
    }
  }

  onConfirm() {
    const {
      route: {params},
      navigation,
    } = this.props;
    let temp = [];
    for (const tag of tags) {
      const {selected} = tag;
      if (selected) {
        temp = [...temp, tag];
      }
    }
    params.onTagChange(temp);
    navigation.goBack();
  }

  renderItem({item}) {
    const {keyword} = this.state;
    const {title} = item;
    if (keyword && keyword !== '' && !strContains(title, keyword)) {
      return <></>;
    }
    return (
      <TagItem
        {...item}
        onSelect={() => {
          this.onItemOptionSelect(item);
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {isIOS() && <StatusBar barStyle="dark-content" />}
        <MySearchInput
          iconSource={searchIcon}
          placeholder={strings.search}
          onChange={this.onSearchChange}
        />
        <FlatList
          data={this.state.tags}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity style={styles.btn} onPress={this.onConfirm}>
          <Text style={styles.btnText}>{strings.confirm}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: Sizes.margin.huge * 2,
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
});

export default inject('langStore')(observer(AddTagScreen));
