import { defineStore } from 'pinia';
import { UserInfoModel } from '../models/UserModel';
export const useUserStore = defineStore('UserStore', {
  state: (): { user: UserInfoModel, isLogin: boolean } => ({
    user: {
      username: '',
      email: ''
    },
    isLogin: false
  }),
  actions: {
    setUser(user: UserInfoModel) {
      this.user = user;
    },
    clearUser() {
      this.user = {
        username: '',
        email: ''
      };
    },
    setIsLogin(type: boolean) {
      this.isLogin = type
    }
  },
  getters: {
    getUser(): UserInfoModel {
      return this.user;
    },
    getIsLogin(): boolean {
      return this.isLogin
    }
  }
});
