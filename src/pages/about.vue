<template>
  <div class="container md:py-[172px] pt-[144px] pb-6">
    <h1
      class="md:text-[48px] text-[33px] text-center font-medium text-[#313131]"
    >
      {{ introText }}
    </h1>
    <div class="grid md:grid-cols-2 gap-10 md:mt-20 mt-[30px]">
      <img
        class="w-[346px] md:w-full max-md:w-full object-cover mx-auto"
        src="/about.png"
        alt="about image"
      />
      <p class="md:text-lg text-base md:w-full max-md:w-full">
        {{ aboutText }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useLanguageStore } from "../store/languageStore";

export default {
  setup() {
    const languageStore = useLanguageStore();

    const aboutText = computed(() =>
      languageStore.isRussian
        ? "Минимальный моль не желает деморализовать структуру. Сидит на некоторое время боль делает, чтобы было ощущение. Официальное последствие делает это повторяющимся моллом. Минимальный моль не желает деморализовать структуру. Сидит на некоторое время боль делает, чтобы было ощущение. Официальное последствие делает это повторяющимся моллом.Минимальный моль не желает деморализовать структуру. Сидит на некоторое время боль делает, чтобы было ощущение. Официальное последствие делает это повторяющимся моллом.Минимальный моль не желает деморализовать структуру. Сидит на некоторое время боль делает, чтобы было ощущение. Официальное последствие делает это повторяющимся моллом. Минимальный моль не желает деморализовать структуру. Сидит на некоторое время боль делает, чтобы было ощущение. Официальное последствие делает это повторяющимся моллом.Минимальный моль не желает деморализовать структуру. Сидит на некоторое время боль делает, чтобы было ощущение. Официальное последствие делает это повторяющимся моллом. Минимальный моль не желает деморализовать "
        : "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.  mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."
    );

    const introText = computed(() =>
      languageStore.isRussian ? "O нас" : "Biz haqimizda"
    );

    return {
      aboutText,
      introText,
    };
  },
};
</script>

<style lang="scss" scoped></style>
