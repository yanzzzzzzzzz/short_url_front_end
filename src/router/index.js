import { createRouter, createWebHistory } from 'vue-router';
import Home from '../view/Home.vue';
import Login from '../view/Login.vue';
import Navbar from '../components/Navbar.vue';
import Signup from '../view/Signup.vue';
const routes = [
  {
    path: '/',
    component: Navbar,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/signup',
        name: 'signup',
        component: Signup
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export default router;
