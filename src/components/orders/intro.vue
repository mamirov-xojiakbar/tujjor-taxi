<template>
  <div @click="" class="relative bg-[#F2F2F2]">
    <div class="container py-[60px]">
      <div
        class="flex max-md:flex-col w-full justify-between max-md:items-center max-md:gap-[30px] mt-[70px]"
      >
        <RegionsFromDr />
        <RegionsToDr />
        <CalendarDr />
        <button
          style="box-shadow: 0px 5px 10px 0px #0000001a"
          @click="next()"
          class="text-[30px] textShadow duration-500 max-md:w-[219px] max-md:mt-[10px] max-md:py-[14px] relative text-white py-7 rounded-md bg-primary md:px-[50px]"
        >
          {{ searchButtonText }}
        </button>
      </div>
      <!-- options leave / direction / price -->
      <div class="py-10" :class="isCheck2 ? 'block' : 'hidden'">
        <h1 class="text-red-500 text-3xl text-center">
          Barcha Maydonlarni To'ldiring !!!
        </h1>
      </div>
      <div class="py-10" :class="isCheck ? 'block' : 'hidden'">
        <h1 class="text-red-500 text-3xl text-center">
          Bunday Buyurtma mavjud emas !!!
        </h1>
      </div>
      <div
        class="grid-cols-4 max-md:-mr-4 gap-y-3 max-md:overflow-scroll scrollable-element"
        :class="test ? 'grid' : 'hidden'"
      >
        <div class="col-span-4 flex justify-between max-md:w-[650px]">
          <p
            v-for="(item, index) in optionLabels"
            :key="index"
            class="text-[20px] text-center mt-[122px] w-full"
          >
            {{ item }}
          </p>
        </div>
        <div
          v-for="(item, index) in optionsAllData"
          :key="index"
          @click="ishidden = !ishidden"
          class="col-span-5 cursor-pointer mb-6 w-full max-md:w-[650px] grid grid-cols-5 py-[26px] rounded-md shadow-lg bg-white"
        >
          <p class="font-medium text-center text-2xl max-md:text-lg">
            <!-- {{ item.time }} -->
            <span class="text-center md:text-[22px]">{{ item.date }}</span>
          </p>

          <p class="text-center font-medium text-2xl max-md:text-lg">
            {{ item.fromDistrict.name }} - {{ item.toDistrict.name }}
          </p>
          <p class="font-medium text-center text-2xl max-md:text-lg">
            {{ item.price
            }}<span class="md:text-[20px] text-[#999] font-normal">(so‘m)</span>
          </p>
          <p class="text-center font-medium text-2xl max-md:text-lg">
            {{ item.status }}
          </p>
          <div class="col-span-4" :class="ishidden ? 'block' : 'hidden'">
            <p class="text-center font-medium text-xl max-md:text-lg">
              {{ item.client.name }}
            </p>
            <p class="text-center font-medium text-xl max-md:text-lg">
              {{ item.client.phone }}
            </p>
          </div>
          <p class="text-center font-medium text-2xl max-md:text-lg text-green-700">
            qabul qilish
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import CalendarDr from "../Calendar2.vue";
import { ref, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import RegionsFromDr from "../RegionFrom2.vue";
import RegionsToDr from "../Regions2.vue";
import { useLanguageStore } from "../../store/languageStore";
import axios from "axios";
import { useStore } from "../../store";

const store = useStore();
const languageStore = useLanguageStore();
const router = useRouter();
const test = ref(false);
const isCheck = ref(false);
const isCheck2 = ref(false);
const filterOrderArr = ref([]);

// const notify = () => {
//   toast("Please select today or a future date!", {
//     theme: "dark",
//     type: "warning",
//     transition: "slide",
//     dangerouslyHTMLString: true,
//   });
// };

const Direct_options = ref(["Qayerdan", "Qayerga", "Qachon", "Qidirish"]);

const optionLabels = computed(() => [
  languageStore.isRussian ? "Откуда" : "Ketish",
  languageStore.isRussian ? "Название маршрута" : "Yo‘nalish nomi",
  languageStore.isRussian ? "Цена (сом)" : "Narxi(so‘m)",
  languageStore.isRussian ? "status" : "status",
  languageStore.isRussian ? "qabul qilish" : "qabul qilish",
]);

const order = ref(null);
const dis = ref(null);
const from = ref(null);
const to = ref(null);
const ishidden = ref(false);

async function getOrder() {
  try {
    const response = await axios.get(
      "http://45.130.148.194:5050/api/taxi-order"
    );
    order.value = response.data;

    // console.log(order.value);
  } catch (error) {
    console.log(error);
  }
}
getOrder();

async function getDiscrict() {
  try {
    const response = await axios.get(
      "http://45.130.148.194:5050/api/districts"
    );
    dis.value = response.data;
    // console.log(dis.value);
  } catch (error) {
    console.log(error);
  }
}
getDiscrict();

const filterDis = () => {
  for (const iterator of dis.value) {
    // console.log(store.setPlacePinFrom.split(".")[1].trim());
    // console.log(iterator.name);
    if (iterator.name == store.setPlacePinFrom.split(".")[1].trim()) {
      from.value = iterator.id;
    }
    if (iterator.name == store.setPlacePinTo.split(".")[1].trim()) {
      to.value = iterator.id;
    }
  }
};

const filterOrder = () => {
  for (const iterator of order.value) {
    if (
      iterator.from_distinct_id == from.value &&
      iterator.to_distinct_id == to.value
    ) {
      filterOrderArr.value.push(iterator);
    }
  }
};

const optionsAllData = ref([]);

watchEffect(() => {
  if (filterOrderArr.value) {
    optionsAllData.value = filterOrderArr.value;
  }
});

const navigate = () => {
  if (store.carType == 1) {
    router.push("/truck-order");
  } else {
    router.push("/taxi-order");
  }
};

const next = () => {
  if (store.setPlacePinFrom && store.setPlacePinTo) {
    isCheck2.value = false;
    filterDis();
    filterOrder();

    if (filterOrderArr.value.length != 0) {
      isCheck.value = false;
      test.value = true;
    } else if (filterOrderArr.value.length == 0) {
      isCheck.value = true;
    }
  } else {
    isCheck2.value = true;
  }

  // console.log(to.value);
  // console.log(from.value);
  // console.log(filterOrderArr.value);
};

// Language-specific text
const searchButtonText = computed(() =>
  languageStore.isRussian ? "Поиск" : "Qidirish"
);
const directionTitle = computed(() =>
  languageStore.isRussian ? "Направление" : "Yo‘nalishni tanlash"
);
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
</style>
