import { defineStore } from 'pinia'
// import axios from 'axios'
// import { toRaw } from 'vue'

export const tableStore = defineStore('table', {
  state: () => ({
    deck: [],
    dealerHand: [],
    playerHand: [],
    playerCash: 20,
    playerPoints: 0,
    dealerPoints: 0,
    winner: null,
    playerClosed: false,
    busted: false,
    currentStake:0
  }),
  getters: {
    getDealerHand(state) {
      return state.dealerHand
    },
    getPlayerHand(state) {
      return state.playerHand
    },
    getPlayerCash(state) {
      return state.playerCash
    },
    getIsPlayerWinner(state) {
      return state.winner === 'player'
    },
    getIsPlayclosed(state){
      return state.winner !== null
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
      return this.shuffleDeck(deck)
    },
    shuffleDeck(cardsToShuffle) {
      let cards = cardsToShuffle.slice()
      for (let i = cards.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const randomCard = cards[randomIndex]
        cards[randomIndex] = cards[i]
        cards[i] = randomCard
      }
      return cards
    },
    initialDeal() {
      this.resetTable()
      const deck = this.createDeck()
      for (let i = 0; i < 4; i += 2) {
        this.playerHand.push(deck[i])
        this.dealerHand.push(deck[i + 1])
      }
      deck.splice(0, 4)
      this.deck = deck
      this.dealerPoints = this.countPoints(this.dealerHand)
      this.playerPoints = this.countPoints(this.playerHand)
      //at the end checks for initial blackjack
    },
    resetTable() {
      this.deck = []
      this.playerHand = []
      this.dealerHand = []
    },
    doubleDown() {
      this.hit().then(() => {
        this.playerClosed = true
        this.dealerMove()
      })
    },
    async hit() {
      if (this.playerClosed) {
        this.dealerHand.push(this.deck[0])
        this.dealerPoints = this.countPoints(this.dealerHand)
      } else {
        this.playerHand.push(this.deck[0])
        this.playerPoints = this.countPoints(this.playerHand)
        this.checkForWinOrBust()
      }
      this.deck.shift()
    },
    countPoints(hand) {
      console.log(hand)
      let total = 0
      for (const card of hand) {
        this.isLetter(card.value) ? (total += 10) : (total += parseInt(card.value))
      }
      //if (total === 21) console.log('blackjack') //dispatch event to catch on component?
      // if (total > 21) this.busted = true
      return total
    },
    isLetter(str) {
      return str.length === 1 && str.match(/[A-Z]/i)
    },
    checkForWinOrBust() {
      if (this.playerPoints >= 21) this.playerClosed = true
      if (this.playerPoints > 21) this.winner = 'dealer'
    },
    stand() {
      this.playerPoints = this.countPoints(this.playerHand)
      this.playerClosed = true
      this.dealerMove()
      //settles the score
    },
    dealerMove() {
      if (this.winner === 'dealer') return
      const playerPoints = this.playerPoints
      const dealerPoints = this.dealerPoints
      if (dealerPoints === 21) {
        this.resolveWinner()
        return
      }
      if (dealerPoints > 21) {
        this.winner = 'player'
        return
      }
      // if hands are equal is a tie or push
      if (dealerPoints <= 17 && dealerPoints < playerPoints) {
        this.hit().then(() => {
          this.dealerMove()
        })
      }
      this.resolveWinner()
    },
    resolveWinner() {
      const playerPoints = this.playerPoints
      const dealerPoints = this.dealerPoints
      if (dealerPoints === playerPoints) {
        this.winner = 'tie'
        return
      }
      dealerPoints > playerPoints ? (this.winner = 'dealer') : (this.winner = 'player')
      // this.restartDeal()
    },
    split() {
      //no idea what happens here
    },
    wait2Seconds() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.initialDeal())
        }, 2000)
      })
    },

    async restartDeal() {
      console.log('calling')
      await this.wait2Seconds()
      // console.log(result)
      // Expected output: "resolved"
    }
  }
})
