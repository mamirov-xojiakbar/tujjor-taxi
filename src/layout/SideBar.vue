<template>
  <div
    class="w-[15%] fixed h-screen bg-slate-800 flex flex-col items-start px-5 justify-evenly py-6"
  >
    <h1 class="text-4xl text-white font-medium">Logo</h1>

    <router-link
      class="text-2xl text-white flex items-center gap-1 w-0 duration-500 [&.router-link-active]:w-full [&.router-link-active]:bg-blue-700 px-2 py-2 rounded-lg"
      to="/dashboard/home"
    >
      <i class="fi fi-sr-house-window"></i>
      <p>Home</p>
    </router-link>
    <router-link
      class="text-2xl text-white flex items-center gap-1 w-0 duration-500 [&.router-link-active]:w-full [&.router-link-active]:bg-blue-700 px-2 py-2 rounded-lg"
      to="/dashboard/admins"
    >
      <i class="fi fi-ss-admin-alt"></i>
      <p>Admins</p>
    </router-link>
    <router-link
      class="text-2xl text-white flex items-center gap-1 w-0 duration-500 [&.router-link-active]:w-full [&.router-link-active]:bg-blue-700 px-2 py-2 rounded-lg"
      to="/dashboard/orders"
    >
      <i class="fi fi-ss-order-history"></i>
      <p>Orders</p>
    </router-link>
    <router-link
      class="text-2xl text-white flex items-center gap-1 w-0 duration-500 [&.router-link-active]:w-full [&.router-link-active]:bg-blue-700 px-2 py-2 rounded-lg"
      to="/dashboard/drivers"
    >
      <i class="fi fi-br-driver-man"></i>
      <p>Drivers</p>
    </router-link>
    <button @click="logout" class="text-2xl text-white flex items-center gap-1">
      <i class="fi fi-bs-sign-out-alt"></i>
      <p>Logout</p>
    </button>
  </div>
</template>

<script setup>
const logout = () => {
  localStorage.removeItem("isAdminAuthenticated");
};
</script>
