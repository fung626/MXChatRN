import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '@utils/axios';
import {action, makeObservable, observable, runInAction} from 'mobx';

class LoginStore {
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
    self.fetching = true;
    try {
      // const token = await AsyncStorage.getItem('@token');
      await axios
        .post('users/login', data)
        .then(function (response) {
          const {data, success, token} = response.data;
          // console.log(token);
          runInAction(() => {
            AsyncStorage.setItem('@user', JSON.stringify(data));
            AsyncStorage.setItem('@token', JSON.stringify(token));
            self.success = success;
            self.data = data;
            self.fetching = false;
          });
        })
        .catch(function (error) {
          console.error(error.toString());
          runInAction(() => {
            if (error.response.data) {
              const {success} = error.response.data;
              self.success = success;
            }
            self.data = {};
            self.fetching = false;
          });
        });
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

const loginStore = new LoginStore();

export {loginStore};

export default LoginStore;
