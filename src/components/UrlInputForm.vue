<template>
  <div class="row justify-content-center">
    <div class="col-auto d-flex align-items-center">
      <input
        type="text"
        class="form-control"
        placeholder="Enter link here"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        style="width: 400px; margin-right: 20px"
        data-cy="url"
      />
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
