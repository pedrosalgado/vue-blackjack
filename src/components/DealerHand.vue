<script setup>
import { tableStore } from '@/stores/table'
import { computed } from 'vue'
import SingleCard from '@/components/SingleCard.vue'
import WinBanner from "@/components/WinBanner.vue";
import LooseBanner from "@/components/LooseBanner.vue";

const store = tableStore()
// const playerHand = ref(0)
const dealerHand = computed(() => store.getDealerHand)
const isWinner = computed(() => !store.getIsPlayerWinner)
const isPlayClosed = computed(() => store.getIsPlayClosed)
const currentStake = computed(() => store.getCurrentStake)
</script>

<template>
  <div>
    <p>Dealer Hand</p>
    <p v-if="isPlayClosed">Points: {{ store.dealerPoints }}</p>
    <div v-if="isPlayClosed" class="result-container">
      <WinBanner v-if="isWinner"/>
      <LooseBanner v-else/>
    </div>
    <div class="forclass" v-for="(card, index) in dealerHand" :key="card.value">
      <SingleCard :card="card" :faceDown="index === 1000" />
    </div>
  </div>
  <div class="result"></div>
  <p>Stake: {{ currentStake }}</p>
</template>

<style></style>