import Vuex from 'vuex';
import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    user: {
      token: null,
      username: '',
      name: ''
    }
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = {
        token: null,
        username: '',
        name: ''
      };
    }
  },
  getters: {
    getUser() {
      return this.user;
    }
  }
});
