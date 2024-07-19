<template>
  <div class="bg-[#F7931E] fixed w-full z-50"> 
    <div class="container mx-auto py-6 flex justify-between items-center">
      <h1 class="text-4xl font-bold leading-tight text-white">Logo</h1>
      <div class="flex items-center gap-8 text-white text-lg font-medium">
        <router-link to="#">Biz haqimizda</router-link>
        <router-link to="#">Savol/javob</router-link>
        <div class="flex gap-3 items-center">
          <div 
            :class="{
              'bg-[#C4C4C4]': !isToggled,
              'bg-green-500': isToggled,
              'w-[50px] h-[28px] rounded-[13.5px] p-[1px] relative cursor-pointer': true
            }" 
            @click="toggleSwitch"
          >
            <div 
              :class="{
                'bg-white w-[26px] h-[26px] rounded-full absolute transition-all duration-300': true,
                'right-[1px]': isToggled,
                'left-[1px]': !isToggled
              }"
            ></div>
          </div>
          <p>{{ leng }}</p>
        </div> 
        <router-link to="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 512 512">
            <path fill="white" d="M256 288a144 144 0 1 0 0-288a144 144 0 1 0 0 288m-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7h450.6c17 0 30.7-13.8 30.7-30.7c0-89.1-72.2-161.3-161.3-161.3z"/>
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isToggled = ref(false);
const leng = ref("Русский");

const toggleSwitch = () => {
  isToggled.value = !isToggled.value;
  leng.value = isToggled.value ? "O’zbekcha" : "Русский";
};
</script>

<style lang="scss" scoped>
</style>
