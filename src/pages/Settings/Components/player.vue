<template>
  <div class="player-container" @mouseover="showRemoveContainer = true" @mouseleave="showRemoveContainer = false">
    <div class="player-avatar-container mr-3">
      <img :src="player.avatar" alt="avatar"/>
    </div>
    <div class="player-name-container">
      <span>{{ player.name }}</span>
    </div>
    <div v-show="showRemoveContainer" class="player-remove-container" @click="$emit('playerRemoved', player)">
      <b-icon
          icon="times"
          size="is-small">
      </b-icon>
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
    height: 100%;
    width: 100%;
  }
  .player-remove-container span {
  position: absolute;
  right: 7%;
  cursor: pointer;
}
</style>
