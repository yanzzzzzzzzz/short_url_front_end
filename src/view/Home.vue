<template>
  <div class="container pt-2" style="max-width: 650px; min-height: 300px">
    <UrlHeader />
    <UrlInputForm v-model="url" @generateUrl="generateUrl" />
    <UrlDisplayList :urlMap="UrlStore.urls" @deleteUrl="deleteUrl" />
  </div>
  <UrlIntroduction />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import urlService from '../service/url';
import UrlDisplayList from '../components/UrlDisplayList.vue';
import UrlInputForm from '../components/UrlInputForm.vue';
import UrlHeader from '../components/UrlHeader.vue';
import UrlIntroduction from '../components/UrlIntroduction.vue';
import { useUserStore } from '../stores/UserStore';
import { useUrlStore } from '../stores/UrlStore';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const userStore = useUserStore();
const UrlStore = useUrlStore();
const url = ref('');

const addUrl = (url: string, shortUrl: string): void => {
  UrlStore.addUrl({ originUrl: url, shortUrl });
  AddUrlSuccessNotify();
};

const deleteUrl = async (urlObj: { originUrl: string; shortUrl: string }): Promise<void> => {
  UrlStore.deleteUrl(urlObj);
  const response = await urlService.deleteUrl(urlObj.shortUrl);
};

const generateUrl = async (): Promise<void> => {
  const data = await urlService.createShortUrl(url.value);
  addUrl(url.value, data.shortUrl);
};

onMounted(async () => {
  if (localStorage.getItem('loginInfo')) {
    console.log('localStorage.getItem', localStorage.getItem('loginInfo'));
    userStore.setUser(JSON.parse(localStorage.getItem('loginInfo')));
  }

  if (userStore.user.token !== null) {
    try {
      const { data } = await urlService.getAllUrl();
      UrlStore.setUrl(
        data.map((item) => ({
          originUrl: item.originUrl,
          shortUrl: item.shortUrl
        }))
      );
      LoginSuccessNotify(userStore.user.username);
    } catch (error) {
      if (error.response.status === 401) {
        TokenExpireNotify();
        localStorage.removeItem('loginInfo');
      } else {
        OtherErrorNotify(error.response.data.error);
      }
    }
  }
});

const LoginSuccessNotify = (username) => {
  toast(`Hello! ${username}!`, {
    theme: 'auto',
    type: 'success',
    position: 'bottom-right',
    autoClose: 2000,
    dangerouslyHTMLString: true
  });
};
const TokenExpireNotify = () => {
  toast(`Token expired! please refresh page and login!`, {
    theme: 'auto',
    type: 'error',
    position: 'bottom-right',
    autoClose: 2000,
    dangerouslyHTMLString: true
  });
};
const OtherErrorNotify = (errorMessage) => {
  toast(`Error ${errorMessage}`, {
    theme: 'auto',
    type: 'error',
    position: 'bottom-right',
    autoClose: 2000,
    dangerouslyHTMLString: true
  });
};
const AddUrlSuccessNotify = () => {
  toast('Add url success', {
    theme: 'auto',
    type: 'default',
    position: 'bottom-right',
    autoClose: 2000,
    dangerouslyHTMLString: true
  });
};
</script>
