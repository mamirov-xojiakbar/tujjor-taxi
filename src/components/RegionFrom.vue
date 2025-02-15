<template>
  <div
    v-if="isDropdownOpen"
    @click="toggleDropdown"
    class="fixed top-0 left-0 h-screen w-screen z-10"
  ></div>
  <div class="relative">
    <button
      class="text-[30px] w-[301px] block bg-second/35 relative text-white rounded-md"
      :class="!store.setPlacePinFrom ? 'px-[87px] py-7' : 'px-[15px] py-[11px]'"
      @click="toggleDropdown"
    >
      <div
        class="duration-300"
        :class="store.setPlacePinFrom ? 'scale-100' : 'h-0 w-0 scale-0'"
      >
        <p class="text-[20px] text-start text-[#D1D1D1]">{{ $t("from") }}</p>
        <p class="line-clamp-1 mt-1 text-start">{{ store.setPlacePinFrom }}</p>
      </div>
      <div
        class="duration-300"
        :class="!store.setPlacePinFrom ? 'scale-100' : 'h-0 w-0 scale-0'"
      >
        <p>{{ $t("from") }}</p>
      </div>
    </button>
    <div
      :class="isDropdownOpen ? 'scale-100' : 'h-0 scale-0 w-0'"
      class="absolute left-0 duration-300 mt-2 p-2 md:w-[600px] w-full bg-second/35 max-md:bg-second/60 rounded z-20"
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
              'hover:bg-gray-200 ': selectedRegion !== index,
            }"
            class="cursor-pointer p-2 text-sm rounded-md"
          >
            {{ region.name }}
          </p>
        </div>
        <!-- District List -->
        <div
          v-if="selectedRegion !== null"
          class="w-1/2 max-md:w-full max-h-56 max-md:border-t border-t-primary max-md:border-r max-md:border-r-gray-200 overflow-y-auto scrollable-element"
        >
          <p
            @click="
              setPlaceFromDistrict(regions[selectedRegion].name, district.name)
            "
            v-for="(district, districtIndex) in regions[selectedRegion].districts"
            :key="districtIndex"
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
import { ref, watch } from "vue";
import { useStore } from "../store";

const store = useStore();

const regions = ref([]);
const selectedRegion = ref(null);
const isDropdownOpen = ref(false);

// Load regions data from API
const loadRegions = async () => {
  try {
    const response = await fetch("http://45.130.148.194:5050/api/region");
    if (!response.ok) {
      throw new Error("Failed to fetch regions data");
    }
    const data = await response.json();
    regions.value = data.map(region => ({
      name: region.name,
      districts: region.districts
    }));
    selectedRegion.value = 0;
    store.setPlacePinFrom = "";
  } catch (error) {
    console.error("Error fetching regions data:", error);
  }
};
// async function getOrders(){
//   const orders = await axios.get("http://45.130.148.194:5050/api/taxi-order")
//   console.log(orders.data)
// }
// getOrders();

// Watch for changes in store.lang and reload regions accordingly
watch(() => store.lang, loadRegions, { immediate: true });

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectRegion = (index) => {
  selectedRegion.value = index;
};

const setPlaceFromDistrict = (region, district) => {
  store.setPlacePinFrom = `${region}. ${district}`;
  isDropdownOpen.value = false;
};
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
