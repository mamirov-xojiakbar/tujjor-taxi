<template>
  <div class="flex w-full">
    <Sidebar />
    <div class="ml-[15%]">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../layout/SideBar.vue";
</script>
