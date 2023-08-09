<template>
  <div class="row justify-content-center">
    <div class="col-auto">
      <input
        type="text"
        class="form-control"
        placeholder="Enter link here"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        style="width: 400px"
        data-cy="url"
      />
    </div>
    <div class="col-auto">
      <button
        type="button"
        class="btn btn-primary"
        @click="generateUrl"
        data-cy="shortUrl"
      >
        Shorten URL
      </button>
    </div>
  </div>
</template>
<script>
export default {
  emits: ['generateUrl'],
  props: {
    modelValue: String,
  },
  methods: {
    async generateUrl() {
      this.$emit('generateUrl');
    },
  },
};
</script>
