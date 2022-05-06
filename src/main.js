import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

import router from "./router";
import store from "./store";

import VueFire from "vuefire";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const fireApp = initializeApp({
  apiKey: "AIzaSyAKMAriihKNCgXNx8DofAYAJM0uv0FI5gQ",
  authDomain: "trello-clone-vue-314a5.firebaseapp.com",
  projectId: "trello-clone-vue-314a5",
  storageBucket: "trello-clone-vue-314a5.appspot.com",
  messagingSenderId: "386563669995",
  appId: "1:386563669995:web:7e1619531867bbc8c623ae",
  measurementId: "G-7DW1L74GC7",
});

let app;

onAuthStateChanged(getAuth(), (user) => {
  store.dispatch("loggedUser", user);
  if (!app) {
    app = createApp(App).use(store).use(router).use(VueFire).mount("#app");
  }
  //   console.log(user.uid);
  store.dispatch("loadColumns", { uid: user.uid });
  store.dispatch("loadItems", { uid: user.uid });
});

export const db = getFirestore(fireApp);
