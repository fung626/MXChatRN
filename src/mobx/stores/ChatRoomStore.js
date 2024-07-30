import {action, makeObservable, observable} from 'mobx';

class ChatRoomStore {
  //
  isSearching = false;

  search = {};

  constructor() {
    // makeAutoObservable(this);
    makeObservable(this, {
      isSearching: observable,
      search: observable,
      setIsSearching: action,
    });
  }

  setIsSearching() {
    this.isSearching = !this.isSearching;
  }
}

const chatRoomStore = new ChatRoomStore();

export {chatRoomStore};

export default ChatRoomStore;
