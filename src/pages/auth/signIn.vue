<template>
  <div class="bg-[#eee] h-screen flex justify-center items-center">
    <div>
      <div class="flex items-center justify-center">
       <h1>Ro‘yxatdan o‘tish</h1>
      </div>
      
      <form
        @submit.prevent="loginUser"
        class="flex flex-col gap-5 mt-8 px-[22px] py-[30px] bg-[#fff] rounded-[5px] max-md:w-full"
      >
        <label for="username" class="text-[#6C6C6C] font-medium max-md:hidden">
          Имя пользователя
          <input
            v-model="userData.username"
            id="username"
            class="w-full px-[15px] mt-1 py-3 border rounded border-[#E5E5E5] outline-none focus:border-[#FEAF00] placeholder-[#CDCDCD] text-[12px]"
            type="text"
            placeholder="Введите имя пользователя"
          />
        </label>
        <label for="password" class="text-[#6C6C6C] font-medium relative max-md:hidden">
          Пароль
          <input
            v-model="userData.password"
            id="password"
            class="w-full px-[15px] mt-1 py-3 border rounded border-[#E5E5E5] outline-none focus:border-[#FEAF00] placeholder-[#CDCDCD] text-[12px]"
            :type="eyecheck ? 'password' : 'text'"
            placeholder="Введите пароль"
          />
          <img
            @click="eyecheck = !eyecheck"
            :src="
              eyecheck ? '/diyorbek_img/eye_close.svg' : '/diyorbek_img/eye.svg'
            "
            alt="eye"
            class="absolute top-1/2 w-[25px] right-0 -translate-x-1/2 cursor-pointer"
          />
        </label>
        
        <label for="username" class="text-[#6C6C6C] font-medium md:hidden">
          <input
            v-model="userData.username"
            id="username"
            class="w-full px-[15px] mt-1 py-3 border rounded border-[#E5E5E5] outline-none focus:border-[#FEAF00] placeholder-[#CDCDCD] text-[12px]"
            type="text"
            placeholder="Введите имя пользователя"
          />
        </label>
        <label for="password" class="text-[#6C6C6C] font-medium relative md:hidden">
          <input
            v-model="userData.password"
            id="password"
            class="w-full px-[15px] mt-1 py-3 border rounded border-[#E5E5E5] outline-none focus:border-[#FEAF00] placeholder-[#CDCDCD] text-[12px]"
            :type="eyecheck ? 'password' : 'text'"
            placeholder="Введите пароль"
          />
          <img
            @click="eyecheck = !eyecheck"
            :src="
              eyecheck ? '/diyorbek_img/eye_close.svg' : '/diyorbek_img/eye.svg'
            "
            alt="eye"
            class="absolute top-1/3 w-[25px] right-0 -translate-x-1/2 cursor-pointer"
          />
        </label>

        <button
          type="button"
          @click.prevent="loginUser"
          class="w-full px-[15px] py-3 text-center rounded-[4px] hover:bg-[#ffcb5a] font-medium bg-[#FEAF00] text-[#FCF6F6]"
          style="box-shadow: 0px 1.96px 9.8px 0px #00000040"
        >
          Авторизоваться
        </button>
        <div class="flex justify-between items-center w-full">
          <a href="#" class="text-[#023047] underline cursor-pointer">Забыли пароль?</a>
          <p>Нет учетной записи?</p>
        </div>
        <button
          @click="router.push('/signup')"
          type="button"
          class="w-full px-[15px] py-3 text-center rounded-[4px] hover:bg-[#ffcb5a] font-medium bg-[#FEAF00] text-[#FCF6F6]"
          style="box-shadow: 0px 1.96px 9.8px 0px #00000040"
        >
          Регистрация
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const eyecheck = ref(false);
const router = useRouter();

const userData = reactive({
  username: "emilys",
  password: "emilyspass",
});

const loginUser = () => {
  api
    .post("/auth/login", userData)
    .then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      router.push("/home");
      console.log("res", res);
    })
    .catch((err) => {
      console.log("err", err);
      alert("Ошибка при входе. Попробуйте еще раз.");
    });
};
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>