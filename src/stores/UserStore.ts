import { defineStore } from 'pinia';
import { UserModel } from '../models/UserModel';
export const useUserStore = defineStore('UserStore', {
  state: (): { user: UserModel } => ({
    user: {
      username: ''
    }
  }),
  actions: {
    setUser(user: UserModel) {
      this.user = user;
    },
    clearUser() {
      this.user = {
        username: ''
      };
    }
  },
  getters: {
    getUser(): UserModel {
      return this.user;
    }
  }
});
