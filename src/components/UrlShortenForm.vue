<template>
  <div class="shortUrlForm">
    <p>Shorten a long URL</p>
    <input type="text" placeholder="Enter long link here" v-model="url" />
    <p>Customize your link(optional)</p>
    <input type="text" placeholder="Enter alias" v-model="customShortUrl"/>
    <button type="button" class="btn btn-primary" @click="generateUrl" data-cy="shortUrl">
      Shorten URL
    </button>
  </div>
</template>
<script setup lang="ts">
const url = defineModel('url');
const customShortUrl = defineModel('customShortUrl');
const emits = defineEmits(['generateUrl']);
const generateUrl = () => {
  emits('generateUrl');
};
</script>
<style scoped>
.shortUrlForm {
  background-color: white;
  color: black;
  text-align: left;
  padding: 2rem;
  display: inline-block;
  width: 500px;
  border-radius: 0.6rem;
  margin-bottom: 1rem;
}
input[type='text'] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  color: black;
  background-color: transparent;
  border: 1px solid #ced4da;
  border-radius: 0.6rem;
  outline: none;
}

input[type='text']::placeholder {
  color: #aaa;
}
input[type='text']:focus {
  border-color: #ccc;
}
</style>
