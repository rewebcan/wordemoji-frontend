<template>
  <div class="main-container columns">
    <div class="column is-4 pb-0 pt-0">
      <div class="custom-container flex-container has-background-white">
        <div class="answers has-text-left">
          <div v-for="(message, index) in messages" :key="index">
            <span
              class="player-name"
              v-bind:class="{ 'correct-answer': message.correct }"
            >{{ message.player ? message.player : ">>>" }}</span>
            &nbsp;
            <span class="player-answer">{{ message.message }}</span>
          </div>
        </div>
        <div class="actions">
          <b-field>
            <b-input
              expanded
              type="is-info"
              icon="pencil-alt"
              v-model="currentMessage"
              @keyup.native.enter="sendMessage"
            ></b-input>
            <p class="control">
              <button @click="sendMessage" class="button is-fullwidth is-info">Yolla</button>
            </p>
          </b-field>
        </div>
      </div>
    </div>
    <div class="column is-8 pb-0 pt-0 pl-0">
      <div class="info-main-container">
        <div class="info-container columns pr-0 pb-3 pl-0 mb-0 mt-0 ml-0 mr-0 is-expanded">
          <div class="column is-8 pt-0 pl-0 pb-0">
            <div
              class="question-main-container flex-container pt-2 pr-2 pb-2 pl-2 has-background-white"
            >
              <b-loading :is-full-page="false" v-model="isLoading"></b-loading>
              <div
                class="question-container has-background-white has-text-centered"
                v-show="puzzleShow"
              >
                <span class="puzzle-emojis">{{ game.currentPuzzle.puzzleEmojis }}</span>
                <div class="puzzle-tips" v-if="game.currentPuzzle.puzzleTips">
                  <kbd
                    v-for="(tip, index) in Object.values(game.currentPuzzle.puzzleTips)"
                    :key="index"
                  >{{ tip }}&nbsp;</kbd>
                </div>
              </div>
              <div class="players-container px-3 py-3" v-show="pointsShow">
                <div class="has-text-centered">
                  <p v-show="finished">Oyun bitti tebrikler!</p>
                  <span>Doğru cevap: &nbsp;</span>
                  <p>{{ preRoundAnswer }}</p>
                </div>
                <ul>
                  <li v-for="(player, index) in players" :key="index">
                    <div>
                      <span>
                        <img :src="player.avatar" alt width="32px" height="32px" />
                      </span>
                      <span>{{ player.name }}</span>
                      <span>: {{ player.points }}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="time-progress">
                <div class="has-text-right pr-3">
                  <span>⏳</span>
                  <span class="time-counter">{{ time }}</span>
                </div>
                <b-progress
                  type="is-warning"
                  :value="Number(time)"
                  :max="Number(game.roundTime)"
                  size="is-large"
                ></b-progress>
              </div>
            </div>
          </div>
          <div class="column is-4 has-background-white player-list-container">
            <player v-for="(player, index) in players" :key="index" :player="player" />
          </div>
        </div>
      </div>
      <div class="adds has-background-white"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Player from "./Components/player";
import { roomService as RoomService } from "../../services/roomService";

