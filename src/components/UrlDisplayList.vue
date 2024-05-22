<template>
  <div class="mb-4">
    <h1 class="text-left">Links</h1>
    <SearchBar v-model:searchKeyword="searchKeyword" @search="fetchData" />
    <hr />
    <UrlList :urls="UrlStore.getUrls" @editUrl="editUrl" />
    <Paginator
      v-if="UrlStore.getUrls.length > 0"
      v-model="pageInfo"
      @page="onPage($event)"
      :rows="PageInitRows"
      :totalRecords="messageCount"
      :rowsPerPageOptions="[1, 2, 3]"
    ></Paginator>
    <EditUrlDialog
      v-model:visible="visible"
      v-model:title="nowEditTitle"
      :shortUrl="nowEditShortUrl"
      v-model:nowEditSelectShortUrl="nowEditSelectShortUrl"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import 'vue3-toastify/dist/index.css';
import { ShortUrlModel } from '../models/UrlModel';

import EditUrlDialog from './EditUrlDialog.vue';
import UrlList from './UrlList.vue';
import SearchBar from './SearchBar.vue';
import urlService from '../service/url';
import { useUserStore } from '../stores/UserStore';
import { useUrlStore } from '../stores/UrlStore';
import { transferIdModel } from '../utils/transfer';
import Paginator from 'primevue/paginator';
import { getCookie } from '../utils/cookie';
import {
  showLoginSuccessNotification,
  showTokenExpireNotification,
  showErrorNotification
} from '../utils/notifications';
import { PageInfoModel } from '../models/CommonModel';
const UrlStore = useUrlStore();
const userStore = useUserStore();
const PageInitRows = ref<number>(1);
const messageCount = ref<number>(0);
const pageInfo = ref<PageInfoModel>({ page: 0, first: 0, rows: 1, pageCount: 0 });
const visible = ref(false);
const nowEditTitle = ref('');
const nowEditShortUrl = ref('');
const nowEditSelectShortUrl = ref('');
const searchKeyword = ref<string>('');
onMounted(async () => {
  const name = getCookie('username');
  if (name !== '') {
    userStore.setUser({ username: name });
  }

  if (userStore.user.username !== '') {
    try {
      fetchData();
      showLoginSuccessNotification(userStore.user.username);
    } catch (error) {
      if (error.response.status === 401) {
        showTokenExpireNotification();
        userStore.setUser({
          username: ''
        });
      } else {
        showErrorNotification(error.response.data.error);
      }
    }
  }
});
async function onPage(event: any) {
  pageInfo.value = event;
  fetchData();
}
async function fetchData() {
  const data = await urlService.getAllUrl(searchKeyword.value, pageInfo.value);
  messageCount.value = data.pagination.pageCount * data.pagination.size;
  UrlStore.setUrl(data.content.map((item) => transferIdModel(item)));
}

const editUrl = (urlObj: ShortUrlModel) => {
  nowEditTitle.value = urlObj.title;
  nowEditShortUrl.value = urlObj.shortUrl;
  nowEditSelectShortUrl.value = urlObj.shortUrl;
  visible.value = true;
};
</script>
<style scoped></style>
