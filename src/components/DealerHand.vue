<script setup>
import { tableStore } from '@/stores/table'
import { computed } from 'vue'
import SingleCard from '@/components/SingleCard.vue'

const store = tableStore()
const dealerHand = computed(() => store.getDealerHand)
const isPlayClosed = computed(() => store.getIsPlayClosed)
const isPlayerClosed = computed(() => store.getIsPlayerClosed)
const currentStake = computed(() => store.getCurrentStake)
</script>

<template>
  <div>
    <p class="mb-3">Dealer Hand</p>
    <div class="flex">
      <div
          v-if="isPlayClosed"
        class="absolute rounded-full -top-4 -left-10 w-7 h-7 bg-orange-500 drop-shadow-md pt-0.5 text-center"
      >
        {{ store.dealerPoints }}
      </div>
      <div v-for="(card, index) in dealerHand" :key="index">
        <SingleCard
          :card="card"
          :is-player-closed="isPlayerClosed"
          :face-down="index === 0"
          :index="(index += 10)"
        />
      </div>
    </div>
  </div>
  <p class="mt-20">Stake: {{ currentStake }}</p>
</template>

<style></style>
