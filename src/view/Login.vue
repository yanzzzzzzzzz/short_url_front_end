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
      <button type="submit" data-cy="submit">Login</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import loginService from '../service/login';
import urlService from '../service/url';
export default {
  data() {
    return {
      username: 'mluukkai',
      password: 'salainen',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      if (this.username && this.password) {
        const response = await loginService.login({
          username: this.username,
          password: this.password,
        });
        if (response.token) {
          console.log('response', response);
          urlService.setToken(response.token);
          this.$store.dispatch('setUser', {
            token: response.token,
            username: response.username,
            name: response.name,
          });
          console.log('this.$store.state.user', this.$store.state.user);
          this.$router.push({ name: 'home' });
        }
      } else {
        this.errorMessage = 'Please enter both username and password.';
      }
    },
  },
};
</script>
<style>
input[type='text'],
input[type='password'] {
  margin: 10px 0;
}
</style>
