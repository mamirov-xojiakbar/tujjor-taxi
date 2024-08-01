<template>
  <div class="bg-gray-100 h-screen pt-2">
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
            class="hover:text-[#F7931E] cursor-pointer"
            @click="closeForm"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="m7 7 10 10M7 17 17 7"
            />
          </svg>
        </div>
        <h1 class="text-center font-medium text-xl">Ro'yxatdan o'tish</h1>
        <p class="mt-3">Telefon raqami</p>
        <input
          :disabled="step > 1"
          type="text"
          class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
          v-model="formData.phone"
          v-mask="'+998#########'"
        />
        <div v-if="step === 2">
          <p class="mt-3">Numerizga yuborilgan kodni kiriting</p>
          <input
            type="text"
            class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
            v-model="code"
            v-mask="'####'"
          />
          <h2 v-if="isVerifyError" class="text-red-500">
            Kod xato, qaytadan kiriting!
          </h2>
        </div>
        <div v-if="step === 3">
          <p class="mt-3">Ism</p>
          <input
            type="text"
            class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
            v-model="infoData.name"
          />
          <p class="mt-3">Familiya</p>
          <input
            type="text"
            class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
            v-model="infoData.surname"
          />
          <p class="mt-3">Yosh</p>
          <input
            type="number"
            class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
            v-model.number="infoData.age"
          />
          <p class="mt-3">Passport</p>
          <input
            type="text"
            class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
            v-model="infoData.passport"
          />
          <p class="mt-3">Parol</p>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
              v-model="infoData.password"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              :class="showPassword ? 'text-[#F7931E]' : 'text-gray-500'"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              @click="togglePasswordVisibility"
            >
              <path
                v-if="showPassword"
                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"
                stroke="currentColor"
                fill="none"
              />
              <path
                v-else
                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zm11-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                stroke="currentColor"
                fill="none"
              />
            </svg>
          </div>
          <p class="mt-3">Foto</p>
          <input
            type="file"
            class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
            @change="handleFileUpload"
          />
          <p class="mt-3">Haydovchilik guvohnomasi</p>
          <input
            type="file"
            class="border-2 border-[#F7931E] md:w-[460px] w-full py-1 px-2"
            @change="handlePravaUpload"
          />
        </div>
        <button
          class="bg-[#F7931E] w-full mt-8 text-white py-2 hover:bg-orange-500"
          @click="nextStep"
        >
          Ro’yxatdan o’tish
        </button>
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
const code = ref("");
const isVerifyError = ref(false);
const formData = ref({ phone: "" });
const infoData = ref({
  name: "",
  surname: "",
  age: 0,
  passport: "",
  password: "",
  photo: null,
  prava: null,
  phone: "",
});
const showPassword = ref(false);

const router = useRouter();
const responseData = ref(null);

const closeForm = () => {
  router.push({ name: "home" });
};

const handleFileUpload = (event) => {
  infoData.value.photo = event.target.files[0];
};

const handlePravaUpload = (event) => {
  infoData.value.prava = event.target.files[0];
};

const submitForm = async () => {
  try {
    const response = await axios.post(
      "http://45.130.148.194:5050/api/driver/newotp",
      formData.value
    );
    responseData.value = response.data;
    alert(responseData.value.otp);
    step.value = 2;
  } catch (error) {
    console.error("Xato yuz berdi:", error);
  }
};

const submitCode = async () => {
  try {
    const codeData = { check: formData.value.phone, otp: +code.value };
    await axios.post(
      "http://45.130.148.194:5050/api/driver/checkOtp",
      codeData
    );
    step.value = 3;
  } catch (error) {
    isVerifyError.value = true;
    console.error("Xato yuz berdi:", error);
  }
};

const submitInfo = async () => {
  try {
    infoData.value.phone = formData.value.phone;

    const formDataToSend = new FormData();
    for (const key in infoData.value) {
      formDataToSend.append(key, infoData.value[key]);
    }

    const res = await axios.post(
      "http://45.130.148.194:5050/api/driver/register",
      formDataToSend,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    store.driverInfo = res.data.driver;
    router.push({ name: "home" });
    console.log(store.driverInfo);
  } catch (error) {
    console.error("Xato yuz berdi:", error);
  }
};

const nextStep = () => {
  if (step.value === 1) {
    submitForm();
  } else if (step.value === 2) {
    submitCode();
  } else if (step.value === 3) {
    submitInfo();
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
/* Qo'shimcha uslublar */
</style>
