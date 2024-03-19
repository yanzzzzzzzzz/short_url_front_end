<template>
  <div class="row justify-content-center">
    <div class="col-auto d-flex align-items-center">
      <input
        type="text"
        class="form-control"
        placeholder="Enter link here"
        v-model="model"
        style="width: 400px; margin-right: 20px"
        data-cy="url"
      />
      <button type="button" class="btn btn-primary" @click="generateUrl" data-cy="shortUrl">
        Shorten URL
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const model = defineModel();
const emits = defineEmits(['generateUrl']);
const generateUrl = () => {
  emits('generateUrl');
};
</script>
