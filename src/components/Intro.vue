<template>
  <div class="pt-[168px] pb-[325px] max-md:py-[120px] mainBack">
    <div class="container">
      <div class="flex items-center justify-center">
        <button
          @click="store.carType = 2"
          :class="[
            'text-white py-2.5 max-md:py-2 md:text-[26px] font-medium duration-300 px-16 max-md:px-12 border border-primary',
            store.carType == 2 ? 'bg-primary active' : 'inactive',
          ]"
          style="border-radius: 45px 0 0 45px"
        >
          {{ languageStore.isRussian ? 'Такси' : 'Taksi' }}
        </button>
        <button
          @click="store.carType = 1"
          :class="[
            'text-white py-2.5 max-md:py-2 md:text-[26px] font-medium duration-300 px-16 max-md:px-12 border border-primary',
            store.carType == 1 ? 'bg-primary active' : 'inactive',
          ]"
          style="border-radius: 0 45px 45px 0"
        >
          {{ languageStore.isRussian ? 'Грузовик' : 'Yuk' }}
        </button>
      </div>
      <h1 class="font-medium text-[42px] max-md:text-[22px] mt-16 max-md:mt-12 text-white">
        {{ languageStore.isRussian ? 'Ежедневные услуги такси и грузоперевозок по Узбекистану' : "Har kuni O'zbekiston bo'ylab taxi va yuk tashish xizmati" }}
      </h1>
      <p class="mt-[30px] max-md:mt-4 text-[22px] max-md:text-lg text-white">
        {{ languageStore.isRussian ? 'Предлагаем доступные виды перевозок по регионам.' : "Biz viloyatlar bo'ylab hamyonbop qatnov turlarini taklif qilamiz" }}
      </p>
      <div class="flex w-full max-md:items-center max-md:gap-[30px] max-md:flex-col justify-between mt-[70px] max-md:mt-10">
        <RegionFrom />
        <Regions />
        <Calendar />
        <router-link
          :to="store.carType == 1 ? '/delivery-order' : '/orders'"
          :class="
            store.setPlacePinFrom && store.setPlacePinTo && store.setDatePin
              ? 'bg-primary text-white'
              : 'text-white bg-[#404040]'
          "
          class="text-[30px] h-[101px] max-md:mt-[10px] max-md:w-[219px] textShadow duration-500 relative md:py-7 py-[14px] rounded-md md:px-[50px] cursor-pointer"
        >
          {{ languageStore.isRussian ? 'Поиск' : 'Qidiruv' }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import RegionFrom from "./RegionFrom.vue";
import Regions from "./Regions.vue";
import Calendar from "./Calendar.vue";
import { useStore } from "../store";
import { useLanguageStore } from '../store/languageStore';

const store = useStore();
const languageStore = useLanguageStore();

const find = () => {
  if (store.setPlacePinFrom && store.setPlacePinTo && store.setDatePin) {
    window.scrollTo({
      top: 900,
      behavior: "smooth",
    });
  }
};
</script>

<style scoped>
.mainBack {
  background-repeat: no-repeat;
  background-image: url("/intro.png");
  background-size: cover;
}
.textShadow:hover {
  text-shadow: 0 0px 5px white;
}
</style>
