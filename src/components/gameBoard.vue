<template>
<div class="grid-container">
  <div class="grid-item"><xSign></xSign></div>
  <div class="grid-item"><oSign></oSign></div>
  <div class="grid-item"></div>
  <div class="grid-item"></div>
  <div class="grid-item"></div>
  <div class="grid-item"></div>
  <div class="grid-item"></div>
  <div class="grid-item"></div>
  <div class="grid-item"></div>
</div>
</template>
<script>

import xSign from '@/components/gameBoardComponents/xSign';
import oSign from '@/components/gameBoardComponents/oSign';

export default {
  name: 'gameBoard',
  props: {
    msg: String,
  },
  components: {
    xSign,
    oSign
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
