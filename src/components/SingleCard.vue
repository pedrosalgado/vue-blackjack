<script setup>
import CardSuits from '@/components/CardSuits.vue'

const props = defineProps(['card', 'faceDown'])
</script>

<template>
  <div v-if="!props.faceDown">
    <div>{{ props.card.value }}</div>
    <CardSuits :cardSuit="props.card.suit" />
  </div>
  <div v-else>
    <h3>hidden card</h3>
  </div>
</template>
