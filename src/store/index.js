import { createStore } from "vuex";

import user from "./user";
import common from "./common";
import item from "./item";
import column from "./column";

export default createStore({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    user,
    common,
    item,
    column,
  },
});
