import Vuex from 'vuex';

const store = new Vuex.Store({
  state: {
    user: {
      token: null,
      username: '',
      name: '',
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
});

export default store;
