<template>
  <div class="mb-4">
    <h1 class="text-left">Links</h1>
    <SearchBar v-model:searchKeyword="searchKeyword" @search="search" />
    <hr />
    <UrlList :urls="UrlStore.getUrls" @editUrl="editUrl" />
    <EditUrlDialog
      v-model:visible="visible"
      v-model:title="nowEditTitle"
      :shortUrl="nowEditShortUrl"
      v-model:nowEditSelectShortUrl="nowEditSelectShortUrl"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import 'vue3-toastify/dist/index.css';
import { ShortUrlModel } from '../models/UrlModel';

import EditUrlDialog from './EditUrlDialog.vue';
import UrlList from './UrlList.vue';
import SearchBar from './SearchBar.vue';
import urlService from '../service/url';
import { useUrlStore } from '../stores/UrlStore';
import { transferIdModel } from '../utils/transfer';

const UrlStore = useUrlStore();

const props = defineProps({
  urlMap: {
    required: true,
    type: Object
  }
});

const visible = ref(false);
const nowEditTitle = ref('');
const nowEditShortUrl = ref('');
const nowEditSelectShortUrl = ref('');
const searchKeyword = ref('');

const search = async () => {
  const data = await urlService.getAllUrl(searchKeyword.value);
  UrlStore.setUrl(data.map((item) => transferIdModel(item)));
};

const editUrl = (urlObj: ShortUrlModel) => {
  nowEditTitle.value = urlObj.title;
  nowEditShortUrl.value = urlObj.shortUrl;
  nowEditSelectShortUrl.value = urlObj.shortUrl;
  visible.value = true;
};
</script>
<style scoped></style>
