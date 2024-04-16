<template>
  <div class="container pt-2" style="text-align: center">
    <UrlHeader />
    <UrlShortenForm
      v-model:url="url"
      v-model:customShortUrl="customShortUrl"
      @generateUrl="generateUrl"
    />
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
import { useUrlStore } from '../stores/UrlStore';
import 'vue3-toastify/dist/index.css';
import { ShortUrlModel } from '../models/UrlModel';
import {
  showLoginSuccessNotification,
  showTokenExpireNotification,
  showErrorNotification,
  showAddUrlSuccessNotification
} from '../utils/notifications';
import { useMessageStore } from '../stores/MessageStore';

const messageStore = useMessageStore();
const userStore = useUserStore();
const UrlStore = useUrlStore();
const url = ref('');
const customShortUrl = ref('');

const addUrl = (shortUrlModel: ShortUrlModel): void => {
  UrlStore.addUrl(shortUrlModel);
  showAddUrlSuccessNotification();
};

const deleteUrl = async (urlObj: ShortUrlModel): Promise<void> => {
  UrlStore.deleteUrl(urlObj);
  const response = await urlService.deleteUrl(urlObj.shortUrl);
};

const generateUrl = async (): Promise<void> => {
  try {
    const shortUrlModel = await urlService.createShortUrl(url.value, customShortUrl.value);
    addUrl({
      ...shortUrlModel,
      fullShortUrl: `${window.location.origin}/api/url/${shortUrlModel.shortUrl}`
    });
    url.value = '';
    messageStore.setErrorMessage('');
  } catch (error) {
    messageStore.setErrorMessage(error.response.data.error);
  }
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
          shortUrl: item.shortUrl,
          originUrl: item.originUrl,
          fullShortUrl: `${window.location.origin}/api/url/${item.shortUrl}`,
          previewImage: item.previewImage,
          createTime: item.createTime,
          title: item.title
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
