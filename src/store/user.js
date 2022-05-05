import firebase from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  state: {
    user: {
      id: null,
    },
  },
  mutations: {
    setUser(state, { id }) {},
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      const auth = getAuth();

      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      commit("setUser", user.user.id);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    checkUser(state) {
      return state.user.id !== null;
    },
  },
};
