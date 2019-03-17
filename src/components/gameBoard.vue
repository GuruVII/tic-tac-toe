<template>
<div>
  <current-turn
    :turn="turn"
    :show-error="showCurrentTurnError"
  >
  </current-turn>
  <div>
    <div
      class="grid-container"
      v-for="(row, rowIndex) in gameFields"
      :key = "rowIndex"
    >
      <div
        class="grid-item"
        :class="{ 'hide-top' : (rowIndex === 0), 'hide-left' : (index === 0)}"
        v-for="(field, index) in row"
        :key = "index"
        v-on:click="clickOnGameBoard(rowIndex, index)"
      >
        <xSign v-if="field.fieldValue ==='x'"></xSign>
        <oSign v-if="field.fieldValue ==='o'"></osign>
      </div>
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
      isDisabled: false,
    };
  },
  props: {},
  methods: {
    createGameBoardValues() {
      return new Array(3).fill(undefined)
        .map(() => new Array(3).fill(undefined)
          .map((item, index) => ({
            fieldValue: null,
          }
          )));
    },
    clickOnGameBoard(rowIndex, index) {
      console.log(rowIndex, index)
      this.showCurrentTurnError = false;
      if (!this.isDisabled) {
        if (this.gameFields[rowIndex][index].fieldValue !== null) {
          this.showCurrentTurnError = true;
        } else {
          this.gameFields[rowIndex][index].fieldValue = this.turn;
          this.turn = this.turn === 'x' ? 'o' : 'x';
          const currentPosition = [index, rowIndex];
        }
      }
    },
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
    }
      .hide-top {
        border-top: none;
      }
      .hide-left {
        border-left: none;
      }
  }
</style>
