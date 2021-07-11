import { createStore } from 'vuex';

import user from './user/index.js';
import socket from './socket/index.js';

const Store = createStore({
  modules: {
    user,
    socket,
  },
});

export default Store;
