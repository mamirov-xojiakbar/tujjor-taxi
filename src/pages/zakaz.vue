<template>
  <div class="bg-[#F2F2F2] h-screen">
    <div class="pt-[100px] container">
      <div class="md:flex justify-between mt-10">
        <div class="flex">
          <router-link to="/">
            <button
              class="px-2 py-1 border border-[#F7931E] text-[#F7931E] bg-white"
            >
              <- Orqaga
            </button>
          </router-link>
          <h1 class="ml-10 text-[26px] font-bold">Buyurtma</h1>
          <input
            class="ml-4 md:w-[200px] px-2 w-full"
            type="text"
            placeholder="Buyurta vaqti"
            :value="store.setDatePin"
            disabled
          />
        </div>
        <div class="flex items-center">
          <h2 class="text-[20px] mr-6">Yo‘lovchi soni</h2>
          <p
            @click="decrement()"
            class="px-3 py-2 text-white bg-[#D8D8D8] rounded-l-lg cursor-pointer"
          >
            -
          </p>
          <p class="px-5 border py-[7px]">{{ count }}</p>
          <p
            @click="increment()"
            class="px-3 py-2 text-white bg-[#F7931E] rounded-r-lg cursor-pointer"
          >
            +
          </p>
        </div>
      </div>

      <div
        class="md:grid grid-cols-3 bg-white h-[400px] mt-11 border border-[#F7931E] border-b-0 gap-11 px-10 rounded-t-2xl"
      >
        <div>
          <p class="mt-3">Ism</p>
          <input
            type="text"
            class="border-2 border-[#F7931E] w-full py-1 px-2 rounded-xl"
            :value="store.userInfo.name"
            disabled
          />
        </div>

        <div>
          <p class="mt-3">Telefon raqam</p>
          <input
            type="text"
            class="border-2 border-[#F7931E] w-full py-1 px-2 rounded-xl"
            v-mask="'+998 ## ### ## ##'"
            :value="store.userInfo.phone"
            disabled
          />
        </div>
        <div class="mt-3">
          <p class="line-clamp-1 text-nowrap">
            Olib ketish manzilini belgilang
          </p>
          <button
            @click="store.location = !store.location"
            class="border border-[#F7931E] px-10 py-1 rounded-md"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 14.0835C14.7949 14.0835 16.25 12.6284 16.25 10.8335C16.25 9.03857 14.7949 7.5835 13 7.5835C11.2051 7.5835 9.75 9.03857 9.75 10.8335C9.75 12.6284 11.2051 14.0835 13 14.0835Z"
                stroke="#F7931E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.0002 2.16675C10.7016 2.16675 8.49722 3.07984 6.8719 4.70516C5.24659 6.33047 4.3335 8.53487 4.3335 10.8334C4.3335 12.8831 4.769 14.2242 5.9585 15.7084L13.0002 23.8334L20.0418 15.7084C21.2313 14.2242 21.6668 12.8831 21.6668 10.8334C21.6668 8.53487 20.7537 6.33047 19.1284 4.70516C17.5031 3.07984 15.2987 2.16675 13.0002 2.16675V2.16675Z"
                stroke="#F7931E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <Location></Location>
        <div>
          <p class="mt-3">Narx</p>
          <input
            type="text"
            class="border-2 border-[#F7931E] w-full py-1 px-2 rounded-xl"
            v-model="zakazInfo.price"
          />
        </div>
        <textarea
          name="text"
          id="text"
          class="border mb-[60%] p-3 border-[#F7931E] max-md:mt-4"
          v-model="zakazInfo.description"
        ></textarea>
      </div>
    </div>
    <div class="bg-white h-[90px]" style="box-shadow: 0 0 4px 0 gray">
      <div class="container py-3 md:flex gap-5">
        <div class="md:flex md:shadow-xl gap-8 items-center">
          <div>
            <p class="text-[#F7931E]">qayerdan</p>
            <p class="text-[22px]">{{ store.setPlacePinFrom }}</p>
          </div>
          <div class="max-md:hidden">
            <p class="text-[#F7931E]">-></p>
          </div>
          <div class="max-md:mt-8">
            <p class="text-[#F7931E]">qayerga</p>
            <p class="text-[22px]">{{ store.setPlacePinTo }}</p>
          </div>
        </div>
        <div>
          <button
            class="px-6 py-4 border text-[18px] bg-[#F7931E] text-white rounded-xl max-md:mt-4 max-md:mx-auto"
            @click="createZakaz()"
          >
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";

import { useStore } from "../store";
import Location from "../components/location.vue";

const store = useStore();
const count = ref(1);

async function getDiscrictFrom(name) {
  try {
    name = name.trim()
    const res = await axios.get("http://45.130.148.194:5050/api/districts");
    const districts = res.data;
    // console.log(districts[1].name);
    // console.log(name);
    console.log(districts[1].name == name);
    for (const [index, district] of districts.entries()) {
      // console.log(district.name);
      // console.log(name);
      // console.log(district.name[1] == name);
      if (district.name == name) {
        store.setPlaceFromIndex = index;
        return index;
      }
    }
    // throw new Error("Tuman topilmadi");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function getDiscrictTo(name) {
  try {
    name = name.trim();
    const res = await axios.get("http://45.130.148.194:5050/api/districts");
    // console.log("asxas",res.data[0].name);
    const districts = res.data;
    for (const [index, district] of districts.entries()) {
      // console.log(district.name);
      if (district.name === name) {
        // console.log(index);
        store.setPlaceFromIndexTo = index;
        return index;
      }
    }
    // throw new Error("Tuman topilmadi");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const zakazInfo = reactive({
  date: store.setDatePin,
  description: "",
  location_start: store.letlang,
  from_distinct_id: 0,
  to_distinct_id: 0,
  clientId: store.userInfo.id,
  count: count.value,
  price: "",
});

async function createZakaz() {
  try {
    const nameFrom = store.setPlacePinFrom.split(".")[1];
    const nameTo = store.setPlacePinTo.split(".")[1];
    // console.log(nameFrom, nameTo);

    zakazInfo.from_distinct_id = await getDiscrictFrom(nameFrom);
    zakazInfo.to_distinct_id = await getDiscrictTo(nameTo);

    // if (!zakazInfo.price || isNaN(Number(zakazInfo.price))) {
    //   throw new Error("Narx noto'g'ri formatda");
    // }

    // if (!zakazInfo.driverId || isNaN(Number(zakazInfo.driverId))) {
    //   throw new Error("Driver ID noto'g'ri formatda");
    // }
    console.log(zakazInfo);
    await axios.post("http://45.130.148.194:5050/api/taxi-order", zakazInfo);
    console.log("Zakaz qabul qilindi");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

function increment() {
  if (count.value < 4) count.value++;
  zakazInfo.count = count.value;
}

function decrement() {
  if (count.value > 1) count.value--;
  zakazInfo.count = count.value;
}
</script>

<style lang="scss" scoped></style>
