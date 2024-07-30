import {OptionsModal} from '@components';
import {Config} from '@constants';
import strings from '@localization/Localization';
import {iconLang} from '@src/assets/images';
import {isIOS, langTitle} from '@utils/common';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {SectionList, StatusBar, StyleSheet, View} from 'react-native';
import {SectionDetailsItem, SectionHeader} from './components';

const Settings = [
  {
    title: strings.systemSettings,
    localizedKey: 'systemSettings',
    data: [
      {
        type: 'lang',
        img: iconLang,
        title: strings.language,
        localizedKey: 'language',
        details: 'English',
      },
    ],
  },
];

class SettingsScreen extends Component {
  //
  state = {
    settings: Settings,
    isLangModalVisible: false,
  };

  constructor(props) {
    super(props);
    this.setupData = this.setupData.bind(this);
    this.onLangModalPress = this.onLangModalPress.bind(this);
    this.onLangModalCancelPress = this.onLangModalCancelPress.bind(this);
  }

  componentDidMount() {
    this.setupData();
  }

  setupData() {
    const {settings} = this.state;
    // let updated = false;
    // console.log(strings.getLanguage());
    let index = 0;
    for (const setting of settings) {
      let subIndex = 0;
      const {data, localizedKey} = setting;
      settings[index]['title'] = strings.getString(localizedKey);
      for (const item of data) {
        const {type, localizedKey} = item;
        switch (type) {
          case 'lang':
            data[subIndex] = {
              ...item,
              title: strings.getString(localizedKey),
              details: langTitle(strings.getLanguage()),
            };
            settings[index]['data'] = data;
            break;
        }
        subIndex++;
      }
      index++;
    }
    this.setState({settings: settings});
    // console.log('yes');
  }

  onItemPress(props) {
    const {type} = props;
    switch (type) {
      case 'lang':
        this.setState({isLangModalVisible: true});
        break;
    }
  }

  async onLangModalPress(item) {
    const {value} = item;
    const {langStore} = this.props;
    await langStore.setLang(value);
    this.setState({isLangModalVisible: false});
    this.setupData();
  }

  onLangModalCancelPress() {
    this.setState({isLangModalVisible: false});
  }

  render() {
    return (
      <View style={styles.container}>
        {isIOS() && <StatusBar barStyle="dark-content" />}
        <SectionList
          sections={this.state.settings}
          keyExtractor={({type}, index) => type + index}
          renderItem={({item}) => (
            <SectionDetailsItem
              {...item}
              onPress={() => {
                this.onItemPress(item);
              }}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <SectionHeader title={title} />
          )}
        />
        <OptionsModal
          items={Config.langs}
          isModalVisible={this.state.isLangModalVisible}
          onPress={this.onLangModalPress}
          onCancelPress={this.onLangModalCancelPress}
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

export default inject('langStore')(observer(SettingsScreen));
