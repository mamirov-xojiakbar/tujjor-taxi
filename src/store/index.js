import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state() {
    return {
      carType: 2,
      setPlacePinFrom: null,
      setPlacePinTo: null,
      setDatePin: null,
      userInfo: null,
      driverInfo: null,
      lang: "uz",
      regClick: false,
      location: true,
      token: null,
      letlang: null,
    
    };
  },
  persist: true,
});
