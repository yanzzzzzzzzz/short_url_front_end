<template>
  <div class="container pt-2">
    <UrlHeader />
    <UrlShortenForm />
    <UrlDisplayList />
  </div>
  <UrlIntroduction />
</template>

<script setup lang="ts">
import UrlDisplayList from '../components/UrlDisplayList.vue';
import UrlShortenForm from '../components/UrlShortenForm.vue';
import UrlHeader from '../components/UrlHeader.vue';
import UrlIntroduction from '../components/UrlIntroduction.vue';

import 'vue3-toastify/dist/index.css';
</script>
<style scoped>
.container {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
}
</style>
