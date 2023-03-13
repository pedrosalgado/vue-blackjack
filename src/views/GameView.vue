<script setup>
import DealerHand from '@/components/DealerHand.vue'
import PlayerHand from '@/components/PlayerHand.vue'
import PlayerBoard from '@/components/PlayerBoard.vue'
import { tableStore } from '@/stores/table'
import { onMounted } from 'vue'

const store = tableStore()

onMounted(store.initialDeal)
</script>

<template>
  <main>
    <DealerHand />
    <PlayerHand />
    <PlayerBoard />
  </main>
</template>
