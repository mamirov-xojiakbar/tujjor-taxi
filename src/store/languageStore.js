// stores/languageStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLanguageStore = defineStore("language", () => {
  const isRussian = ref(false);

  const toggleLanguage = () => {
    isRussian.value = !isRussian.value;
  };

  return { isRussian, toggleLanguage };
});
