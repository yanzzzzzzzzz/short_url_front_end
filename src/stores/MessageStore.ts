import { defineStore } from 'pinia';
export const useMessageStore = defineStore('MessageStore', {
  state: (): { errorMessage: String } => ({
    errorMessage: ''
  }),
  actions: {
    setErrorMessage(msg: String) {
      this.errorMessage = msg;
    },
    deleteErrorMessage() {
      this.errorMessage = '';
    }
  },
  getters: {
    getErrorMessage(): String {
      return this.errorMessage;
    }
  }
});
