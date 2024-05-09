<template>
  <div class="shortUrlForm">
    <p>Shorten a long URL</p>
    <InputText
      class="w-full"
      placeholder="Enter long link here"
      v-model="url"
      data-cy="urlInputText"
    />
    <p>Customize your link(optional)</p>
    <InputText class="w-full" placeholder="Enter alias" v-model="customShortUrl" />
    <p style="color: red">{{ messageStore.getErrorMessage }}</p>
    <Button class="mt-4 block" @click="generateUrl" data-cy="shortUrl" label="Shorten URL" />
  </div>
</template>
<script setup lang="ts">
import { useMessageStore } from '../stores/MessageStore';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { Ref } from 'vue';

const messageStore = useMessageStore();
const url = defineModel('url') as Ref<string | undefined>;
const customShortUrl = defineModel('customShortUrl') as Ref<string | undefined>;
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
/* input[type='text'] {
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
} */
</style>
