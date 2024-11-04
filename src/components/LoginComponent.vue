<!-- <template>
  <div class="login-container">
    <button @click="loginSubmit">Login with Google!</button>
  </div>
</template> -->

<template>
  <div class="login-wrapper">
    <div class="card">
      <h4 class="title">{{ isLogin ? "Login" : "Sign Up" }}</h4>
      <form @submit.prevent="handleSubmit">
        <!-- Email Field -->
        <div class="field">
          <svg
            class="input-icon"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"
            ></path>
          </svg>
          <input
            v-model="email"
            autocomplete="email"
            placeholder="Email"
            class="input-field"
            name="email"
            type="email"
            required
          />
        </div>

        <!-- Password Field -->
        <div class="field">
          <svg
            class="input-icon"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"
            ></path>
          </svg>
          <input
            v-model="password"
            autocomplete="current-password"
            placeholder="Password"
            class="input-field"
            name="password"
            type="password"
            required
          />
        </div>

        <!-- Error Message -->
        <p v-if="error" class="error-message">{{ error }}</p>

        <!-- Submit Button -->
        <button class="btn submit-btn" type="submit" :disabled="isLoading">
          {{ isLogin ? "Login" : "Sign Up" }}
        </button>

        <!-- Google Sign In -->
        <!-- <button
          class="btn google-btn"
          type="button"
          @click="loginWithGoogle"
          :disabled="isLoading"
        >
          <svg
            class="google-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Sign in with Google
        </button> -->

        <!-- Toggle Login/Signup -->
        <div class="toggle-container">
          <a href="#" class="btn-link" @click.prevent="toggleMode">
            {{
              isLogin
                ? "Need an account? Sign up"
                : "Already have an account? Login"
            }}
          </a>
          <a
            v-if="isLogin"
            href="#"
            class="btn-link"
            @click.prevent="forgotPassword"
          >
            Forgot your password?
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
      isLogin: true,
      error: null,
      isLoading: false,
    };
  },
  methods: {
    async loginWithGoogle() {
      try {
        const auth = getAuth();
        const googleProvider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Successfully logged in:", result.user);
      } catch (error) {
        console.error("Error during Google login:", error.message);
      }
    },
    async handleSubmit() {
      if (this.isLogin) {
        await this.loginWithEmail();
      } else {
        await this.signUpWithEmail();
      }
    },

    async signUpWithEmail() {
      try {
        const auth = getAuth();
        const result = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        console.log("Successfully signed up:", result.user);
      } catch (error) {
        console.error("Error during email signup:", error.message);
      }
    },

    async loginWithEmail() {
      try {
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        console.log("Successfully logged in:", result.user);
      } catch (error) {
        console.error("Error during email login:", error.message);
      }
    },
  },
};
</script>

<style lang="scss">
.login-container {
  width: 100%;
  text-align: center;
  padding-top: 50px;

  button {
    width: 50%;
    background-color: #4e37fc;
    color: white;
    font-weight: bold;
    font-size: 18pt;
    padding: 20px;
    border-radius: 15px;
    border: none;
    box-shadow: #00000040 0px 5px 10px;
    cursor: pointer;

    &:hover {
      background-color: #7562ff;
    }
  }
}
/* From Uiverse.io by alexruix */
.card {
  margin-left: 34vw;
  margin-right: 34vw;
  width: 250px;
  padding: 4rem;
  text-align: center;
  background: #2a2b38;
}

/*Inputs*/
.field {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  background-color: #1f2029;
  border-radius: 4px;
  padding: 0.5em 1em;
}

.input-icon {
  height: 1em;
  width: 1em;
  fill: #ffeba7;
}

.input-field {
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: #d3d3d3;
}

/*Text*/
.title {
  margin-bottom: 1rem;
  font-size: 1.5em;
  font-weight: 500;
  color: #f5f5f5;
}

/*Buttons*/
.btn {
  margin: 1rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.8em;
  text-transform: uppercase;
  padding: 0.6em 1.2em;
  background-color: #ffeba7;
  color: #5e6681;
  box-shadow: 0 8px 24px 0 rgb(255 235 167 / 20%);
  transition: all 0.3s ease-in-out;
}

.btn-link {
  color: #f5f5f5;
  display: block;
  font-size: 0.75em;
  transition: color 0.3s ease-out;
}

/*Hover & focus*/
.field input:focus::placeholder {
  opacity: 0;
  transition: opacity 0.3s;
}

.btn:hover {
  background-color: #5e6681;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgb(16 39 112 / 20%);
}

.btn-link:hover {
  color: #ffeba7;
}
</style>
