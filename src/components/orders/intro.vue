<template>
  <div @click="notify()" class="relative bg-[#F2F2F2]">
    <div class="container py-[60px]">
      <div class="flex max-md:flex-col w-full justify-between max-md:items-center max-md:gap-[30px] mt-[70px]">
        <RegionsFromDr />
        <RegionsToDr />
        <CalendarDr />
        <button
          style="box-shadow: 0px 5px 10px 0px #0000001a"
          @click=""
          class="text-[30px] textShadow duration-500 max-md:w-[219px] max-md:mt-[10px] max-md:py-[14px] relative text-white py-7 rounded-md bg-primary md:px-[50px]"
        >
          {{ searchButtonText }}
        </button>
      </div>
      <!-- options day -->
      <p class="mt-[100px] text-[42px] max-md:hidden">{{ directionTitle }}</p>
      <div class="md:hidden">
        <swiper
          :slidesPerView="2"
          :centeredSlides="true"
          :pagination="{ clickable: true }"
          :modules="modules"
          class="md:hidden mt-[58px]"
        >
          <swiper-slide v-for="(item, index) in day" :key="index">
            <button
              @click="selectButton(index)"
              :class="index === selectedButtonIndex ? 'bg-primary duration-300 text-white' : 'bg-white text-black'"
              class="py-7 rounded-md max-md:shadow-lg md:w-1/6 shrink-0 px-[35px] whitespace-nowrap"
            >
              {{ item }}
            </button>
          </swiper-slide>
        </swiper>
      </div>
      <div class="flex md:w-full max-md:hidden mt-[52px] max-md:-mx-4 overflow-hidden max-md:overflow-auto scrollable-element gap-0 rounded-md shadow-lg">
        <div class="flex max-md:w-screen md:divide-x max-md:gap-[6px] divide-[#313131] md:w-full">
          <button
            v-for="(item, index) in day"
            :key="index"
            @click="selectButton(index)"
            :class="index === selectedButtonIndex ? 'bg-primary duration-300 text-white' : 'bg-white text-black'"
            class="py-7 text-[20px] max-md:shadow-lg md:w-1/6 shrink-0 px-[35px] whitespace-nowrap"
          >
            {{ item }}
          </button>
        </div>
      </div>
      <!-- options leave / direction / price -->
      <div class="grid grid-cols-3 max-md:-mr-4 gap-y-3 max-md:overflow-scroll scrollable-element">
        <div class="col-span-3 flex justify-between max-md:w-[650px]">
          <p v-for="(item, index) in optionLabels" :key="index" class="text-[20px] text-center mt-[122px] w-full">
            {{ item }}
          </p>
        </div>
        <div
          v-for="(item, index) in optionsAllData"
          :key="index"
          @click="navigate"
          class="col-span-3 cursor-pointer mb-6 w-full max-md:w-[650px] grid grid-cols-3 py-[26px] rounded-md shadow-lg bg-white"
        >
          <p class="font-medium text-center text-2xl max-md:text-lg">
            {{ item.time }}
            <span class="text-center md:text-[22px]">{{ item.date }}</span>
          </p>
          <p class="text-center font-medium text-2xl max-md:text-lg">{{ item.where }}</p>
          <p class="font-medium text-center text-2xl max-md:text-lg">
            {{ item.price }}<span class="md:text-[20px] text-[#999] font-normal">(so‘m)</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import CalendarDr from "../Calendar2.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import RegionsFromDr from "../RegionFrom2.vue";
import RegionsToDr from "../Regions2.vue";
import { useLanguageStore } from '../../store/languageStore';
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const modules = [Pagination];

const languageStore = useLanguageStore();
const router = useRouter();

const notify = () => {
  toast("Please select today or a future date!", {
    theme: "dark",
    type: "warning",
    transition: "slide",
    dangerouslyHTMLString: true,
  });
};

const Direct_options = ref(["Qayerdan", "Qayerga", "Qachon", "Qidirish"]);
const day = ref([
  "10-Aprel.2021y",
  "10-Aprel.2021y",
  "10-Aprel.2021y",
  "31-Aprel.2021y",
  "31-Aprel.2021y",
  "31-Aprel.2021y",
  "10-Aprel.2021y",
  "10-Aprel.2021y",
  "10-Aprel.2021y",
  "31-Aprel.2021y",
  "31-Aprel.2021y",
  "31-Aprel.2021y",
]);

const optionLabels = computed(() => [
  languageStore.isRussian ? "Откуда" : "Ketish",
  languageStore.isRussian ? "Название маршрута" : "Yo‘nalish nomi",
  languageStore.isRussian ? "Цена (сом)" : "Narxi(so‘m)"
]);

const optionsAllData = ref([
  {
    time: "08:00",
    date: "21.05.2021",
    where: "Toshkent - G‘ijduvon",
    price: "500.000",
  },
  {
    time: "08:00",
    date: "21.05.2021",
    where: "Toshkent - G‘ijduvon",
    price: "500.000",
  },
  {
    time: "08:00",
    date: "21.05.2021",
    where: "Toshkent - G‘ijduvon",
    price: "500.000",
  },
  {
    time: "08:00",
    date: "21.05.2021",
    where: "Toshkent - G‘ijduvon",
    price: "500.000",
  },
  {
    time: "08:00",
    date: "21.05.2021",
    where: "Toshkent - G‘ijduvon",
    price: "500.000",
  },
  {
    time: "08:00",
    date: "21.05.2021",
    where: "Toshkent - G‘ijduvon",
    price: "500.000",
  },
  {
    time: "08:00",
    date: "21.05.2021",
    where: "Toshkent - G‘ijduvon",
    price: "500.000",
  },
]);

const selectedButtonIndex = ref(0);

const selectButton = (index) => {
  selectedButtonIndex.value = index;
};

const navigate = () => {
  if (store.carType == 1) {
    router.push("/truck-order");
  } else {
    router.push("/taxi-order");
  }
};

// Language-specific text
const searchButtonText = computed(() => (languageStore.isRussian ? "Поиск" : "Qidirish"));
const directionTitle = computed(() => (languageStore.isRussian ? "Направление" : "Yo‘nalishni tanlash"));
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
