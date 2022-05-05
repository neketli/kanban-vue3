import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { db } from "../main";
import { collection, addDoc } from "firebase/firestore";

import user from "./user";

export default createStore({
  state: {
    columns: [
      {
        id: 1,
        title: "First board",
      },
      {
        id: 2,
        title: "Second board",
      },
    ],
    items: [
      {
        id: 1,
        columnId: 1,
        title: "Item 1",
      },
      {
        id: 2,
        columnId: 2,
        title: "Item 2",
      },
      {
        id: 3,
        columnId: 2,
        title: "Item 3",
      },
    ],
  },
  getters: {
    getColumns(state) {
      return state.columns;
    },
  },
  mutations: {
    createColumn(state, { id, title }) {
      this.state.columns.push({
        id: id,
        title: title,
      });
    },
    createItem(state, payload) {
      this.state.items.push({
        id: uuidv4(),
        title: "New Task",
        columnId: payload.columnId,
      });
    },
    updateColumn(state, payload) {
      const column = this.state.columns.find(
        (col) => col.id == payload.columnId
      );
      column.title = payload.title;
    },
    deleteColumn(state, payload) {
      this.state.columns = this.state.columns.filter(
        (col) => col.id !== payload.columnId
      );
    },
    updateItem(state, payload) {
      const item = this.state.items.find((item) => item.id == payload.itemId);
      item.title = payload.title;
    },
    deleteItem(state, payload) {
      this.state.items = this.state.items.filter(
        (item) => item.id !== payload.itemId
      );
    },
  },
  actions: {
    async createColumn({ dispatch, commit }) {
      try {
        const column = {
          id: uuidv4(),
          title: "New board",
        };
        await addDoc(collection(db, "columns"), column);
        this.commit("createColumn", column);
      } catch (e) {
        console.error(e);
      }
    },
  },
  modules: {
    user,
  },
});
