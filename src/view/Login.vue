<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import loginService from "../service/login";
export default {
  data() {
    return {
      username: "mluukkai",
      password: "salainen",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      // Perform login validation. Here we just check if the username and password are not empty.
      if (this.username && this.password) {
        // Perform login action here
        const response = await loginService.login({
          username: this.username,
          password: this.password,
        });
        console.log("response", response);
      } else {
        this.errorMessage = "Please enter both username and password.";
      }
    },
  },
};
</script>
<style>
input[type="text"],
input[type="password"] {
  margin: 10px 0;
}
</style>
