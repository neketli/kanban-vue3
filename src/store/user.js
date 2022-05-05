import firebase from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default {
  state: {
    uid: null,
  },
  mutations: {
    setUser(state, { uid }) {
      state.uid = uid;
    },
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      const auth = getAuth();
      commit("clearError");
      commit("setLoading", true);
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("setUser", { uid: user.user.uid });
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    async loginUser({ commit }, { email, password }) {
      const auth = getAuth();
      commit("clearError");
      commit("setLoading", true);
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        commit("setUser", { uid: user.user.uid });
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    loggedUser({ commit }, payload) {
      commit("setUser", { uid: payload !== null ? payload.uid : null });
    },
    logoutUser({ commit }) {
      signOut(getAuth());
      commit("setUser", { uid: null });
    },
  },
  getters: {
    user(state) {
      return state.uid;
    },
    checkUser(state) {
      return state.uid !== null;
    },
  },
};
