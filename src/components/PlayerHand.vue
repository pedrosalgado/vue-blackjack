<script setup>
import { tableStore } from '@/stores/table'
import { computed } from 'vue'
import SingleCard from '@/components/SingleCard.vue'
import WinBanner from "@/components/WinBanner.vue";
import LooseBanner from "@/components/LooseBanner.vue";

const store = tableStore()
// const playerHand = ref(0)
const playerHand = computed(() => store.getPlayerHand)
const isWinner = computed(() => store.getIsPlayerWinner)
const isPlayClosed = computed(() => store.getIsPlayClosed)
const playerCash = computed(() => store.getPlayerCash)
</script>

<template>
  <div>
    <p>Player Hand</p>
    <p>Points: {{ store.playerPoints }}</p>
    <p>Cash: {{ playerCash }}</p>
    <div v-if="isPlayClosed" class="result-container">
      <WinBanner v-if="isWinner"/>
      <LooseBanner v-else/>
    </div>
    <!--  <div>{{ playerHand }}</div>-->
    <div v-for="card in playerHand" :key="card.value">
      <SingleCard :card="card" :faceDown="false" />
    </div>
  </div>
</template>

<style></style>
