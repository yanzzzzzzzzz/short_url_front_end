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
    <div class="col-4"></div>
    <div class="col-auto">
      <font-awesome-icon
        class="cursor-pointer text-blue-500"
        :icon="['fa', 'link']"
        size="lg"
        @click="openRedirectUrl(url.shortUrl)"
      />
    </div>
    <div class="col-auto">
      <font-awesome-icon
        class="cursor-pointer text-gray-500"
        :icon="['fa', 'copy']"
        size="lg"
        @click="copyUrl(url.shortUrl)"
      />
    </div>
    <div class="col-auto">
      <font-awesome-icon
        class="cursor-pointer text-red-500"
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
    openRedirectUrl(shortUrl) {
      const url = `${window.location.origin}\\api\\url\\${shortUrl}`;
      window.open(url, '_blank');
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
</style>
