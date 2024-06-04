<template>
  <UrlManager />
  <UrlIntroduction />
</template>

<script setup lang="ts">
import UrlManager from '../components/UrlManager.vue';
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
