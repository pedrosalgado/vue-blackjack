import { defineStore } from 'pinia'
// import axios from 'axios'
// import { toRaw } from 'vue'

export const tableStore = defineStore('table', {
  state: () => ({
    deck: [],
    homeHand: [],
    playerHand: [],
    remainingDeck: [],
    playerCash: 0
  }),
  getters: {
    getHomeHand(state) {
      return state.homeHand
    },
    getPlayerHand(state) {
      return state.playerHand
    },
    getRemainingDeck(state) {
      return state.remainingDeck
    },
    getPlayerCash(state) {
      return state.playerCash
    }
  },
  actions: {
    createDeck() {
      let deck = []
      const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
      const suits = ['C', 'D', 'H', 'S']
      values.forEach((value) => {
        suits.forEach((suit) => {
          deck.push({ value, suit })
        })
      })
        this.deck = deck
    },
    shuffleDeck() {
      
    },
    doubleDown() {
      //here doubles the bet and asks for another card
    },
    hit() {
      //asks for another card
    },
    stand() {
      //settles the score
    },
    split() {
      //no idea what happens here
    },
    shufle() {
      //randomizes the cards
    }
  }
})
