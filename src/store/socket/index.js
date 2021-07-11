import io from 'socket.io-client';

export default {
  state: {
    socket: null,
  },
  mutations: {
    socketConnect(state) {
      state.socket = io(import.meta.env.VITE_SOCKET);
    },
  },
  actions: {
    socketConnect({ commit }) {
      commit('socketConnect');
    },
  },
  getters: {
    socket: (state) => state.socket,
  },
};
