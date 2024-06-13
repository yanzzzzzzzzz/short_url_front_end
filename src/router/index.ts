import { createRouter, createWebHistory } from 'vue-router';
import Home from '../view/Home.vue';
import Login from '../view/Login.vue';
import Navbar from '../components/Navbar.vue';
import Signup from '../view/Signup.vue';
import UserInfo from '../view/UserInfo.vue';
import userService from '../service/user';
import { useUserStore } from '../stores/UserStore';
import loginService from '../service/login';

const fetchUserInfo = async (next: any) => {
  try {
    const userStore = useUserStore();
    const data = await userService.getUser();

    if (!data) {
      userStore.clearUser();
      userStore.setIsLogin(false);
    } else {
      userStore.setUser(data);
      userStore.setIsLogin(true);
    }

    next();
  } catch (error) {
    next();
  }
};

const routes = [
  {
    path: '/',
    component: Navbar,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter: (_to: any, _from: any, next: any) => {
          fetchUserInfo(next);
        }
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
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: UserInfo,
        meta: { requiresAuth: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});
router.beforeEach(async (to, _from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    try {
      await loginService.authentication();
      next();
    } catch (error) {
      next({ name: 'home' });
    }
  } else {
    next();
  }
});
export default router;
