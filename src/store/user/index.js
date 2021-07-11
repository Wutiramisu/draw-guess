export default {
  state: {
    isLogin: false,
    name: undefined,
  },
  mutations: {
    login(state, user) {
      state.isLogin = true;
      state.name = user;
    },
  },
  actions: {
    login({ commit }, user) {
      commit('login', user);
    },
  },
  getters: {
    isLogin: (state) => state.isLogin,
    name: (state) => state.name,
  },
};
