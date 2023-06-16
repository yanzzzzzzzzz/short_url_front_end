<template>
  <div
    class="row bg-white text-black rounded my-3 custom-class"
    v-for="url in urlMap"
    :key="url.shortUrl"
    style="text-align: left; height: 52px"
  >
    <div class="col-5">
      {{
        url.originUrl.replace(/^(https?:\/\/)?/, '').slice(0, maxLength) + '...'
      }}
    </div>
    <div class="col-5">
      <a :href="AddRedirectUrl(url.shortUrl)" target="_blank">{{
        url.shortUrl
      }}</a>
    </div>
    <div class="col-auto">
      <font-awesome-icon
        :icon="['fa', 'copy']"
        size="lg"
        @click="copyUrl(url.shortUrl)"
        class="copy-class"
      />
    </div>
    <div class="col-auto">
      <font-awesome-icon
        class="delete-class"
        :icon="['fa', 'trash']"
        size="lg"
        @click="deleteUrl(url)"
      />
    </div>
  </div>
</template>
<script>
export default {
  emits: ['deleteUrl'],
  props: {
    urlMap: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      maxLength: 20,
    };
  },
  methods: {
    copyUrl(url) {
      navigator.clipboard.writeText(url).then(() => {
        console.log('copy success');
        alert('Success', 'copy success.');
      });
    },
    deleteUrl(urlObj) {
      this.$emit('deleteUrl', urlObj);
    },
    AddRedirectUrl(shortUrl) {
      return `${this.$root.$el.baseURI}api/url/${shortUrl}`;
    },
  },
};
</script>
<style>
.custom-class {
  display: flex;
  align-items: center;
  height: 200px;
}
.copy-class {
  color: #007bff;
  cursor: pointer;
}

.delete-class {
  color: red;
  cursor: pointer;
}
</style>
