<template>
  <div class="container">
    <div class="grid md:grid-cols-4 gap-[30px]">
      <div class="relative shadow-lg bg-white py-[11px] px-[15px] cursor-pointer" @click="toggleDropdown('from')">
        <p class="font-normal text-[20px] leading-[23.44px] text-[#828282] mb-[12px]">{{ fromTextLabel }}</p>
        <p class="font-normal text-[30px] leading-[35.16px] truncate">{{ truncatedText(fromText, 20) }}</p>
        <div :class="isDropdownOpen && dropdownType === 'from' ? 'scale-100' : 'h-0 scale-0 w-0'" class="absolute left-0 duration-300 mt-2 w-[600px] bg-gray-300 rounded shadow-lg z-10">
          <div class="flex">
            <div class="w-1/2 border-r max-h-56 overflow-y-auto scrollable-element">
              <p
                v-for="(region, index) in regions"
                :key="index"
                @click="selectRegion(index)"
                :class="{
                  'bg-primary text-white': selectedRegion === index,
                  'hover:bg-gray-200': selectedRegion !== index,
                }"
                class="cursor-pointer p-2 text-sm rounded-md"
                tabindex="0"
                role="option"
                :aria-selected="selectedRegion === index"
              >
                {{ region.region }}
              </p>
            </div>
            <div v-if="selectedRegion !== null" class="w-1/2 max-h-56 overflow-y-auto scrollable-element">
              <p
                v-for="(district, districtIndex) in regions[selectedRegion].district"
                :key="districtIndex"
                @click="setPlaceFromDistrict('from', regions[selectedRegion].region, district)"
                class="p-2 text-sm hover:bg-gray-200 cursor-pointer rounded-md"
                tabindex="0"
                role="option"
                aria-selected="false"
              >
                {{ district }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative shadow-lg bg-white p-[12px] cursor-pointer" @click="toggleDropdown('to')">
        <p class="font-normal text-[20px] leading-[23.44px] text-[#828282] mb-[12px]">{{ toTextLabel }}</p>
        <p class="font-normal text-[30px] leading-[35.16px] truncate">{{ truncatedText(toText, 20) }}</p>
        <div v-if="isDropdownOpen && dropdownType === 'to'" class="fixed top-0 left-0 h-screen w-screen z-10 bg-transparent" @click.self="closeDropdown"></div>
        <div :class="isDropdownOpen && dropdownType === 'to' ? 'scale-100' : 'h-0 scale-0 w-0'" class="absolute left-0 duration-300 mt-2 w-[600px] bg-gray-300 rounded shadow-lg z-10">
          <div class="flex">
            <div class="w-1/2 border-r max-h-56 overflow-y-auto scrollable-element">
              <p
                v-for="(region, index) in regions"
                :key="index"
                @click="selectRegion(index)"
                :class="{
                  'bg-primary text-white': selectedRegion === index,
                  'hover:bg-gray-200': selectedRegion !== index,
                }"
                class="cursor-pointer p-2 text-sm rounded-md"
                tabindex="0"
                role="option"
                :aria-selected="selectedRegion === index"
              >
                {{ region.region }}
              </p>
            </div>
            <div v-if="selectedRegion !== null" class="w-1/2 max-h-56 overflow-y-auto scrollable-element">
              <p
                v-for="(district, districtIndex) in regions[selectedRegion].district"
                :key="districtIndex"
                @click="setPlaceFromDistrict('to', regions[selectedRegion].region, district)"
                class="p-2 text-sm hover:bg-gray-200 cursor-pointer rounded-md"
                tabindex="0"
                role="option"
                aria-selected="false"
              >
                {{ district }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative shadow-lg bg-white p-[12px] flex justify-between items-center gap-[76px] cursor-pointer" @click="toggleDatepicker">
        <div>
          <p class="font-normal text-[20px] leading-[23.44px] text-[hsl(0,0%,51%)] mb-[12px]">{{ dateTextLabel }}</p>
          <p class="font-normal text-[25px] leading-[35.16px]">{{ formattedDate }}</p>
        </div>
        <img src="/xojiakbar-images/kalendar.png" alt="calendar img">
        <div v-if="isDatepickerOpen" class="absolute top-16 left-0 z-10 bg-white shadow-lg rounded">
          <DatePicker v-model="selectedDate" @update:modelValue="onDateSelected" />
        </div>
      </div>
      <button class="text-white font-normal text-[30px] leading-[35.16px] bg-[#F7931E] py-[28px] px-[58px] rounded-[5px]">{{ searchTextLabel }}</button>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive, computed } from 'vue';
import regionsData from '../../JSON/region.json';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import { useLanguageStore } from '../../store/languageStore';

const languageStore = useLanguageStore();

const fromTextLabel = computed(() => (languageStore.isRussian ? "Откуда" : "Qayerdan"));
const toTextLabel = computed(() => (languageStore.isRussian ? "Куда" : "Qayerga"));
const dateTextLabel = computed(() => (languageStore.isRussian ? "Дата" : "Sana"));
const searchTextLabel = computed(() => (languageStore.isRussian ? "Поиск" : "Qidirish"));


const regions = reactive(regionsData.regions);

const fromText = ref('Toshkent. Toshkent');
const toText = ref('Sirdaryo. Guliston');

const truncatedText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '..';
  }
  return text;
};

const selectedRegion = ref(null);
const isDropdownOpen = ref(false);
const dropdownType = ref('');

const selectedDate = ref(new Date());
const isDatepickerOpen = ref(false);

const toggleDatepicker = () => {
  isDatepickerOpen.value = !isDatepickerOpen.value;
};

const onDateSelected = (date) => {
  selectedDate.value = date;
  isDatepickerOpen.value = false;
};

const formattedDate = computed(() => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return selectedDate.value.toLocaleDateString('en-CA', options); 
});

const toggleDropdown = (type) => {
  if (dropdownType.value === type && isDropdownOpen.value) {
    isDropdownOpen.value = false;
    dropdownType.value = '';
  } else {
    isDropdownOpen.value = true;
    dropdownType.value = type;
  }
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
  dropdownType.value = '';
};

const selectRegion = (index) => {
  selectedRegion.value = index;
};

const setPlaceFromDistrict = (type, region, district) => {
  if (type === 'from') {
    fromText.value = `${region}. ${district}`;
  } else if (type === 'to') {
    toText.value = `${region}. ${district}`;
  }
};
</script>


<style scoped>
.scrollable-element {
  scrollbar-width: thin;
  scrollbar-color: #888 #ccc;
}
.scrollable-element::-webkit-scrollbar {
  width: 8px;
}
.scrollable-element::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}
.scrollable-element::-webkit-scrollbar-track {
  background-color: #ccc;
}
</style>
