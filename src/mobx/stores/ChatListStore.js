import {makeObservable, observable} from 'mobx';

class ChatListStore {
  //
  selectedFilter = [];

  constructor() {
    // makeAutoObservable(this);
    makeObservable(this, {
      selectedFilter: observable,
    });
  }
}

const chatListStore = new ChatListStore();

export {chatListStore};

export default ChatListStore;
