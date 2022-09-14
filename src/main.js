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
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
  measurementId: process.env.VUE_APP_measurementId,
});

let app;

onAuthStateChanged(getAuth(), (user) => {
  store.dispatch("loggedUser", user);
  if (!app) {
    app = createApp(App).use(store).use(router).use(VueFire).mount("#app");
  }
  if (user) {
    store.dispatch("loadColumns", { uid: user.uid });
    store.dispatch("loadItems", { uid: user.uid });
  }
});

export const db = getFirestore(fireApp);
