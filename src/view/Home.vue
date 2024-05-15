<template>
  <div class="container pt-2">
    <UrlHeader />
    <UrlShortenForm />
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
  showDeleteSuccessNotification
} from '../utils/notifications';
import { transferIdModel } from '../utils/transfer';
import { getCookie } from '../utils/cookie';
const userStore = useUserStore();
const UrlStore = useUrlStore();

const deleteUrl = async (urlObj: ShortUrlModel): Promise<void> => {
  try {
    await urlService.deleteUrl(urlObj.shortUrl);
    UrlStore.deleteUrl(urlObj);
    showDeleteSuccessNotification();
  } catch (error) {
    showErrorNotification(error.response.data.error);
  }
};

onMounted(async () => {
  const name = getCookie('username');
  if (name !== '') {
    userStore.setUser({ username: name });
  }

  if (userStore.user.username !== '') {
    try {
      const data = await urlService.getAllUrl();
      UrlStore.setUrl(data.map((item) => transferIdModel(item)));
      showLoginSuccessNotification(userStore.user.username);
    } catch (error) {
      if (error.response.status === 401) {
        showTokenExpireNotification();
        localStorage.removeItem('loginInfo');
        userStore.setUser({
          username: ''
        });
      } else {
        showErrorNotification(error.response.data.error);
      }
    }
  }
});
</script>
<style scoped>
.container {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
}
</style>
