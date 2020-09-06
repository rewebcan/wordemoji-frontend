<template>
  <div class="player-container">
    <div class="player-avatar-container mr-3">
      <img :src="player.avatar" alt="avatar"/>
    </div>
    <div class="player-name-container">
      <span class="player-name">{{ player.name }}</span>
      <span class="player-points">Puan {{ player.points }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
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
    align-items: self-end;
    flex-direction: column;
  }
  .player-remove-container span {
    position: absolute;
    right: 7%;
    cursor: pointer;
  }
  .player-points {
    color: #247cf2;
    width: 100%;
    text-align: left;
    font-size: 14px;
    line-height: 19px;
  }
  .player-name {
    font-size: 18px;
    line-height: 24px;
  }
</style>
