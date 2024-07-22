<template>
  <div class="bg-gray-100 h-screen pt-[10%] max-md:pt-[20%]">
    <div
      class="md:w-[510px] mx-auto bg-white shadow-sm max-md:mx-2 max-md:px-3 py-8"
    >
      <div class="md:w-[460px] mx-auto">
        <div class="flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            class="hover:text-[#F7931E]"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="m7 7l10 10M7 17L17 7"
            />
          </svg>
        </div>
        <h1 class="text-center font-medium text-xl">Kirish</h1>
        <p class="mt-3">Login</p>
        <input
          type="text"
          class="border-2 border-[#F7931E] md:w-[460px] w-full py-1"
        />
        <p class="mt-3">parol</p>
        <input
          type="text"
          class="border-2 border-[#F7931E] md:w-[460px] w-full py-1"
        />
        <router-link to="/">
          <button
            class="bg-[#F7931E] w-full mt-8 text-white py-2 hover:bg-orange-500"
          >
            Kirish
          </button>
        </router-link>
        <router-link to="/signup">
          <button class="mt-2">Ro‘yxatdan o‘tish</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isInput = ref(false);
</script>

<style lang="scss" scoped></style>
