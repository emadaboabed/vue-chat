import Vue from "vue";
import App from "./App.vue";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCIguQF4R1T2gvkJdS1uWr7WUy0yKk-WQ4",
  authDomain: "vue-chat-75fe2.firebaseapp.com",
  projectId: "vue-chat-75fe2",
  storageBucket: "vue-chat-75fe2.firebasestorage.app",
  messagingSenderId: "491244460770",
  appId: "1:491244460770:web:ee03e78f0a1900b6161cbb",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  console.log(user);
  new Vue({
    render: (h) => h(App),
  }).$mount("#app");
});
