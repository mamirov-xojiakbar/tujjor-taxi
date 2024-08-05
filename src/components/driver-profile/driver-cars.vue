<template>
    <div class="mb-10">
      <div v-if="cars.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="car in cars" :key="car.id" class="car bg-white shadow-md rounded-lg p-6">
          <p class="text-lg font-semibold mb-2">Car Number: <span class="font-normal">{{ car.car_number }}</span></p>
          <p class="text-lg font-semibold mb-2">Model: <span class="font-normal">{{ car.model }}</span></p>
          <p class="text-lg font-semibold mb-2">Color: <span class="font-normal">{{ car.color }}</span></p>
          <p class="text-lg font-semibold mb-2">Car Type: <span class="font-normal">{{ car.car_type }}</span></p>
          <p class="text-lg font-semibold mb-2">Tex Passport: <span class="font-normal">{{ car.tex_passport }}</span></p>
        </div>
      </div>
      <div v-else class="text-gray-500">
        <p>No cars found for the driver.</p>
      </div>
  
      <button @click="showAddCarForm = true" v-if="!showAddCarForm" class="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Add Car
      </button>
  
      <form v-if="showAddCarForm" @submit.prevent="addCar" class="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Add New Car</h3>
        <div class="mb-4">
          <label class="block mb-2 font-semibold">Car Number</label>
          <input v-model="newCar.car_number" type="text" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block mb-2 font-semibold">Model</label>
          <input v-model="newCar.model" type="text" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block mb-2 font-semibold">Color</label>
          <input v-model="newCar.color" type="text" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block mb-2 font-semibold">Car Type</label>
          <input v-model="newCar.car_type" type="text" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block mb-2 font-semibold">Tex Passport</label>
          <input v-model="newCar.tex_passport" type="text" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
        <button @click="showAddCarForm = false" type="button" class="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Cancel
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useStore } from '../../store'; // Adjust the path according to your project structure
  
  const store = useStore();
  const cars = ref([]);
  const showAddCarForm = ref(false);
  const newCar = ref({
    car_number: '',
    model: '',
    color: '',
    car_type: '',
    tex_passport: '',
    driverId: store.driverInfo?.id || null
  });
  
  onMounted(async () => {
    if (store.driverInfo) {
      const driverId = store.driverInfo.id;
  
      try {
        const response = await axios.get('http://45.130.148.194:5050/api/car');
        const allCars = response.data;
  
        // Filter cars by driverId from Pinia store
        cars.value = allCars.filter(car => car.driverId === driverId);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    } else {
      console.error('Driver information is not available in the store');
    }
  });
  
  const addCar = async () => {
    if (store.driverInfo) {
      newCar.value.driverId = store.driverInfo.id;
  
      try {
        const response = await axios.post('http://45.130.148.194:5050/api/car', newCar.value);
        cars.value.push(response.data);
        
        // Reset new car form
        newCar.value = {
          car_number: '',
          model: '',
          color: '',
          car_type: '',
          tex_passport: '',
          driverId: store.driverInfo.id
        };
  
        // Hide add car form
        showAddCarForm.value = false;
      } catch (error) {
        console.error('Error adding car:', error);
      }
    } else {
      console.error('Driver information is not available in the store');
    }
  };
  </script>
  
  <style scoped>
  .car {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1.5rem;
  }
  </style>
  