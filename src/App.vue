<template>
  <div id="app">
    <ChatComponent v-if="user"></ChatComponent>
    <LoginComponent v-else></LoginComponent>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ChatComponent from "./components/ChatComponent.vue";
import LoginComponent from "./components/LoginComponent.vue";

export default {
  data() {
    return {
      user: null,
    };
  },

  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      this.user = currentUser;
    });
  },

  name: "App",
  components: {
    ChatComponent,
    LoginComponent,
  },
};
</script>

<style>
body {
  background-color: #313131;
}
</style>
