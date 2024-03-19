import { defineStore } from 'pinia';

export const useUserStore = defineStore('UserStore', {
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
