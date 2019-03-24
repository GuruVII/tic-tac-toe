<template>
<div>
  <current-turn
    :turn="turn"
    :show-error="showCurrentTurnError"
    :victory="victory"
  >
  </current-turn>
  <div>
    <div
      class="grid-container"
      v-for="(row, rowIndex) in gameFields"
      :key = "rowIndex"
    >
      <div
        v-for="(field, index) in row"
        class="grid-item"
        :class="{'show-left' : (index !== 0), 'hide-top' : (rowIndex === 0)}"
        :key = "index"
        @click="clickOnGameBoard(rowIndex, index)"
      >
        <xSign v-if="field.fieldValue ==='x'"></xSign>
        <oSign v-if="field.fieldValue ==='o'"></osign>
        <xSign class="victory" v-if="field.fieldValue ==='X'"></xSign>
        <oSign class="victory" v-if="field.fieldValue ==='O'"></osign>
      </div>
    </div>
  </div>
  <div class="btn" @click="resetGame">Reset Game</div>
</div>
</template>
<script>
import currentTurn from '@/components/gameBoardComponents/currentTurn.vue';
import xSign from '@/components/gameBoardComponents/xSign.vue';
import oSign from '@/components/gameBoardComponents/oSign.vue';

export default {
  name: 'gameBoard',
  data() {
    return {
      gameFields: this.createGameBoardValues(),
      turn: 'x',
      showCurrentTurnError: false,
      columnInArray: 0,
      rowInArray: 1,
      victory: false,
    };
  },
  props: {},
  methods: {
    createGameBoardValues() {
      return new Array(3).fill(undefined)
        .map(() => new Array(3).fill(undefined)
          .map(() => ({
            fieldValue: null,
          }
          )));
    },
    clickOnGameBoard(rowIndex, columnIndex) {
      this.showCurrentTurnError = false;
      if (!this.victory) {
        if (this.gameFields[rowIndex][columnIndex].fieldValue !== null) {
          this.showCurrentTurnError = true;
        } else {
          this.gameFields[rowIndex][columnIndex].fieldValue = this.turn;
          const currentPosition = [columnIndex, rowIndex];
          const preparedData = this.prepareDataForVictoryCheck(currentPosition, this.gameFields);
          const victoryArray = this.checkForVictory(
            Object.keys(preparedData).map(item => preparedData[item]),
            this.turn,
          );
          this.victory = victoryArray.includes(true);
          if (!this.victory) {
            this.turn = this.turn === 'x' ? 'o' : 'x';
          } else {
            this.gameFields = this.highlightVictoriousSymbols(
              this.gameFields,
              currentPosition,
              this.getWinningDirection(preparedData, this.turn),
            );
          }
        }
      }
    },
    prepareDataForVictoryCheck(fieldClicked, currentGameField) {
      const rowArray = currentGameField[fieldClicked[this.rowInArray]].map(item => item.fieldValue);
      const columnArray = this.createColumnArray(
        fieldClicked,
        currentGameField,
      )
      const upwardDiagonalArray = this.createDiagonalArray(
        fieldClicked,
        currentGameField,
        -1,
        1,
      );
      const downwardDiagonalArray = this.createDiagonalArray(
        fieldClicked,
        currentGameField,
        -1,
        -1,
      );
      return {
        rowArray,
        columnArray,
        upwardDiagonalArray,
        downwardDiagonalArray,
      };
    },
    checkForVictory(preparedData, currentSymbol) {
      return preparedData.map(direction => direction.every(item => item === currentSymbol));
    },
    createColumnArray(fieldClicked, gameFields) {
      return gameFields.map(row => row[fieldClicked[this.columnInArray]].fieldValue);
    },
    createDiagonalArray(fieldClicked, gameFields, rowPositionChange, columnPositionChange) {
      let rowPosition = fieldClicked[this.rowInArray];
      let columnPosition = fieldClicked[this.columnInArray];
      if (rowPosition !== 0 && gameFields[rowPosition][columnPosition + columnPositionChange]) {
        while (rowPosition > 0 && gameFields[rowPosition][columnPosition + columnPositionChange]) {
          rowPosition += rowPositionChange;
          columnPosition += columnPositionChange;
        }
      }
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
    getWinningDirection(preparedData, currentSymbol) {
      return Object.keys(preparedData)
        .filter(item => preparedData[item].every(symbol => symbol === currentSymbol))
        .join()
        .replace('Array', '');
    },
    highlightVictoriousSymbols(gameBoard, fieldClicked, winningDirection) {
      const field = gameBoard.map(row => row);
      switch (winningDirection) {
        case 'column': {
          const victoriousColumn = fieldClicked[this.columnInArray];
          return field.map((item) => {
            const row = [...item];
            row[victoriousColumn].fieldValue = row[victoriousColumn].fieldValue.toUpperCase();
            return {
              ...row,
              [victoriousColumn]: {
                ...row[victoriousColumn],
                fieldValue: row[victoriousColumn].fieldValue.toUpperCase()
              },
            };
          });
        }
        case 'row': {
          const victoriousRow = fieldClicked[this.rowInArray];
          return field.map((item, index) => {
            const row = [...item];
            if (index === victoriousRow) {
              return row.map(value => ({
                ...value,
                fieldValue: value.fieldValue.toUpperCase(),
              }));
            }
            return row;
          });
        }
        case 'downwardDiagonal': {
          return this.diagonalHighlight(fieldClicked, gameBoard, -1, -1);
        }
        case 'upwardDiagonal': {
          return this.diagonalHighlight(fieldClicked, gameBoard, -1, 1)
        }
        default: {
          return field;
        }
      }
    },
    diagonalHighlight(fieldClicked, gameFields, rowPositionChange, columnPositionChange) {
      let rowPosition = fieldClicked[this.rowInArray];
      let columnPosition = fieldClicked[this.columnInArray];
      if (rowPosition !== 0 && gameFields[rowPosition][columnPosition + columnPositionChange]) {
        while (rowPosition > 0 && gameFields[rowPosition][columnPosition + columnPositionChange]) {
          rowPosition += rowPositionChange;
          columnPosition += columnPositionChange;
        }
      }
      return gameFields.map((row) => {
        const tempRow = row.map((field, index) => {
          if (columnPosition === index) {
            return {
              ...field,
              fieldValue: field.fieldValue.toUpperCase(),
            };
          }
          return field;
        });
        columnPosition += (-1) * columnPositionChange;
        return tempRow;
      });
    },
    resetGame() {
      this.gameFields = this.createGameBoardValues();
      this.victory = false;
      this.turn = 'x';
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
      min-width: 15vw;
      min-height: 15vw;
      display: flex;
      justify-content: center;
      align-items: center;
      color: grey;
      &:hover {
        background-color: rgba(223, 223, 223, 0.2)
      }
      // creates inner borders
      border-top: 1px solid #dfdfdf;
    }
      .hide-top {
        border-top: none;
      }
      .show-left {
        border-left: 1px solid #dfdfdf;
      }
      .victory {
        fill: red;
        filter: drop-shadow( 5px 5px 4px rgba(0, 0, 0, .7));
      }
  }
  .btn {
    cursor: pointer;
    max-width: 100px;
    padding: 5px 10px;
    background-color: green;
    color: whitesmoke;
    text-transform: uppercase;
    font-weight: 600;
    user-select: none;
    -webkit-transition: padding 0.2s; /* Safari */
    transition: padding 0.2s;
    &:active {
      background-color: rgb(0, 78, 0);
      padding: 7px 15px;
      -webkit-transition: padding 0.2s; /* Safari */
      transition: padding 0.2s;
    }
  }
</style>