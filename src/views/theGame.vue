<template>
  <div class="theGame">
    <gameBoard></gameBoard>
  </div>
</template>

<script>
// @ is an alias to /src
import gameBoard from '@/components/gameBoard.vue';

export default {
  name: 'theGame',
  components: {
    gameBoard,
  },
};
</script>
