<template>
  <div>
    <div class="current-turn-container">
      <div>Current turn:</div>
      <div class="current-turn-svg">
        <x-sign v-if="turn === 'x'"></x-sign>
        <o-sign v-if="turn === 'o'"></o-sign>
      </div>
      <span class="error" v-if="showError">Field has already been clicked</span>
    </div>
    
  </div>
</template>
<script>

import xSign from '@/components/gameBoardComponents/xSign';
import oSign from '@/components/gameBoardComponents/oSign';

export default {
  name: 'currentTurn',
  props: {
    turn: String,
    showError: Boolean,
  },
  components: {
    xSign,
    oSign,
  }
};
</script>
<style scoped lang="scss">
  .current-turn-svg {
    margin: 0px 16px;
    svg {
      height: 3vh;
      fill:hsla(0, 0%, 20%, 1)
    }
  }
  .current-turn-container {
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .error {
    color: red;
    font-weight: 1000;
  }
</style>
