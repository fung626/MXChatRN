import axios from '@utils/axios';
import {chatChannelURL} from '@utils/chat';
import {action, makeObservable, observable, runInAction} from 'mobx';

class ChatMsgStore {
  //
  data = {};

  success = false;

  fetching = false;

  constructor() {
    // makeAutoObservable(this);
    makeObservable(this, {
      data: observable,
      fetching: observable,
      post: action,
    });
  }

  post = async data => {
    // console.log(data);
    let self = this;
    try {
      const URL = await chatChannelURL(data['channel']);
      if (URL && URL !== '') {
        await axios
          .post(`${URL}/send-message`, data)
          .then(function (response) {
            const {data} = response;
            runInAction(() => {
              console.log(data.response);
              self.success = data.status;
              self.data = data.response;
              self.fetching = false;
            });
          })
          .catch(function (error) {
            console.error(error.toString());
            runInAction(() => {
              self.success = false;
              self.data = {};
              self.fetching = false;
            });
          });
      } else {
        runInAction(() => {
          self.success = false;
          self.data = {};
          self.fetching = false;
        });
      }
    } catch (error) {
      console.error(error.toString());
      runInAction(() => {
        self.success = false;
        self.data = {};
        self.fetching = false;
      });
    }
  };
}

const chatMsgStore = new ChatMsgStore();

export {chatMsgStore};

export default ChatMsgStore;
