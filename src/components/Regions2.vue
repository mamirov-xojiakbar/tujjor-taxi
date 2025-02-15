<template>
  <div
    v-if="isDropdownOpen"
    @click="toggleDropdown"
    class="fixed top-0 left-0 h-screen w-screen z-10"
  ></div>
  <div class="relative">
    <button
      class="text-[30px] w-[301px] block bg-white relative  rounded-md"
      :class="!store.setPlacePinTo ? 'px-[87px] py-7' : 'px-[15px] py-[11px]'"
      @click="toggleDropdown"
    >
      <div
        class="duration-300"
        :class="store.setPlacePinTo ? 'scale-100' : 'h-0 w-0 scale-0'"
      >
        <p class="text-[20px] text-start text-[#D1D1D1]">{{ $t("to") }}</p>
        <p class="line-clamp-1 mt-1 text-start">{{ store.setPlacePinTo }}</p>
      </div>
      <div
        class="duration-300"
        :class="!store.setPlacePinTo ? 'scale-100' : 'h-0 w-0 scale-0'"
      >
        <p>{{ $t("to") }}</p>
      </div>
    </button>
    <div
      :class="isDropdownOpen ? 'scale-100' : 'h-0 scale-0 w-0'"
      class="absolute left-0 p-2 duration-300 mt-2 md:w-[600px] w-full bg-second/35 max-md:bg-second/60 rounded z-20"
      style="box-shadow: 0 0px 10px 0 white"
    >
      <div class="md:flex">
        <!-- Region List -->
        <div
          class="w-1/2 max-md:w-full border-r max-h-56 overflow-y-auto scrollable-element"
        >
          <p
            v-for="(region, index) in regions"
            :key="index"
            @click="selectRegion(index)"
            :class="{
              'bg-primary text-white': selectedRegion === index,
              'hover:bg-gray-200': selectedRegion !== index,
            }"
            class="cursor-pointer p-2 text-sm rounded-md"
          >
            {{ region.name }}
          </p>
        </div>
        <!-- District List -->
        <div
          v-if="selectedRegion !== null && regions[selectedRegion]"
          class="w-1/2 max-md:w-full max-h-56 max-md:border-t border-t-primary max-md:border-r max-md:border-r-gray-200 overflow-y-auto scrollable-element"
        >
          <p
            v-for="(district, districtIndex) in regions[selectedRegion].districts"
            :key="districtIndex"
            @click="setPlaceFromDistrict(regions[selectedRegion].name, district.name)"
            class="p-2 text-sm hover:bg-gray-200 cursor-pointer rounded-md"
          >
            {{ district.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useStore } from "../store";
import axios from "axios";

const store = useStore();
const regions = ref([]);
const selectedRegion = ref(0);
const isDropdownOpen = ref(false);

const loadRegions = async () => {
  try {
    const response = await axios.get("http://45.130.148.194:5050/api/region");
    const data = response.data;
    regions.value = data;
    selectedRegion.value = 0;
    store.setPlacePinTo = "";
  } catch (error) {
    console.error("Failed to load regions:", error);
  }
};



const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectRegion = (index) => {
  selectedRegion.value = index;
};

const setPlaceFromDistrict = (region, district) => {
  store.setPlacePinTo = `${region}. ${district}`;
  isDropdownOpen.value = false;
};

onMounted(loadRegions);

watch(() => store.lang, loadRegions);
</script>

<style scoped>
.scrollable-element::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.scrollable-element::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom right, #f7931e 0%, #f7931e 100%);
  border-radius: 5px;
}

.scrollable-element::-webkit-scrollbar-track {
  background-color: transparent;
  border: 1px solid transparent;
}

.scrollable-element::-webkit-scrollbar-button {
  background-color: transparent;
  border-radius: 5px;
}
</style>
