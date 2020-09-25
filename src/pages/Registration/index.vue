<template>
  <div class="main-container columns">
    <div class="column setup-container is-4 pb-0 pt-0">
      <div class="setup-sub-container has-background-white">
        <div class="avatars-container">
          <div class="avatars-container">
            <img :src="avatar" alt />
            <div class="avatars-refresh-button" @click="randomAvatar">
              <b-icon icon="sync-alt" size="is-medium" type="is-info"></b-icon>
            </div>
          </div>
        </div>
        <div class="actions">
          <b-field>
            <b-input v-model="name" placeholder="İsim..."></b-input>
          </b-field>
          <b-button
            @click="manageJoin"
            type="button is-info is-fullwidth"
          >{{ gameMaster ? 'Oyun Kur' : 'Oyuna Katıl'}}</b-button>
        </div>
      </div>
      <div class="adds has-background-white"></div>
    </div>
    <div class="column is-8 has-background-white has-text-left">
      <h1 class="title">Wordemoji!</h1>
      <p>
        Arkadaşlarınla bir dizi emojinin hangi kelime olduğunu tahmin etmeye çalış ve oyunu kazan! <br>Eğlen!
      </p>
      <br />
      <h1 class="title">Nasıl Oynanır?</h1>
      <p>
        Kendine bir kullanıcı adı ve rastegele avatarlardan birini seç ve oyun(a) oluştur/katıl, 
        arkadaşlarını paylaşabileceğin link ile davet et ve oyuna başla en çabuk ve en çok kelime tahmin eden kazanır! 
      </p>
      <br>
      <p>
        <a href="/privacy_tr.txt">Gizlilik</a>
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { roomService as RoomService } from "../../services/roomService";

export default {
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      name: "",
      avatar: "",
      gameMaster: true,
    };
  },
  computed: {
    ...mapGetters({ currentPlayer: "currentPlayer" }),
  },
  watch: {
    name(val) {
      this.setCurrentPlayer({ ...this.currentPlayer, name: val });
    },
    avatar(val) {
      this.setCurrentPlayer({ ...this.currentPlayer, avatar: val });
    },
  },
  methods: {
    ...mapMutations(["setCurrentPlayer", "addPlayers", "addPlayer", "configureRoom"]),

    randomAvatar() {
      const randIndex = Math.floor(Math.random() * 15);
      this.avatar = "/images/avatars/" + randIndex + ".png";
    },

    async manageJoin() {
      this.gameMaster ? this.createRoom() : this.joinRoom();
    },

    async createRoom() {
      this.roomId = await RoomService.createRoom();
      if (!this.roomId) {
        return;
      }

      this.$socket.emit("createRoom", {
        roomId: this.roomId,
        name: this.name,
        avatar: this.avatar,
      });
    },

    async joinRoom() {
      const room = await RoomService.getRoom(this.roomId)
      if (!room.roomId) {
        return;
      }

      this.$socket.emit("playerJoin", {
        roomId: room.roomId,
        name: this.currentPlayer.name,
        avatar: this.currentPlayer.avatar,
      });
    },
  },
  mounted() {
    if (this.currentPlayer.name) {
      this.name = this.currentPlayer.name;
    }

    if (this.currentPlayer.avatar) {
      this.avatar = this.currentPlayer.avatar;
    } else {
      this.randomAvatar();
    }

    const roomId = this.$route.query.roomId;
    if (roomId) {
      this.gameMaster = false;
      this.roomId = roomId;
    }

    this.sockets.subscribe("roomCreated", (created) => {
      if (created) {
        this.setCurrentPlayer({
          name: this.name,
          avatar: this.avatar, // get selected avatar
          points: 0,
          isMaster: true,
        });
        this.addPlayer({
          soid: "masterUser",
          name: this.name,
          avatar: this.avatar,
          points: 0,
          isMaster: true,
        });
        this.$router.push({
          name: "Settings",
          params: { roomId: this.roomId },
        });
      }
    });

    this.sockets.subscribe("roomEntered", (data) => {
      const { roomId, players } = data;

      if (!roomId) {
        return;
      }

      this.setCurrentPlayer({
        name: this.name,
        avatar: this.avatar,
        points: 0,
        isMaster: false,
      });

      this.addPlayers(players);


      this.$router.push({ name: "Settings", params: { roomId: this.roomId } });
    });

    this.sockets.subscribe("connectionRejected", (data) => {
      console.log(data);
    });
  },
};
</script>

<style scoped>
.main-container {
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
.avatars-container img {
  width: 128px;
}
</style>
