import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '@utils/axios';
import {action, makeObservable, observable, runInAction} from 'mobx';

class ProfileStore {
  //
  data = {};

  success = false;

  fetching = false;

  constructor() {
    // makeAutoObservable(this);
    makeObservable(this, {
      data: observable,
      fetching: observable,
      get: action,
    });
  }

  get = async data => {
    // console.log(data);
    let self = this;
    try {
      const token = await AsyncStorage.getItem('@token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      await axios
        .post('users/profile', data, {headers: headers})
        .then(function (response) {
          const {data, success, token} = response.data;
          // console.log(token);
          runInAction(() => {
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

const profileStore = new ProfileStore();

export {profileStore};

export default ProfileStore;
