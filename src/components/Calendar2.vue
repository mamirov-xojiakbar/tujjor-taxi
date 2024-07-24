<template>
  <div
    v-if="isDropdownOpen"
    @click="toggleDropdown"
    class="fixed top-0 left-0 h-screen w-screen z-10"
  ></div>
  <div class="relative">
    <button
      @click="toggleDropdown"
      :class="!store.setDatePin ? 'py-7 pr-12' : 'pl-[15px] py-[11px]'"
      class="text-[30px] relative text-black block rounded-md bg-white w-[301px] shadow-lg"
    >
      <div
        class="duration-300"
        :class="store.setDatePin ? 'scale-100' : 'h-0 w-0 scale-0'"
      >
        <p class="text-[20px] text-start text-[#D1D1D1]">{{ whenText }}</p>
        <p class="line-clamp-1 mt-1 text-start">{{ store.setDatePin }}</p>
      </div>
      <div
        class="duration-300"
        :class="!store.setDatePin ? 'scale-100' : 'h-0 w-0 scale-0'"
      >
        <p>{{ whenText }}</p>
      </div>
      <Icon
        icon="bx:calendar"
        class="text-[40px] absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-10 text-primary"
      />
    </button>
    <VDatePicker
      :class="
        isDropdownOpen ? 'scale-100 !h-[300px] !w-full' : '!h-0 scale-0 !w-0'
      "
      @click="func"
      v-model="date"
      mode="date"
      class="!absolute top-[105px] !text-black duration-300 !p-5 left-0 !z-20 cursor-pointer !w-full !bg-second/90 max-md:!bg-second/60 !border-none opacity-1"
      style="box-shadow: 0 0px 10px 0 white"
    />
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";
import { useStore } from "../store";
import { useLanguageStore } from '../store/languageStore';

const store = useStore();
const languageStore = useLanguageStore();

const date = ref(new Date());
const isDropdownOpen = ref(false);

const func = () => {
  const selectedDate = date.value;
  const today = new Date();

  // Reset time to compare only date parts
  selectedDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Check if selectedDate is today or a future date
  if (selectedDate >= today) {
    store.setDatePin = selectedDate;
    const year = String(selectedDate.getFullYear());
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    store.setDatePin = `${year}.${month}.${day}`;
  } else {
    toast(warningText, {
      theme: "dark",
      type: "warning",
      transition: "bounce",
      dangerouslyHTMLString: true,
    });
  }
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Language-specific text
const whenText = computed(() => (languageStore.isRussian ? "Когда" : "Qachon"));
const warningText = computed(() => (languageStore.isRussian ? "Пожалуйста, выберите сегодняшнюю или будущую дату!" : "Iltimos, bugungi yoki kelajakdagi sanani tanlang!"));
</script>

<style>
.scrollable-element::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Define the thumb style */
.scrollable-element::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom right, #f7931e 0%, #f7931e 100%);
  border-radius: 5px;
}

/* Define the track style */
.scrollable-element::-webkit-scrollbar-track {
  background-color: transparent;
  border: 1px solid transparent;
}

/* Define the button style */
.scrollable-element::-webkit-scrollbar-button {
  background-color: transparent;
  border-radius: 5px;
}

.textShadow:hover {
  text-shadow: 0 0px 5px white;
}

.swiper-pagination {
  margin-top: 20px;
  position: static !important;
}

.swiper {
  margin-left: -11%;
  margin-right: -2%;
}
</style>
