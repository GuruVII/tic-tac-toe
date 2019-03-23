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
      columnInArray: 0,
      rowInArray: 1,
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
    clickOnGameBoard(rowIndex, columnIndex) {
      console.log(rowIndex, columnIndex)
      this.showCurrentTurnError = false;
      if (!this.isDisabled) {
        if (this.gameFields[rowIndex][columnIndex].fieldValue !== null) {
          this.showCurrentTurnError = true;
        } else {
          this.gameFields[rowIndex][columnIndex].fieldValue = this.turn;
          const currentPosition = [columnIndex, rowIndex];
          this.prepareDataForVictoryCheck(currentPosition, this.gameFields, this.turn);
          this.turn = this.turn === 'x' ? 'o' : 'x';
        }
      }
    },
    prepareDataForVictoryCheck(fieldClicked, currentGameField, currentSymbol) {
      const rowArray = currentGameField[fieldClicked[this.rowInArray]];
      const columnArray = this.createColumnArray(fieldClicked, currentGameField)
      const upwardDiagonalArray = this.createDiagonalArray(fieldClicked, currentGameField, -1, 1);
      const downwardDiagonalArray = this.createDiagonalArray(fieldClicked, currentGameField, -1, -1);
      console.log('up', upwardDiagonalArray);
      console.log("down", downwardDiagonalArray);
      //this.checkHorizontally(fieldClicked, currentGameField[fieldClicked[this.rowInArray]], currentSymbol);
    },
    checkForVictory(fieldClicked, currentRow, currentSymbol) {
      const victory = currentRow.map(item => item.fieldValue).every(item => item === currentSymbol);
      if (victory) {
        console.log('victory', victory)
      }
    },
    createColumnArray(fieldClicked, gameFields) {
      return gameFields.map(row => row[fieldClicked[this.columnInArray]].fieldValue);
    },
    createDiagonalArray(fieldClicked, gameFields, rowPositionChange, columnPositionChange) {
      // add rows, remove columns
      let rowPosition = fieldClicked[this.rowInArray];
      let columnPosition = fieldClicked[this.columnInArray];
      if (rowPosition !== 0 && gameFields[rowPosition][columnPosition + columnPositionChange]) {
        while (rowPosition > 0 && gameFields[rowPosition][columnPosition + columnPositionChange]) {
          rowPosition += rowPositionChange;
          columnPosition += columnPositionChange;
        }
      }
      console.log('row', rowPosition)
      console.log('column', columnPosition)
      return gameFields.map((row, index) => {
        if (index !== rowPosition) {
          return undefined;
        }
        if (row[columnPosition]) {
          const valueToBeReturned = row[columnPosition].fieldValue;
          rowPosition += (-1) * rowPositionChange;
          columnPosition += (-1) * columnPositionChange;
          return valueToBeReturned;
        }
        return undefined;
      });
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
      min-width: 20vw;
      min-height: 20vw;
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