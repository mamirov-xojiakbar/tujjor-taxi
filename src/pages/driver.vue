<template>
  <div class="pt-[75px] container">
    <!-- Driver Information Display -->
    <div class="bg-gray-200 flex flex-col items-center pb-[40px] pt-[50px] rounded-[20px] relative">
      <img :src="driverInfo.photo" alt="Driver photo" class="w-[170px] h-[170px] object-cover rounded-[20px]">
      <p class="font-bold text-[20px] mt-[5px]">{{ driverInfo.name }} {{ driverInfo.surname }}</p>
      <p class="font-medium text-[15px] mt-[5px]">ID: {{ driverInfo.id }}</p>
      <p class="font-medium text-[15px] mt-[5px]">Telefon: {{ driverInfo.phone }}</p>
      <p class="font-medium text-[15px] mt-[5px]">Pasport: {{ driverInfo.passport }}</p>
      <p class="font-medium text-[15px] mt-[5px]">Yosh: {{ driverInfo.age }}</p>
      <p class="font-medium text-[15px] mt-[5px]">Balans: {{ driverInfo.total_balance }}</p>
      <button @click="scrollToForm" class="mt-[20px] px-4 py-2 border-[1px] border-black text-white rounded absolute right-[400px] top-[40px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <g fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="m16.475 5.408l2.117 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621"/>
            <path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3"/>
          </g>
        </svg>
      </button>
    </div>

    <!-- Update Form -->
    <div v-if="showUpdateForm" class="mt-4" ref="updateForm">
      <form @submit.prevent="updateDriverInfo">
        <div class="mb-2">
          <label class="block">Name:</label>
          <input v-model="form.name" type="text" class="w-full border rounded p-2" />
        </div>
        <div class="mb-2">
          <label class="block">Surname:</label>
          <input v-model="form.surname" type="text" class="w-full border rounded p-2" />
        </div>
        <div class="mb-2">
          <label class="block">Phone:</label>
          <input v-model="form.phone" type="text" class="w-full border rounded p-2" />
        </div>
        <div class="mb-2">
          <label class="block">Passport:</label>
          <input v-model="form.passport" type="text" class="w-full border rounded p-2" />
        </div>
        <div class="mb-2">
          <label class="block">Age:</label>
          <input v-model="form.age" type="number" class="w-full border rounded p-2" />
        </div>
        <div class="mb-2">
          <label class="block">Upload Photo:</label>
          <input @change="onFileChange" type="file" class="w-full border rounded p-2" />
        </div>
        <button type="submit" class="mt-2 px-4 py-2 bg-green-500 text-white rounded mr-[20px]">Save</button>
        <button @click="showUpdateForm = false" type="button" class="mt-2 px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
      </form>
    </div>

    <!-- Tab Navigation -->
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

    <!-- Tab Content -->
    <div v-if="activeTab === 1" class="mb-[60px]">
      <DriverOrders />
    </div>

    <div v-if="activeTab === 2">
      <DriverCars />
    </div>

    <div v-if="activeTab === 3">
      <OrderXistory />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import DriverOrders from '../components/driver-profile/driver-orders.vue';
import DriverCars from '../components/driver-profile/driver-cars.vue';
import OrderXistory from '../components/driver-profile/order-xistory.vue';

const activeTab = ref(1);
const driverInfo = ref({});
const showUpdateForm = ref(false);
const form = ref({
  name: '',
  surname: '',
  phone: '',
  passport: '',
  age: 0,
  photo: ''
});
const updateForm = ref(null);
const photoFile = ref(null);

onMounted(() => {
  const storedDriverInfo = localStorage.getItem('store');
  console.log("Stored driver info:", storedDriverInfo); 
  if (storedDriverInfo) {
    try {
      const parsedStore = JSON.parse(storedDriverInfo);
      if (parsedStore.driverInfo) {
        driverInfo.value = parsedStore.driverInfo;
        form.value = { ...driverInfo.value }; 
        console.log("Parsed driver info:", driverInfo.value);
      } else {
        console.error("No driverInfo found in parsed store data");
      }
    } catch (e) {
      console.error("Error parsing stored driver info:", e);
    }
  } else {
    console.error("No driver info found in localStorage");
  }
});

const updateDriverInfo = async () => {
  console.log("Updating driver info for ID:", driverInfo.value.id);

  if (photoFile.value) {
    const formData = new FormData();
    formData.append('file', photoFile.value);
    try {
      const uploadResponse = await fetch('http://45.130.148.194:5050/api/upload', {
        method: 'POST',
        body: formData
      });
      if (uploadResponse.ok) {
        const uploadResult = await uploadResponse.json();
        form.value.photo = uploadResult.filePath;
        driverInfo.value.photo = form.value.photo;
        console.log("Photo uploaded successfully:", form.value.photo);
      } else {
        const errorDetail = await uploadResponse.text();
        console.error("Failed to upload photo:", errorDetail);
      }
    } catch (e) {
      console.error("Error uploading photo:", e);
    }
  }

  driverInfo.value = { ...form.value };
  const storedDriverInfo = localStorage.getItem('store');
  if (storedDriverInfo) {
    try {
      const parsedStore = JSON.parse(storedDriverInfo);
      parsedStore.driverInfo = driverInfo.value;
      localStorage.setItem('store', JSON.stringify(parsedStore));
      console.log("Updated driver info in localStorage:", driverInfo.value);
    } catch (e) {
      console.error("Error updating stored driver info in localStorage:", e);
    }
  }

  try {
    const response = await fetch(`http://45.130.148.194:5050/api/driver/${driverInfo.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(driverInfo.value)
    });

    if (response.ok) {
      console.log("Updated driver info on server:", driverInfo.value);
    } else {
      const errorDetail = await response.text();
      console.error(`Failed to update driver info on server: ${errorDetail}`);
      if (response.status === 404) {
        console.error("The endpoint or driver ID was not found.");
      }
    }
  } catch (e) {
    console.error("Error updating driver info on server:", e);
  }

  showUpdateForm.value = false;
};

const scrollToForm = () => {
  showUpdateForm.value = true;
  nextTick(() => {
    updateForm.value.scrollIntoView({ behavior: 'smooth' });
  });
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    photoFile.value = file;
    const reader = new FileReader();
    reader.onload = () => {
      form.value.photo = reader.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
.text-black {
  color: #000;
}
</style>
