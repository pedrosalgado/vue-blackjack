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
    currentStake: 0,
    buttonsDisabled: true,
    canDouble: true,
    canSplit: false
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
    getWinner(state) {
      return state.winner
    },
    getIsPlayClosed(state) {
      return state.winner !== null
    },
    getCurrentStake(state) {
      return state.currentStake
    },
    getIsButtonDisabled(state) {
      return state.buttonsDisabled
    },
    getCanSplit(state) {
      return state.canSplit
    },
    getCanDouble(state) {
      return state.canDouble
    },
    getIsPlayerClosed(state) {
      return state.playerClosed
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
      this.makeBet()
      setTimeout(() => {
        this.buttonsDisabled = false
      }, '4500')
    },
    resetTable() {
      this.deck = []
      this.playerHand = []
      this.dealerHand = []
      this.winner = null
      this.playerPoints = 0
      this.dealerPoints = 0
      this.playerClosed = false
      this.busted = false
      this.currentStake = 0
      this.canDouble = true
      this.canSplit = false
    },
    doubleDown() {
      this.hit().then(() => {
        this.playerClosed = true
        this.dealerMove()
      })
    },
    makeBet() {
      this.playerCash--
      this.currentStake++
    },
    settleScore() {
      const winner = this.winner
      const playerPoints = this.playerPoints
      this.currentStake = 0
      if (winner === 'player') this.playerCash++
      if (winner === 'player' && playerPoints === 21) this.playerCash += 2
      this.restartDeal()
    },
    async hit() {
      this.buttonsDisabled = true
      if (this.playerClosed) {
        this.dealerHand.push(this.deck[0])
        this.dealerPoints = this.countPoints(this.dealerHand)
      } else {
        this.playerHand.push(this.deck[0])
        this.playerPoints = this.countPoints(this.playerHand)
        this.checkForWinOrBust()
      }
      this.deck.shift()
      if (!this.winner) {
        setTimeout(() => {
          this.buttonsDisabled = false
        }, '2000')
      }
    },
    countPoints(hand) {
      let total = 0
      for (const card of hand) {
        this.isLetter(card.value) ? (total += 10) : (total += parseInt(card.value))
      }
      return total
    },
    isLetter(str) {
      return str.length === 1 && str.match(/[A-Z]/i)
    },
    checkForWinOrBust() {
      if (this.playerPoints >= 21) this.playerClosed = true
      if (this.playerPoints > 21) {
        this.winner = 'dealer'
        this.restartDeal()
      }
    },
    stand() {
      this.buttonsDisabled = true
      this.playerPoints = this.countPoints(this.playerHand)
      this.playerClosed = true
      this.dealerMove()
    },
    dealerMove() {
      if (this.winner) return
      const playerPoints = this.playerPoints
      const dealerPoints = this.dealerPoints
      if (dealerPoints === 21) {
        this.resolveWinner()
        return
      }
      if (dealerPoints > 21) {
        this.restartDeal()
        this.winner = 'player'
        return
      }
      if (dealerPoints <= 17 && dealerPoints <= playerPoints) {
        this.hit().then(() => {
          this.dealerMove()
        })
      } else {
        this.resolveWinner()
      }
    },
    resolveWinner() {
      const playerPoints = this.playerPoints
      const dealerPoints = this.dealerPoints
      if (dealerPoints === playerPoints) {
        this.winner = 'tie'
        this.restartDeal()
        return
      }
      dealerPoints > playerPoints ? (this.winner = 'dealer') : (this.winner = 'player')
      this.settleScore()
    },
    split() {
      //divide the cards and double the bet
    },
    restartDeal() {
      setTimeout(() => {
        this.initialDeal()
      }, 4000)
    }
  }
})
