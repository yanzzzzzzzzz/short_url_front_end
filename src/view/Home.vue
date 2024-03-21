<template>
  <div class="container pt-2" style="max-width: 650px; min-height: 300px">
    <UrlHeader />
    <UrlShortenForm v-model="url" @generateUrl="generateUrl" />
    <UrlDisplayList :urlMap="UrlStore.urls" @deleteUrl="deleteUrl" />
  </div>
  <UrlIntroduction />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import urlService from '../service/url';
import UrlDisplayList from '../components/UrlDisplayList.vue';
import UrlShortenForm from '../components/UrlShortenForm.vue';
import UrlHeader from '../components/UrlHeader.vue';
import UrlIntroduction from '../components/UrlIntroduction.vue';
import { useUserStore } from '../stores/UserStore';
import { useUrlStore } from '../stores/UrlStore.ts';
import 'vue3-toastify/dist/index.css';
import { ShortUrlModel } from '../models/UrlModel';
import {
  showLoginSuccessNotification,
  showTokenExpireNotification,
  showErrorNotification,
  showAddUrlSuccessNotification
} from '../utils/notifications.ts';
const userStore = useUserStore();
const UrlStore = useUrlStore();
const url = ref('');

const addUrl = (shortUrlModel: ShortUrlModel): void => {
  UrlStore.addUrl(shortUrlModel);
  showAddUrlSuccessNotification();
};

const deleteUrl = async (urlObj: { originUrl: string; shortUrl: string }): Promise<void> => {
  UrlStore.deleteUrl(urlObj);
  const response = await urlService.deleteUrl(urlObj.shortUrl);
};

const generateUrl = async (): Promise<void> => {
  const shortUrlModel = await urlService.createShortUrl(url.value);

  addUrl(shortUrlModel);
  url.value = '';
};

onMounted(async () => {
  if (localStorage.getItem('loginInfo')) {
    console.log('localStorage.getItem', localStorage.getItem('loginInfo'));
    userStore.setUser(JSON.parse(localStorage.getItem('loginInfo') || ''));
  }

  if (userStore.user.token !== '') {
    try {
      const data = await urlService.getAllUrl();
      UrlStore.setUrl(
        data.map((item) => ({
          originUrl: item.originUrl,
          shortUrl: item.shortUrl
        }))
      );
      showLoginSuccessNotification(userStore.user.username);
    } catch (error) {
      if (error.response.status === 401) {
        showTokenExpireNotification();
        localStorage.removeItem('loginInfo');
        userStore.setUser({
          token: '',
          username: '',
          name: ''
        });
      } else {
        showErrorNotification(error.response.data.error);
      }
    }
  }
});
</script>
