import axios from '@utils/axios';
import {action, makeObservable, observable, runInAction} from 'mobx';

class ForgotPwdStore {
  //
  success = false;

  fetching = false;

  constructor() {
    // makeAutoObservable(this);
    makeObservable(this, {
      success: observable,
      fetching: observable,
      post: action,
    });
  }

  post = async data => {
    // console.log(data);
    let self = this;
    self.fetching = true;
    try {
      await axios
        .post('users/forgot-password', data)
        .then(function (response) {
          const {data} = response;
          runInAction(() => {
            self.success = data === 'OK';
            self.fetching = false;
          });
        })
        .catch(function (error) {
          console.error(error.toString());
          runInAction(() => {
            self.success = false;
            self.fetching = false;
          });
        });
    } catch (error) {
      console.error(error.toString());
      runInAction(() => {
        self.success = false;
        self.fetching = false;
      });
    }
  };
}

const forgotPwdStore = new ForgotPwdStore();

export {forgotPwdStore};

export default ForgotPwdStore;
