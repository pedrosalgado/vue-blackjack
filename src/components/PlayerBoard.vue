<script setup>
import { tableStore } from '@/stores/table'
import { computed } from 'vue'
// import {computed} from "vue";

const store = tableStore()

const isButtonDisabled = computed(() => store.getIsButtonDisabled)
const canSplit = computed(() => store.canSplit)
const canDouble = computed(() => store.canSplit)

// const busted = computed(() => store.getBusted)
</script>
<template>
  <div>
    <button
      :disabled="isButtonDisabled || !canSplit"
      :class="{ disabled: isButtonDisabled || !canSplit}"
      class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
      @click="store.split"
    >
      Split
    </button>
    <button
      :disabled="isButtonDisabled || !canDouble"
      :class="{ disabled: isButtonDisabled || !canDouble }"
      class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
      @click="store.doubleDown"
    >
      DoubleDown
    </button>
    <button
      :disabled="isButtonDisabled"
      :class="{ disabled: isButtonDisabled }"
      class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
      @click="store.hit"
    >
      Hit
    </button>
    <button
      :disabled="isButtonDisabled"
      :class="{ disabled: isButtonDisabled }"
      class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
      @click="store.stand"
    >
      Stand
    </button>
  </div>
</template>
<style>
button.disabled,
button.disabled:hover {
  background-color: gray;
}
</style>
