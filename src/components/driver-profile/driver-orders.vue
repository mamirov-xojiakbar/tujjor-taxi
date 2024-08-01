<template>
    <div>
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <p class="font-semibold text-[18px]">Loading...</p>
      </div>
  
      <div v-else>
        <div v-if="filteredOrders.length == 0">
          <p class="mt-[20px] font-semibold text-red-500 text-[15px]">Orders not found...</p>
        </div>
  
        <router-link
          to="#"
          v-else
          v-for="order in filteredOrders"
          :key="order.id"
          class="bg-gray-200 py-4 px-[50px] mb-4 rounded-lg shadow-md grid grid-cols-4 items-center"
        >
          <div>
            <p class="font-normal text-[#F7931E] text-[20px]">{{ getRegionName(order.fromDistrict.region_id) }}</p>
            <p class="font-normal text-[24px]">{{ order.fromDistrict.name }}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 20 20">
            <path fill="#e17e2d" fill-rule="evenodd" d="M.696 9.349q8.277-.045 16.942-.096q-4.21-4.215-6.084-6.095c-.143-.179-.158-.554.112-.847s.752-.281.89-.14q3.543 3.558 7.23 7.23q.215.195.215.503a.65.65 0 0 1-.215.502a8383 8383 0 0 1-7.6 7.421a.74.74 0 0 1-1.014-.063c-.263-.287-.29-.588.061-.982q3.002-2.94 6.287-6.13q-8.57.057-16.824.097a.7.7 0 0 1-.696-.72c0-.507.388-.68.696-.68" />
          </svg>
          <div>
            <p class="font-normal text-[#F7931E] text-[20px]">{{ getRegionName(order.toDistrict.region_id) }}</p>
            <p class="font-normal text-[24px]">{{ order.toDistrict.name }}</p>
          </div>
          <div>
            <p class="font-normal text-[18px]">10:00</p>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                <path fill="#e36802" d="M7.5 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2M6 7h3a2 2 0 0 1 2 2v5.5H9.5V22h-4v-7.5H4V9a2 2 0 0 1 2-2m10.5-5a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2M15 7h3a2 2 0 0 1 2 2v5.5h-1.5V22h-4v-7.5H13V9a2 2 0 0 1 2-2" />
              </svg>
              <p class="font-normal text-[18px]">{{ order.count }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import axios from 'axios';
  
  const orders = ref([]);
  const regions = ref([]);
  const driverId = 1;
  const isLoading = ref(true);
  
  onMounted(async () => {
    try {
      const [ordersResponse, regionsResponse] = await Promise.all([
        axios.get('http://45.130.148.194:5050/api/taxi-order'),
        axios.get('http://45.130.148.194:5050/api/region'),
      ]);
      orders.value = ordersResponse.data;
      regions.value = regionsResponse.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      isLoading.value = false; // Ma'lumotlar yuklangandan so'ng loading holatini o'chirish
    }
  });
  
  const filteredOrders = computed(() => orders.value.filter(order => order.driverId === driverId));
  
  const getRegionName = (regionId) => {
    const region = regions.value.find(r => r.id === regionId);
    return region ? region.name : 'Unknown';
  };
  </script>
  
  <style scoped>
  </style>
  