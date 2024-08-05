<template>
  <div class="bg-[#F7931E] fixed w-full z-50"> 
    <div class="container mx-auto py-6 flex justify-between items-center">
      <h1 class="text-4xl font-bold leading-tight text-black">Logo</h1>
      <div class="flex items-center gap-8 text-white text-lg font-medium">
        <router-link to="#" class="md:block hidden">{{ aboutUsText }}</router-link>
        <router-link to="#" class="md:block hidden">{{ faqText }}</router-link>
        <div class="flex gap-3 items-center">
          <div 
            :class="{
              'bg-[#C4C4C4]': !isToggled,
              'bg-green-500': isToggled,
              'w-[50px] h-[28px] rounded-[13.5px] p-[1px] relative cursor-pointer': true
            }" 
            @click="toggleLanguage"
          >
            <div 
              :class="{
                'bg-white w-[26px] h-[26px] rounded-full absolute transition-all duration-300': true,
                'right-[1px]': isToggled,
                'left-[1px]': !isToggled
              }"
            ></div>
          </div>
          <p class="md:block hidden">Русский</p>
          <p class="md:hidden block">Рус</p>
        </div> 
        <router-link to="/driver">
          <img v-if="driverInfo && driverInfo.photo" :src="driverInfo.photo" alt="Driver Photo" class="w-8 h-8 rounded-full object-cover  "/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useLanguageStore } from '../store/languageStore';

// Retrieve driverInfo from local storage
const store = JSON.parse(localStorage.getItem('store'));
const driverInfo = store ? store.driverInfo : null;
console.log('driverInfo:', driverInfo); // Add this line to check the output in the console

const languageStore = useLanguageStore();

const isToggled = computed(() => languageStore.isRussian);

const toggleLanguage = () => {
  languageStore.toggleLanguage();
};

const aboutUsText = computed(() => (languageStore.isRussian ? "О нас" : "Biz haqimizda"));
const faqText = computed(() => (languageStore.isRussian ? "Вопрос/Ответ" : "Savol/javob"));
</script>

<style lang="scss" scoped>
</style>
