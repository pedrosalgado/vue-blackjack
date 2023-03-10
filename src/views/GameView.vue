<script setup>
import HomeHand from '@/components/HomeHand.vue'
import { tableStore } from '@/stores/table'
import { onMounted } from 'vue'

const store = tableStore()

onMounted(store.createDeck)
</script>

<template>
  <main>
    <HomeHand />
  </main>
</template>