export default {
  /**
   * bu sayfaya yonlenildigi zaman ilk once herkes state'ten oda bilgilerini cekecek
   * oda bilgileri cekildikten sonra ilk soru icin nextRound cagirilacak
   * roundNext geldigi zaman soru ve suresi baslayacak herkes mesajlari akitmaya baslayacak
   * herhangi bir kisi oyundan cikarsa kirmizi gorunecek ve bir daha giremeyecek!!! ismi kirmizi gorunecek ve oyundan cikti yazacak( ikonda konulabilir )
   * oyunda disconnected olmayan kim kaldiysa onlar cevaplarini bulana kadar sure devam edecek eger herkes cevabi bulduysa
   * ekranda puanlar gorunecek sonra ki soruya gecilecek.
   */
  components: {
    Player,
  },

  data() {
    return {
      messages: [],
      currentMessage: "",
      isLoading: false,
      currentPuzzle: {
        puzzleEmojis: "",
        puzzleAnswer: "",
      },
      timePercentageValue: 0,
      time: 0,
      pointsShow: false,
      puzzleShow: false,
      pointTimer: null,
      puzzleTimer: null,
      finished: false,
      preRoundAnswer: "",
    };
  },

  computed: {
    ...mapGetters({
      players: "players",
      game: "game",
      currentPlayer: "currentPlayer",
      allPlayersAnswered: "allPlayersAnswered",
    }),
    roomId() {
      return this.$route.params.roomId;
    },
  },

  methods: {
    ...mapMutations(["removePlayer", "configureRoom", "addPoint"]),

    sendMessage() {
      const message = this.currentMessage.trim();
      if (message.length) {
        this.$socket.emit("message", {
          roomId: this.game.roomId,
          player: this.currentPlayer.name,
          message: message,
        });
        this.currentMessage = "";
      }
    },

    preventNav(event) {
      event.preventDefault();
      event.returnValue = "";
    },

    async startGame() {
      this.isLoading = true;
      const room = await RoomService.getRoom(this.roomId);
      this.configureRoom({ ...room });
      this.time = Number(this.game.roundTime);
      this.$socket.emit("nextRound", {
        roomId: this.roomId,
        round: 0,
      });
      this.isLoading = false;
    },

    async handleRound({ nextRound: round, puzzle, finished, preRoundAnswer }) {
      clearInterval(this.puzzleTimer);
      clearTimeout(this.pointsTimer);
      if (finished) {
        this.pointsShow = true;
        this.puzzleShow = false;
        this.preRoundAnswer = preRoundAnswer;
        this.finished = true;
        return;
      }
      if (round > 1) {
        this.pointsShow = true;
        this.puzzleShow = false;
        this.preRoundAnswer = preRoundAnswer;

        await this.startPointsTimer();
      }
      this.configureRoom({ currentRound: round, currentPuzzle: puzzle });
      this.puzzleShow = true;
      this.pointsShow = false;

      await this.startPuzzleTimer();

      this.$socket.emit("nextRound", {
        round: this.game.currentRound,
        roomId: this.roomId,
      });
    },

    startPuzzleTimer() {
      return new Promise((resolve) => {
        this.time = this.game.roundTime;
        this.puzzleTimer = setInterval(() => {
          if (this.time <= 0) {
            clearInterval(this.puzzleTimer);
            return resolve();
          }
          this.time--;
        }, 1000);
      });
    },

    startPointsTimer() {
      return new Promise((resolve) => {
        this.pointsTimer = setTimeout(() => {
          clearTimeout(this.pointsTimer);
          return resolve();
        }, 4000);
      });
    },
  },

  beforeRouteLeave(to, from, next) {
    if (!window.confirm("Ayrılmak istediğinize emin misiniz?")) {
      this.$router.push({ name: "Registration" });
      return;
    }
    next();
  },

  mounted() {
    this.startGame();

    this.sockets.subscribe(
      "answered",
      ({ player: { name, soid: playerId }, point }) => {
        this.addPoint({playerId, point});
        if (this.allPlayersAnswered) {
          this.messages.push({ message: "Herkes bildi! ", correct: true });
          this.$socket.emit("nextRound", {
            round: this.game.currentRound,
            roomId: this.roomId,
          });
          return;
        }
        this.messages.push({ player: name, message: "bildi!", correct: true });
      }
    );

    this.sockets.subscribe("roundNext", (round) => {
      this.handleRound({ ...round });
    });

    this.sockets.subscribe("playerDisconnected", (playerId) => {
     this.removePlayer(playerId);
    });

    this.sockets.subscribe("chatMessage", ({ player, message }) => {
      this.messages.push({ player, message });
    });
  },

  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("beforeunload", this.preventNav);
    });
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
  height: 21%;
}
.question-container {
  height: 83%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.question-container .puzzle-emojis {
  display: block;
  letter-spacing: 1rem;
  font-size: 3rem;
}
.question-container .puzzle-tips {
  display: block;
}
.players-container {
  height: 83%;
  display: flex;
  overflow: auto;
  flex-direction: column;
}
.info-main-container {
  display: flex;
  height: 79%;
  width: 100%;
}
.info-container {
  width: 100%;
}
.question-main-container {
  height: 100%;
  position: relative;
}
.answers {
  height: calc(100% - 45px);
  overflow: auto;
}
.players-container {
  background: rgba(0, 0, 0, 0.2);
}
.players-container ul li div {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
