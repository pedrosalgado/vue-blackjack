<script setup>
import { tableStore } from '@/stores/table'
// import {computed} from "vue";

const store = tableStore()

// const busted = computed(() => store.getBusted)

</script>
<template>
  <div>
    <button @click="store.doubleDown">DoubleDown</button>
    <button @click="store.hit">Hit</button>
    <button @click="store.stand">Stand</button>
  </div>
</template>