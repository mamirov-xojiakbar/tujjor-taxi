<template>
  <div class="bg-img h-screen flex items-center justify-center">
    <div
      class="sm:w-[500px] sm:h-[500px] bg-slate-50 rounded-lg shadow-md flex flex-col gap-5 items-center p-4"
    >
      <h1 class="text-3xl text-orange-500 font-semibold">Admin Kirish</h1>

      <form
        class="flex flex-col items-center gap-8 w-full px-6"
        @submit.prevent="handleSubmit"
      >
        <label class="w-full flex flex-col gap-2" for="username">
          <p>Foydalanuvchi nomi</p>
          <input
            class="py-2 px-4 w-full focus:shadow-md placeholder:text-slate-500 outline-none rounded-md"
            type="text"
            placeholder="Iltimos loginingizni kiriting..."
            id="username"
            v-model="username"
          />
          <p v-if="usernameError" class="text-red-500 text-xs px-2">
            {{ usernameError }}
          </p>
        </label>
        <label class="w-full flex flex-col gap-2" for="password">
          <p>Foydalanuvchi Paroli</p>
          <input
            class="py-2 px-4 w-full focus:shadow-md placeholder:text-slate-500 outline-none rounded-md"
            type="password"
            placeholder="Iltimos parolingizni kiriting..."
            id="password"
            v-model="password"
          />
          <p v-if="passwordError" class="text-red-500 text-xs px-2">
            {{ passwordError }}
          </p>
        </label>
        <button
          class="py-2 my-2 px-4 w-full border rounded-md text-slate-500 hover:bg-orange-300"
          type="submit"
        >
          Kirish
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Step 1: Define Reactive State
const username = ref("");
const password = ref("");
const usernameError = ref("");
const passwordError = ref("");
const loginError = ref("");

// Default login credentials
const defaultUsername = "admin";
const defaultPassword = "admin123";

// Get router instance
const router = useRouter();

// Step 2: Add Validation Logic
const validateForm = () => {
  let valid = true;
  usernameError.value = "";
  passwordError.value = "";
  loginError.value = "";

  if (username.value.length < 5) {
    usernameError.value = "Username 5ta harfdan uzun bo'lishi kerak";
    valid = false;
  }

  if (password.value.length < 5) {
    passwordError.value = "Parol 5ta harfdan uzun bo'lishi kerak";
    valid = false;
  }

  return valid;
};

// Step 3: Handle Form Submission
const handleSubmit = () => {
  if (validateForm()) {
    if (
      username.value === defaultUsername &&
      password.value === defaultPassword
    ) {
      alert("Form submitted successfully!");
      localStorage.setItem("isAdminAuthenticated", JSON.stringify(true));
      router.push({ name: "admin-dashboard" });
      // Redirect to dashboard
    } else {
        alert("Form submitted error!");
      loginError.value = "Invalid username or password";
    }
  }
};
</script>

<style scoped>
/* Scoped styles (if any) */
</style>
