<template>
  <div class="container pt-2" style="max-width: 650px; min-height: 300px">
    <UrlHeader />
    <UrlInputForm v-model="url" @generateUrl="generateUrl" />
    <ShowUrl :urlMap="urls" @deleteUrl="deleteUrl" />
  </div>
  <UrlIntroduction />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import urlService from '../service/url';
import ShowUrl from '../components/showUrl.vue';
import UrlInputForm from '../components/UrlInputForm.vue';
import UrlHeader from '../components/UrlHeader.vue';
import UrlIntroduction from '../components/UrlIntroduction.vue';
import store from '../store';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const url = ref('');
const urls = ref<Array<{ originUrl: string; shortUrl: string }>>([]);

const addUrl = (url: string, shortUrl: string): void => {
  urls.value = [...urls.value, { originUrl: url, shortUrl }];
  AddUrlSuccessNotify();
};

const deleteUrl = async (urlObj: { originUrl: string; shortUrl: string }): Promise<void> => {
  urls.value = urls.value.filter((u) => u.shortUrl !== urlObj.shortUrl);
  const response = await urlService.deleteUrl(urlObj.shortUrl);
};

const generateUrl = async (): Promise<void> => {
  const data = await urlService.createShortUrl(url.value);
  addUrl(url.value, data.shortUrl);
};

onMounted(async () => {
  if (localStorage.getItem('loginInfo')) {
    console.log('localStorage.getItem', localStorage.getItem('loginInfo'));

    store.dispatch('setUser', JSON.parse(localStorage.getItem('loginInfo')));
  }

  if (store.state.user.token !== null) {
    try {
      const { data } = await urlService.getAllUrl();
      urls.value = data.map((item) => ({
        originUrl: item.originUrl,
        shortUrl: item.shortUrl
      }));
      LoginSuccessNotify(store.state.user.username);
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

const getShortUrlList = (): string | null => {
  return localStorage.getItem('shortUrl');
};

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
