<template>
  <div class="mb-4">
    <h1 class="text-left">Links</h1>
    <SearchBar v-model:searchKeyword="searchKeyword" />
    <hr />
    <UrlList :urls="urlMapSearchKeyword" @editUrl="editUrl" />
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

const urlMapSearchKeyword = computed(() => {
  if (searchKeyword.value === '') {
    return props.urlMap;
  } else {
    return props.urlMap.filter((url: ShortUrlModel) =>
      url.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
    );
  }
});

const editUrl = (urlObj: ShortUrlModel) => {
  nowEditTitle.value = urlObj.title;
  nowEditShortUrl.value = urlObj.shortUrl;
  nowEditSelectShortUrl.value = urlObj.shortUrl;
  visible.value = true;
};
</script>
<style scoped></style>
