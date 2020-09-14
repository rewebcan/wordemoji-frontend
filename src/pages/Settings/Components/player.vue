<template>
  <div class="player-container" @mouseover="showRemoveContainer = true && isMaster" @mouseleave="showRemoveContainer = false">
    <div class="player-avatar-container mr-3">
      <img :src="player.avatar" alt="avatar"/>
    </div>
    <div class="player-name-container">
      <span>{{ player.name }}</span>
    </div>
    <div v-show="showRemoveContainer" class="player-remove-container" @click="$emit('player-removed', player)">
        <b-icon 
            icon="trash"
            size="is-small"
            type="is-danger"/>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showRemoveContainer: false
      }
    },

    props: {
      player: {
        type: Object,
        required: true
      },
      isMaster: {
        type: Boolean,
        required: true,
      }
    },
  }
</script>

<style>
  .player-container {
    position: relative;
    display: flex;
    padding: 10px;
    height: 90px;
    border-bottom: 1px solid #dddfe2;
    user-select: none;
  }
  .player-avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .player-avatar-container img{
    height: 64px;
    width: 64px;
  }
  .player-name-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .player-remove-container {
    position: absolute;
    right: 0;
  }
  .player-remove-container span {
  position: absolute;
  right: 7%;
  cursor: pointer;
}
</style>
