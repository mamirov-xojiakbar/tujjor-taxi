<template>
    <div class="pt-[75px] container">
      <div class="bg-gray-200 flex flex-col items-center pb-[40px] pt-[50px] rounded-[20px]">
        <img src="/xojiakbar-images/driver.jpg" alt="Driver photo" class="w-[170px] h-[170px] object-cover rounded-[20px]">
        <p class="font-bold text-[20px] mt-[5px]">Driver name</p>
        <p class="font-medium text-[15px] mt-[5px]">ID: {{ driverId }}</p>
      </div>
  
      <div class="flex gap-[20px] text-[20px] font-medium mt-[50px] mb-[20px]">
        <p 
            @click="activeTab = 1" 
            :class="{ 'text-black border-b-[2px] border-b-black': activeTab === 1 }" 
            class="px-2 pb-1 hover:cursor-pointer text-gray-400 transition-all duration-300"
        >
            Mening buyurtmalarim
        </p>
        <p 
            @click="activeTab = 2" 
            :class="{ 'text-black border-b-[2px] border-b-black': activeTab === 2 }" 
            class="px-2 pb-1 hover:cursor-pointer text-gray-400 transition-all duration-300"
        >
            Mening mashinalarim
        </p>
        <p 
            @click="activeTab = 3" 
            :class="{ 'text-black border-b-[2px] border-b-black': activeTab === 3 }" 
            class="px-2 pb-1 hover:cursor-pointer text-gray-400 transition-all duration-300"
        >
            Buyurtmalar tarixi
        </p>
      </div>
  
      <div v-if="activeTab === 1" class="mb-[60px]">
        <DriverOrders />
      </div>
  
      <div v-if="activeTab === 2">
        <DriverCars />
      </div>
  
      <div v-if="activeTab === 3">
        Buyurtmalar tarixi
      </div>
    </div>
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue';
import DriverOrders from '../components/driver-profile/driver-orders.vue';
import DriverCars from '../components/driver-profile/driver-cars.vue';

const activeTab = ref(1);
const driverId = 1;
</script>

<style scoped>
.text-black {
color: #000;
}
.opacity-[50%] {
opacity: 0.5;
}
.opacity-[100%] {
opacity: 1;
}
</style>