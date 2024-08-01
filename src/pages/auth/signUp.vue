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
        <h1 class="text-center font-medium text-xl">Royhatdan utish</h1>
        <p class="mt-3">Nomer</p>
        <input
          :disabled="step > 1"
          type="text"
          class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
          v-model="formData.phone"
          v-mask="'+998 ## ### ## ##'"
        />
        <div v-if="step == 2">
          <p class="mt-3">Numerizga yuborilgan parol parol</p>
          <input
            type="text"
            class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
            v-model="code"
            v-mask="'####'"
          />
          <h2 v-if="isVerifyError" class="text-red-500">
            Kod xato qaytadan kiriting !!!
          </h2>
        </div>
        <div v-if="step == 3">
          <p class="mt-3">Ism</p>
          <input
            type="text"
            class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
            v-model="InfoData.name"
          />
          <p class="mt-3">Parol</p>
          <input
            type="text"
            class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
            v-model="InfoData.password"
          />
          <p class="mt-3">Parolni Takrorlang</p>
          <input
            type="text"
            class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
            v-model="InfoData.confirm_password"
          />
          <p class="mt-3">Gender</p>
          <input
            type="text"
            class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
            v-model="InfoData.gender"
          />
        </div>
        <router-link to="/signup">
          <button
            class="bg-[#F7931E] w-full mt-8 text-white py-2 hover:bg-orange-500"
            @click="Next()"
          >
            Ro’yxatdan o’tish
          </button>
        </router-link>
        <router-link to="/login">
          <button class="mt-2">Ro‘yxatdan o‘tganmisiz?</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

import { useStore } from "../../store";

const store = useStore();

const step = ref(1);
const code = ref();
const isVerifyError = ref(false);
const formData = ref({
  phone: "",
});

const CodeData = ref({
  otp: "",
  check: "",
});

const InfoData = ref({
  name: "",
  password: "",
  confirm_password: "",
  phone: "",
  gender: "",
});

const router = useRouter();

const responseData = ref(null);

async function submitForm() {
  try {
    const result = formData.value.phone.replace(/\s+/g, "");
    formData.value.phone = result;

    console.log('fds',formData.value.phone);
    const response = await axios.post(
      "http://45.130.148.194:5050/api/client/newsotp",
      formData.value
    );
    responseData.value = response.data;
    alert(responseData.value.otp);
    // console.log("responseData", responseData.value);
    step.value = 2;
  } catch (error) {
    console.error("Xato yuz berdi:", error);
  }
}

async function submitCode() {
  try {
    const result = formData.value.phone.replace(/\s+/g, "");

    CodeData.value.check = result;
    CodeData.value.otp = +code.value;
    console.log(CodeData.value.otp);
    console.log(`sdas`, CodeData.value);

    const res = await axios.post(
      "http://45.130.148.194:5050/api/client/checkOtp",
      CodeData.value
    );
    console.log(`res`, res);
    step.value = 3;
  } catch (error) {
    isVerifyError.value = true;

    console.error("Xato yuz berdi:", error);
  }
}
async function InfoCode() {
  try {
    const result = formData.value.phone.replace(/\s+/g, "");

    InfoData.value.phone = result;

    const res = await axios.post(
      "http://45.130.148.194:5050/api/client/register",
      InfoData.value
    );
    store.userInfo = res.data.user;
    router.push({ name: "home" });
  } catch (error) {
    console.log(`error`, error);
  }
}

const Next = () => {
  if (step.value == 1) {
    submitForm();
  }
  if (step.value == 2) {
    submitCode();
  }
  if (step.value == 3) {
    InfoCode();
  }
};

// console.log('gfhjg',store.userInfo);
</script>

<style scoped>
/* Qo'shimcha uslublar */
</style>
