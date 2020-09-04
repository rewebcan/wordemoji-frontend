<template>
  <div class="main-wrapper columns">
    <div class="column setup-container is-4 pb-0 pt-0">
      <div class="setup-sub-container has-background-white">
        <div class="avatars-container">
          <swiper class="avatars-container" ref="mySwiper" :options="swiperOption">
            <swiper-slide>
              <div class="container has-text-centered">
                <img src="../assets/female-singer.png" alt="avatar">
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="container has-text-centered">
                <img src="../assets/man-supervillain.png" alt="avatar">
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="actions">
          <b-field>
            <b-input v-model="name" placeholder="Name...."></b-input>
          </b-field>
          <b-button type="button is-info is-fullwidth">Join to the game</b-button>
        </div>
      </div>
      <div class="adds has-background-white"></div>
    </div>
    <div class="column is-8 has-background-white">

    </div>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

  export default {
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        name: ''
      }
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
  .setup-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .setup-sub-container {
    padding: 10px;
    height: 362px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .adds {
    height: 125px;
  }
  .avatars-container {
    height: 100%;
    padding-top: 30px;
  }
</style>
