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
        <p class="mt-3">parol</p>
        <input
          type="text"
          class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
          v-model="loginData.password"
        />
        <p class="mt-3">telefon raqam</p>
        <input
          type="text"
          class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
          v-model="loginData.phone"
          v-mask="'+998#########'"
        />

        <h1 v-if="isLogin" class="text-red-600">raqam yoki parol xato</h1>

        <button
          @click="Login()"
          class="bg-[#F7931E] w-full mt-8 text-white py-2 hover:bg-orange-500"
        >
          Kirish
        </button>

        <router-link to="/signup">
          <button class="mt-2">Ro‘yxatdan o‘tish</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";


const isLogin = ref(false);

const loginData = ref({
  password: "",
  phone: "",
});

const router = useRouter();


async function Login() {
  try {
    console.log(loginData.value);
    const res = await axios.post(
      "http://45.130.148.194:5050/api/client/login",
      loginData.value
    );
    router.push({name: "home"})
  } catch (error) {
    isLogin.value = true;
    console.log(error);
  }
}

const isInput = ref(false);
</script>

<style lang="scss" scoped></style>
