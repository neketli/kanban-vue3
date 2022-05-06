import {
  collection,
  query,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../main";

export default {
  state: {
    items: [],
  },
  getters: {},
  mutations: {
    createItem(state, payload) {
      state.items.push({
        id: payload.id,
        columnId: payload.columnId,
        title: payload.title,
        uid: payload.uid,
      });
    },
    updateItem(state, payload) {
      const item = state.items.find((item) => item.id == payload.itemId);
      item.title = payload.title;
      item.columnId = payload.columnId;
    },
    deleteItem(state, payload) {
      state.items = state.items.filter((item) => item.id !== payload.itemId);
    },
    loadItems(state, payload) {
      state.items = payload;
    },
  },
  actions: {
    async loadItems({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const q = query(collection(db, "users", payload.uid, "items"));
        const quetySnapshot = await getDocs(q);
        const items = [];
        quetySnapshot.forEach((doc) => {
          items.push(doc.data());
          //   console.log(doc.data());
        });
        commit("loadItems", items);

        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },

    async createItem({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const newItem = {
          id: Date.now().toString(),
          columnId: payload.columnId,
          title: "New item",
          uid: getters.uid,
        };
        // console.log(newColumn);
        await setDoc(
          doc(db, "users", newItem.uid, "items", newItem.id),
          newItem
        );
        // console.log(column);
        commit("createItem", newItem);

        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },

    async deleteItem({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        await deleteDoc(doc(db, "users", getters.uid, "items", payload.itemId));
        commit("deleteItem", payload);

        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },

    async updateItem({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        await updateDoc(
          doc(db, "users", getters.uid, "items", payload.itemId),
          {
            title: payload.title,
            columnId: payload.columnId,
          }
        );
        commit("updateItem", payload);

        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
  },
};
