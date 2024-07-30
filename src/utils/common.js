import {Config} from '@constants';
import {
  allChannelIcon,
  avatarFbMessengerIcon,
  avatarWechatIcon,
  avatarWhatsappBusinessIcon,
  avatarWhatsappIcon,
  fbMessagerFilterIcon,
  wechatFilterIcon,
  whatsappBusinessFilterIcon,
  whatsappFilterIcon,
} from '@src/assets/images';
import {Platform} from 'react-native';

export function isIOS() {
  return Platform.OS === 'ios';
}

export function isScrollEnded(event) {
  let mHeight = event.nativeEvent.layoutMeasurement.height;
  let cSize = event.nativeEvent.contentSize.height;
  let Y = event.nativeEvent.contentOffset.y;
  if (Math.ceil(mHeight + Y) >= cSize) {
    return true;
  }
  return false;
}

export function copy(value) {
  return JSON.parse(JSON.stringify(value));
}

export function strContains(value, search) {
  let _value = value.toUpperCase();
  let _search = search.toUpperCase();
  if (_value.indexOf(_search) > -1) {
    return true;
  }
  return false;
}

export function filterWithKeys(filters = [], data = []) {
  let array = data;
  for (const filter of filters) {
    const {type, keys} = filter;
    for (const key of keys) {
      if (key && key !== '' && key !== 'all') {
        // console.log(key);
        array = array.filter(item => item[type] === key);
      }
    }
  }
  // console.log(array);
  return array;
}

export function selectedFilterKeys(type, options = []) {
  let keys = [];
  const option = options.find(item => strContains(item['type'], type));
  if (option) {
    const {data} = option;
    if (Array.isArray(data) && data.length > 0) {
      const temp = data
        .filter(item => item['selected'] === true)
        .map(item => item['type']);
      if (temp.length > 0) {
        keys = [...keys, ...temp];
      }
    }
  }
  return {
    type: type,
    keys: keys,
  };
}

export function langTitle(value) {
  let title = Config.defaultLangTitle;
  for (const lang of Config.langs) {
    // console.log('lang');
    if (lang.value === value) {
      title = lang.text;
    }
  }
  return title;
}

export function avatarMsgImg(type) {
  switch (type) {
    case 'whatsapp':
      return avatarWhatsappIcon;
    case 'whatsapp_business':
      return avatarWhatsappBusinessIcon;
    case 'facebook':
      return avatarFbMessengerIcon;
    case 'wechat':
      return avatarWechatIcon;
    default:
      return null;
  }
}

export function msgTypeImg(type) {
  switch (type) {
    case 'all':
      return allChannelIcon;
    case 'whatsapp':
      return whatsappFilterIcon;
    case 'whatsapp_business':
      return whatsappBusinessFilterIcon;
    case 'facebook':
      return fbMessagerFilterIcon;
    case 'wechat':
      return wechatFilterIcon;
    default:
      return allChannelIcon;
  }
}
