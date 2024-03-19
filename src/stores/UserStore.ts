import { defineStore } from 'pinia';
import { UserModel } from '../models/UserModel';
export const useUserStore = defineStore('UserStore', {
  state: (): { user: UserModel } => ({
    user: {
      token: '',
      username: '',
      name: ''
    }
  }),
  actions: {
    setUser(user: UserModel) {
      this.user = user;
    },
    clearUser() {
      this.user = {
        token: '',
        username: '',
        name: ''
      };
    }
  },
  getters: {
    getUser(): UserModel {
      return this.user;
    }
  }
});
