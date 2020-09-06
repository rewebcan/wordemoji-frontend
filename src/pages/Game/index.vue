<template>
  <div class="main-container columns">
    <div class="column is-4 pb-0 pt-0">
      <div class="custom-container flex-container has-background-white">
        <div class="answers has-text-left">
          <div>
            <span class="player-name">Recep Can.</span><span class="player-answer">Gemide</span>
          </div>
          <div>
            <span class="correct-answer player-name">Saeidee Can.</span><span class="correct-answer player-answer">Titanic</span>
          </div>
        </div>
        <div class="actions">
          <b-field>
            <b-input
                expanded placeholder="Tahmin ettin!"
                type="is-info"
                icon="pencil-alt">
            </b-input>
            <p class="control">
              <button class="button is-fullwidth is-info">Yolla</button>
            </p>
          </b-field>
        </div>
      </div>
    </div>
    <div class="column is-8 pb-0 pt-0 pl-0">
      <div class="info-main-container">
        <div class="info-container columns pr-0 pb-3 pl-0 mb-0 mt-0 ml-0 mr-0 is-expanded">
          <div class="column is-8 pt-0 pl-0 pb-0">
            <div class="question-main-container flex-container pt-2 pr-2 pb-2 pl-2 has-background-white">
              <div class="question-container has-background-white has-text-centered" >

              </div>
              <div class="time-progress">
                <p class="has-text-right pr-3">00:30</p>
                <b-progress type="is-warning" :value="75" size="is-large"></b-progress>
              </div>
            </div>
          </div>
          <div class="column is-4 has-background-white player-list-container">
            <player
                v-for="(player, index) in players"
                :key="index"
                :player="player"/>
          </div>
        </div>
      </div>
      <div class="adds has-background-white"></div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Player from "./Components/player"

  export default {
    components: {
      Player
    },

    data() {
      return {}
    },

    computed: {
      ...mapGetters({players: 'players'}),

      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },

    methods: {
      ...mapMutations(['removePlayer']),
    }
  }
</script>

<style scoped>
  .main-container {
    height: 500px;
  }
  .custom-container {
    padding: 10px;
    height: 100%;
  }
  .flex-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .player-name {
    font-size: 18px;
    line-height: 24px;
    color: #868686;
  }
  .player-answer {
    color: #a0a0a0;
  }
  .correct-answer {
    color: #24ce73;
  }
  .player-list-container {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .time-progress p {
    font-size: 14px;
    line-height: 19px;
    font-weight: bold;
  }
  .adds {
    height: 21%
  }
  .question-container {
    height: 83%
  }
  .info-main-container {
    display: flex;
    height: 79%;
    width: 100%
  }
  .info-container {
    width: 100%;
  }
  .question-main-container {
    height: 100%;
  }
</style>
