<template>
<div>
  <current-turn
    :turn="turn"
    :show-error="showCurrentTurnError"
  >
  </current-turn>
  <div class="grid-container">
    <div
      class="grid-item"
      v-for="(field, index) in gameFields"
      :key = "index"
      v-on:click="clickOnGameBoard(index)"
    >
      <xSign v-if="field.fieldValue ==='x'"></xSign>
      <oSign v-if="field.fieldValue ==='o'"></osign>
    </div>
  </div>
</div>
</template>
<script>

import currentTurn from '@/components/gameBoardComponents/currentTurn';
import xSign from '@/components/gameBoardComponents/xSign';
import oSign from '@/components/gameBoardComponents/oSign';

export default {
  name: 'gameBoard',
  data() {
    return {
      gameFields: this.createGameBoardValues(),
      turn: 'x',
      showCurrentTurnError: false,
    };
  },
  props: {},
  methods: {
    createGameBoardValues() {
      console.log("MOOOO")
      return new Array(9).fill(undefined).map((item, index) => ({
        fieldId: index,
        fieldValue: null,
      }));
    },
    clickOnGameBoard(fieldIndex) {
      this.showCurrentTurnError = false;
      if (this.gameFields[fieldIndex].fieldValue !== null) {
        this.showCurrentTurnError = true;
      } else {
        this.gameFields[fieldIndex].fieldValue = this.turn;
        this.turn = this.turn === 'x' ? 'o' : 'x';
        
      }
    }
  },
  components: {
    currentTurn,
    xSign,
    oSign,
  }
};
</script>
<style scoped lang="scss">
  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: center;
    align-items: center;
    grid-gap: 0px;
    .grid-item {
      min-width: 20vh;
      min-height: 20vh;
      display: flex;
      justify-content: center;
      align-items: center;
      color: grey;
      &:hover {
        background-color: rgba(223, 223, 223, 0.2)
      }
      // creates inner borders
      border-top: 1px solid #dfdfdf;
      border-left: 1px solid #dfdfdf;
      &:nth-child(-n + 2) {
        border-top: 1px solid #dfdfdf;
      }
      &:nth-child(odd) {
        border-left: 1px solid #dfdfdf;
      }
      &:nth-child(-n + 3) {
        border-top: none;
      }
      &:first-child,
      &:nth-child(3n + 1) {
        border-left: none;
      }
    }
  }
</style>
