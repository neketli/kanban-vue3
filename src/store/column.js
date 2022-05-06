import {
  collection,
  query,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../main";

export default {
  state: {
    columns: [],
  },
  getters: {
    columns(state) {
      return state.columns;
    },
  },
  mutations: {
    createColumn(state, { id, title, uid }) {
      state.columns.push({
        id: id,
        title: title,
        uid: uid,
      });
    },
    updateColumn(state, payload) {
      const column = state.columns.find((col) => col.id == payload.columnId);
      column.title = payload.title;
    },
    deleteColumn(state, payload) {
      state.columns = state.columns.filter(
        (col) => col.id !== payload.columnId
      );
    },
    loadColumns(state, payload) {
      state.columns = payload;
      //   console.log(state.columns);
    },
  },
  actions: {
    async loadColumns({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const q = query(collection(db, "users", payload.uid, "columns"));
        const quetySnapshot = await getDocs(q);
        const columns = [];
        quetySnapshot.forEach((doc) => {
          columns.push(doc.data());
          //   console.log(doc.data());
        });
        commit("loadColumns", columns);

        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },

    async createColumn({ commit, getters }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const newColumn = {
          id: Date.now().toString(),
          title: "New board",
          uid: getters.uid,
        };
        // console.log(newColumn);
        await setDoc(
          doc(db, "users", newColumn.uid, "columns", newColumn.id),
          newColumn
        );
        // console.log(column);
        commit("createColumn", newColumn);

        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },

    async deleteColumn({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        // console.log(newColumn);
        const q = query(collection(db, "users", getters.uid, "items"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((d) => {
          if (d.data().columnId === payload.columnId) {
            deleteDoc(doc(db, "users", getters.uid, "items", d.data().id));
          }
        });
        await deleteDoc(
          doc(db, "users", getters.uid, "columns", payload.columnId)
        );
        // console.log(column);
        commit("deleteColumn", payload);

        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },

    async updateColumn({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        await updateDoc(
          doc(db, "users", getters.uid, "columns", payload.columnId),
          {
            title: payload.title,
          }
        );
        commit("updateColumn", payload);

        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
  },
};
