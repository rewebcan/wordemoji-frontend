<template>
  <div class="main-container columns">
    <div class="column is-4 pb-0 pt-0">
      <div class="custom-container flex-container has-background-white">
        <div class="avatars-container">
          <img :src="currentPlayer.avatar" alt="avatar" />
          <b-field class="mt-2">
            <b-input :placeholder="currentPlayer.name" disabled></b-input>
          </b-field>
        </div>
        <div class="actions">
          <b-field label="Round Sayısı" class="has-text-left">
            <b-select
              v-model.lazy="settingsForm.roundCount"
              expanded
              :disabled="!currentPlayer.isMaster"
            >
              <option value="3">3</option>  
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
            </b-select>
          </b-field>
          <b-field label="Round Süresi" class="has-text-left">
            <b-select
              v-model.lazy="settingsForm.roundTime"
              expanded
              :disabled="!currentPlayer.isMaster"
            >
              <option value="30">30</option>
              <option value="75">75</option>
              <option value="90">90</option>
              <option value="120">120</option>
            </b-select>
          </b-field>
          <b-button
            type="button is-info is-fullwidth"
            @click="startGame"
            :disabled="!currentPlayer.isMaster || Object.values(players).length <= 1"
          >Oyunu Başlat</b-button>
        </div>
      </div>
    </div>
    <div class="column is-5 pt-0 pr-0 pb-0 pl-0">
      <div class="custom-container flex-container has-background-white">
        <div class="player-list-container">
          <player
            v-for="(player, index) of players"
            :key="index"
            :player="player"
            :isMaster="currentPlayer.isMaster"
            v-show="currentPlayer.soid !== player.soid"
            @player-removed="wrapRemovePlayer"
          />
        </div>
        <div class="players-footer-container flex-container">
          <p
            class="copy-link-text mb-0 pb-0"
          >Linki kopyala ve arkadaşlarına gönder. Eğlence başlasın!</p>
          <b-field :type="copied ? 'is-success' : ''">
            <b-input
              @focus="copyRoomUrl"
              expanded
              placeholder="Search..."
              :value="roomUrl"
              readonly
              :icon="copied ? 'clipboard-check': 'clipboard'"
            ></b-input>
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
import { mapGetters, mapMutations } from "vuex";
import Player from "./Components/player";
import { roomService as RoomService } from "../../services/roomService";

export default {
  components: {
    Player,
  },

  data() {
    return {
      settingsForm: {
        roundCount: 6,
        roundTime: 75,
      },
      copied: false,
      onceFiltered: false,
    };
  },

  computed: {
    ...mapGetters({
      players: "players",
      currentPlayer: "currentPlayer",
    }),

    roomUrl() {
      const baseUrl = process.env.VUE_APP_SHARE_URL;
      return `${baseUrl}?roomId=${this.$route.params.roomId}`;
    },

    roomId() {
      return this.$route.params.roomId;
    },

    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },

  methods: {
    ...mapMutations(["removePlayer", "addPlayer", "configureRoom"]),

    wrapRemovePlayer(player) {
      this.$buefy.snackbar.open({
        duration: 5000,
        message: `${player.name} adlı oyuncuyu çıkarmak istediğinize emin misiniz?`,
        actionText: "Oyundan At",
        type: "is-danger",
        position: "is-bottom-left",
        queue: true,
        onAction: () => {
          this.removePlayer(player.soid);
          this.$buefy.toast.open("Kullanıcı atıldı.");
        },
      });
    },

    async copyRoomUrl() {
      await navigator.clipboard.writeText(this.roomUrl);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    },

    async saveGameSettings(data) {
      console.log(data);
      return await RoomService.updateRoom({roomId: this.roomId, ...data});
    },

    startGame() {
      this.$socket.emit("startGame", this.roomId);
    },

    preventNav(event) {
      event.preventDefault();
      event.returnValue = "";
    },
  },

  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("beforeunload", this.preventNav);
    });
  },

  beforeRouteLeave(to, from, next) {
    if (to.matched.some((route) => route.name === "Game")) {
      return next();
    }
    if (!window.confirm("Ayrılmak istediğinize emin misiniz?")) {
      this.$router.push({ name: "Registration" });
      return;
    }
    next();
  },

  mounted() {
    this.sockets.subscribe("playerJoined", (data) => {
      const { roomId, connectedUser } = data;
      if (!roomId) {
        return;
      }

      this.addPlayer({
        soid: connectedUser.soid,
        name: connectedUser.name,
        avatar: connectedUser.avatar,
        points: 0,
        isMaster: false,
      });
    });

    this.sockets.subscribe("gameStarted", () => {
      this.$router.push({ name: "Game", params: { roomId: this.roomId } });
    });

    this.sockets.subscribe("playerDisconnected", (playerId) => {
      this.removePlayer(playerId);
      console.log("user disconnected \n", this.players);
    });
  },

  async updated() {
    const {
      data: { roomId },
    } = await this.saveGameSettings(this.settingsForm);
    this.configureRoom({ roomId, ...this.settingsForm });
  },
};
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
.avatars-container {
  height: 100%;
  padding-top: 30px;
}
.avatars-container img {
  width: 128px;
}
.player-list-container {
  height: 80%;
  overflow-y: auto;
  overflow-x: hidden;
}
.players-footer-container {
  height: 20%;
}
.copy-link-text {
  font-size: 18px;
  color: #1b66ff;
}
</style>
