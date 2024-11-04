<template>
  <div class="wrapper">
    <header>
      <button @click="logout">Logout</button>
    </header>
    <section>
      <main>
        <div
          v-for="(msg, index) in messages"
          :key="'index_' + index"
          :class="['message', sentOrReceived(msg.userUID)]"
        >
          <!-- <img :src="msg.photoURL" :alt="msg.displayName" /> -->
          <span class="avatar-wrapper">
            <svg
              class="avatar-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.62854"
                y="0.359985"
                width="15"
                height="15"
                rx="7.5"
                fill="white"
              ></rect>
              <path
                d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                fill="currentColor"
              ></path>
              <path
                d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          <p>{{ msg.text }}</p>
        </div>
        <div ref="scrollable"></div>
      </main>
      <form @submit.prevent="sendMessage">
        <input type="text" placeholder="enter the message" v-model="message" />
        <button :disabled="!message" type="submit">📩</button>
      </form>
    </section>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export default {
  data() {
    return {
      user: getAuth().currentUser,
      db: getFirestore(),
      message: "",
      messages: [],
      unsubscribe: null,
    };
  },

  mounted() {
    // Setup realtime listener using Firestore v9 syntax
    const messagesRef = collection(this.db, "messages");
    const q = query(messagesRef, orderBy("createdAt"));

    this.unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Scroll to bottom after messages update
      this.$nextTick(() => {
        this.$refs.scrollable?.scrollIntoView({ behavior: "smooth" });
      });
    });
  },

  unmounted() {
    // Clean up listener when component is destroyed
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },

  methods: {
    sentOrReceived(userUID) {
      return userUID === this.user?.uid ? "sent" : "received";
    },

    async logout() {
      try {
        const auth = getAuth();
        await signOut(auth);
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },

    async sendMessage() {
      if (!this.message.trim()) return;

      try {
        const messageInfo = {
          userUID: this.user.uid,
          displayName: this.user.displayName,
          photoURL: this.user.photoURL,
          text: this.message.trim(),
          createdAt: Date.now(),
        };

        const messagesRef = collection(this.db, "messages");
        await addDoc(messagesRef, messageInfo);
        this.message = "";

        // Scroll to bottom after sending
        this.$refs.scrollable?.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
  },
};
</script>
<style lang="scss">
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}
.avatar-wrapper {
  display: inline-block;
  width: 62px;
  height: 62px;
  background-color: #f3f4f6; /* bg-gray-100 */
  border-radius: 50%; /* rounded-full */
  overflow: hidden;
}

.avatar-icon {
  width: 100%; /* size-full */
  height: 100%;
  color: #d1d5db; /* text-gray-300 */
}
.wrapper {
  text-align: center;
  max-width: 728px;
  margin: 0 auto;

  header {
    background-color: #181717;
    height: 10vh;
    min-height: 50px;
    color: white;
    position: fixed;
    width: 100%;
    max-width: 728px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 99;
    padding: 10px;
    box-sizing: border-box;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    background-color: rgb(40, 37, 53);

    main {
      padding: 10px;
      height: 75vh;
      margin: 10vh 0 10vh;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;

      &::-webkit-scrollbar {
        width: 0.25rem;
      }

      &::-webkit-scrollbar-track {
        background: #1e1e24;
      }

      &::-webkit-scrollbar-thumb {
        background: #6649b8;
      }
    }

    form {
      height: 10vh;
      position: fixed;
      bottom: 0;
      background-color: rgb(24, 23, 23);
      width: 100%;
      max-width: 728px;
      display: flex;
      font-size: 1.5rem;

      button {
        width: 20%;
        background-color: rgb(56, 56, 143);
      }

      input {
        line-height: 1.5;
        width: 100%;
        font-size: 1.5rem;
        background: rgb(58, 58, 58);
        color: white;
        outline: none;
        border: none;
        padding: 0 10px;
      }
    }
  }

  button {
    background-color: #282c34; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    font-size: 1.25rem;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  button,
  input {
    color: #fff;
    border: none;
  }

  p {
    max-width: 500px;
    margin-bottom: 12px;
    line-height: 24px;
    padding: 10px 20px;
    border-radius: 25px;
    position: relative;
    color: white;
    text-align: center;
  }

  .message {
    display: flex;
    align-items: center;

    &.received {
      p {
        background: #e5e5ea;
        color: #000;
      }
    }

    &.sent {
      flex-direction: row-reverse;

      p {
        color: #fff;
        background: #0b93f6;
        align-self: flex-end;
      }
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 2px 5px;
    }

    p {
      max-width: 500px;
      margin-bottom: 12px;
      line-height: 24px;
      padding: 10px 20px;
      border-radius: 25px;
      position: relative;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
