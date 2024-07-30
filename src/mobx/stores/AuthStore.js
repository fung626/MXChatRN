import AsyncStorage from '@react-native-async-storage/async-storage';
import {action, makeObservable, observable, runInAction} from 'mobx';

class AuthStore {
  //
  token = null;

  user = {};

  constructor() {
    // makeAutoObservable(this);
    this.onLoad();
    makeObservable(this, {
      token: observable,
      user: observable,
      onLoad: action,
      logout: action,
    });
  }

  onLoad = async () => {
    const token = await AsyncStorage.getItem('@token');
    const user = await AsyncStorage.getItem('@user');
    runInAction(() => {
      this.token = token;
      this.user = JSON.parse(user);
    });
  };

  logout = async () => {
    await AsyncStorage.removeItem('@user');
    await AsyncStorage.removeItem('@token');
    runInAction(() => {
      this.token = null;
      this.user = {};
    });
  };
}

const authStore = new AuthStore();

export {authStore};

export default AuthStore;
