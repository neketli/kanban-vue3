import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default {
  state: {
    user: {
      uid: null,
      columns: [],
      items: [],
    },
  },
  mutations: {
    setUser(state, { uid }) {
      state.user.uid = uid;
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

    async initColumns({ commit, getters }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        //todo
        let newColumn = {
          id: Date.now().toString(),
          title: "To Do &#128080;",
          uid: getters.uid,
        };
        await setDoc(
          doc(db, "users", newColumn.uid, "columns", newColumn.id),
          newColumn
        );
        commit("createColumn", newColumn);

        const newItem = {
          id: Date.now().toString(),
          columnId: newColumn.columnId,
          title: "Test item! U can drag me!",
          uid: getters.uid,
        };
        await setDoc(
          doc(db, "users", newItem.uid, "items", newItem.id),
          newItem
        );
        commit("createItem", newItem);

        newColumn = {
          id: Date.now().toString(),
          title: "In progress &#128293;",
          uid: getters.uid,
        };
        await setDoc(
          doc(db, "users", newColumn.uid, "columns", newColumn.id),
          newColumn
        );
        commit("createColumn", newColumn);
        newColumn = {
          id: Date.now().toString(),
          title: "Done &#128077;",
          uid: getters.uid,
        };
        await setDoc(
          doc(db, "users", newColumn.uid, "columns", newColumn.id),
          newColumn
        );
        commit("createColumn", newColumn);

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
    uid(state) {
      return state.user.uid;
    },
    checkUser(state) {
      return state.user.uid !== null;
    },
  },
};
