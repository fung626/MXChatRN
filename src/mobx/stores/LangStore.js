import {Config} from '@constants';
import strings from '@localization/Localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {action, makeObservable, observable, runInAction} from 'mobx';

class LangStore {
  //
  lang = null;

  constructor() {
    // makeAutoObservable(this);
    this.onLoad();
    makeObservable(this, {
      lang: observable,
      onLoad: action,
      setLang: action,
    });
  }

  onLoad = async () => {
    const lang = await AsyncStorage.getItem('@lang');
    // console.log(lang);
    if (!lang) {
      // set default lang, if lang is null
      const defaultLang = Config.defaultLangValue;
      AsyncStorage.setItem('@lang', defaultLang);
      strings.setLanguage(defaultLang);
      runInAction(() => {
        this.lang = defaultLang;
      });
    } else {
      strings.setLanguage(lang);
      runInAction(() => {
        this.lang = lang;
      });
    }
  };

  setLang = async value => {
    await AsyncStorage.setItem('@lang', value);
    strings.setLanguage(value);
    runInAction(() => {
      this.lang = value;
    });
  };
}

const langStore = new LangStore();

export {langStore};

export default LangStore;
