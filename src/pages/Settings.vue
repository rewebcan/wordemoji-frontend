<template>
  <div class="main-wrapper columns">
    <div class="column is-4 pb-0 pt-0">
      <div class="custom-container flex-container has-background-white">
        <div class="avatars-container">
          <img src="../assets/female-singer.png" alt="avatar">
          <b-field class="mt-2">
            <b-input placeholder="Name..." disabled></b-input>
          </b-field>
        </div>
        <div class="actions">
          <b-field
              label="Settings" class="has-text-left">
            <b-select placeholder="Rounds Numbers" expanded>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </b-select>
          </b-field>
          <b-field>
            <b-select placeholder="Rounds Times" expanded>
              <option value="flint">2 min</option>
              <option value="silver">5 min</option>
              <option value="silver">10 min</option>
            </b-select>
          </b-field>
          <b-button type="button is-info is-fullwidth">Start The Game</b-button>
        </div>
      </div>
    </div>
    <div class="column is-5 pt-0 pr-0 pb-0 pl-0">
      <div class="custom-container flex-container has-background-white">
        <div class="players-list-container has-background-primary-light"></div>
        <div class="players-footer-container flex-container">
          <p class="copy-link-text">Linki kopyala ve arkadaşlarına gönder. Eğlence başlasın!</p>
          <b-field>
            <b-input expanded placeholder="Search..."
                     type="search"
                     icon="magnify">
            </b-input>
            <p class="control">
              <button class="button is-fullwidth is-primary">Search</button>
            </p>
          </b-field>
        </div>
      </div>
    </div>
    <div class="column is-3 pb-0 pt-0">
      <div class="custom-container has-background-white"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  }
}
</script>

<style scoped>
.main-wrapper {
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
.avatars-container {
  height: 100%;
  padding-top: 30px;
}
.players-list-container {
  height: 80%;
}
.players-footer-container {
  height: 20%;
}
.copy-link-text {
  font-size: 18px;
  color: rgb(271,102,255);
}
</style>
