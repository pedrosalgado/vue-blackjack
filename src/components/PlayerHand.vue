<script setup>
import { tableStore } from '@/stores/table'
import { computed, ref, watch } from 'vue'
import SingleCard from '@/components/SingleCard.vue'

const store = tableStore()
const playerHand = computed(() => store.getPlayerHand)
const winner = computed(() => store.getWinner)
const isPlayClosed = computed(() => store.getIsPlayClosed)
const playerCash = computed(() => store.getPlayerCash)
const componentKey = ref(0)

watch(isPlayClosed, () => {
  if (!isPlayClosed.value) {
    componentKey.value += 1
  }
})
</script>

<template>
  <div class="mt-20">
    <p class="mb-3">Player Hand</p>
    <div
      class="absolute rounded-full top-4 -left-10 w-7 h-7 bg-orange-500 drop-shadow-md pt-0.5 text-center"
    >
      {{ store.playerPoints }}
    </div>
    <div class="flex">
      <div v-for="(card, index) in playerHand" :key="index">
        <SingleCard
          :card="card"
          :is-player-closed="true"
          :faceDown="false"
          :index="(index += 1)"
          :key="componentKey"
        />
      </div>
    </div>
    <div
      v-if="isPlayClosed"
      class="banner-holder z-50 absolute w-100 drop-shadow-md drop-shadow-md text-white top-16 left-24"
    >
      <div v-if="winner === 'player'" class="py-4 px-6 rounded bg-green-500">
        <p>Winner!</p>
      </div>
      <div v-else-if="winner === 'dealer'" class="py-4 px-6 rounded bg-red-500">
        <p>Looser!</p>
      </div>
      <div v-else-if="winner === 'tie'" class="bg-gray-500 py-4 px-6 rounded">
        <p>Tie!</p>
      </div>
    </div>
    <div class="mx-auto my-6 text-center">
      <h2>Cash: {{ playerCash }}</h2>
    </div>
  </div>
</template>

<style>
.banner-holder {
  animation-duration: 2s;
  animation-name: animate-pop;
  animation-timing-function: cubic-bezier(0.26, 0.53, 0.74, 1.48);
}
@keyframes animate-pop {
  0% {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1, 1);
  }
}
</style>
