import AsyncStorage from '@react-native-async-storage/async-storage';

const chatChannelURL = async channelName => {
  const result = await AsyncStorage.getItem('@user');
  const user = JSON.parse(result);
  const { channels } = user;
  if (channels && channels.length > 0) {
    for (const channel of channels) {
      if (channel['channel_name'] === channelName) {
        return channel['url'];
      }
    }
  }
  return null;
};

export { chatChannelURL };
