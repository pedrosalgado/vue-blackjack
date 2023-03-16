<script setup>
import CardSuits from '@/components/CardSuits.vue'

const props = defineProps(['card', 'faceDown', 'index', 'isPlayerClosed'])
const cardNumber =
  (props.index >= 3 && props.index < 10) || props.index > 11
    ? 'card-number-1'
    : 'card-number-' + props.index
</script>

<template>
  <div
    v-if="props.faceDown && !props.isPlayerClosed"
    class="hidden-card card border-2 border-gray-500 rounded mr-4 p-1 drop-shadow-md bg-gray-300 w-20 h-full"
    :class="cardNumber"
  ></div>
  <div
    v-else-if="props.faceDown"
    class="card border-2 border-gray-500 rounded mr-4 p-1 drop-shadow-md bg-white"
  >
    <div>{{ props.card.value }}</div>
    <CardSuits :cardSuit="props.card.suit" />
  </div>
  <div
    v-else
    class="card border-2 border-gray-500 rounded mr-4 p-1 drop-shadow-md bg-white"
    :class="cardNumber"
  >
    <div>{{ props.card.value }}</div>
    <CardSuits :cardSuit="props.card.suit" />
  </div>
</template>
<style>
.hidden-card {
  background-color: #dddddd;
}

.card-number-1 {
  top: -1000px;
  position: relative;
  animation-name: cardDeal-1;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
.card-number-10 {
  top: -1000px;
  position: relative;
  animation-name: cardDeal-2;
  animation-duration: 3s;
  animation-fill-mode: forwards;
}
.card-number-2 {
  top: -1000px;
  position: relative;
  animation-name: cardDeal-3;
  animation-duration: 4s;
  animation-fill-mode: forwards;
}
.card-number-11 {
  top: -1000px;
  position: relative;
  animation-name: cardDeal-4;
  animation-duration: 4.5s;
  animation-fill-mode: forwards;
}
@keyframes cardDeal-1 {
  0% {
    top: -1000px;
  }
  100% {
    top: 0px;
  }
}
@keyframes cardDeal-2 {
  25% {
    top: -1000px;
  }
  100% {
    top: 0px;
  }
}
@keyframes cardDeal-3 {
  50% {
    top: -1000px;
  }
  100% {
    top: 0px;
  }
}
@keyframes cardDeal-4 {
  75% {
    top: -1000px;
  }
  100% {
    top: 0px;
  }
}
</style>