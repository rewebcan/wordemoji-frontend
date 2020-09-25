import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["currentPlayer"],
    }),
  ],
  state: {
    currentPlayer: {
      name: "",
      avatar: "",
      isMaster: false,
    },
    players: {},
    game: {
      roundTime: 0,
      roomId: "",
      currentRound: 0,
      currentPuzzle: {
        puzzleEmojis: "",
        puzzleAnswer: "",
        puzzleTips: null,
      },
    },
  },

  getters: {
    currentPlayer: (state) => state.currentPlayer,
    players: (state) => state.players,
    sortedPlayers: (state) =>
      Object.fromEntries(
        Object.entries(state.players).sort(([, a], [, b]) => b - a)
      ),
    game: (state) => state.game,
    allPlayersAnswered: (state) => {
      const countOfPlayers = Object.keys(state.players).length;
      let countOfAnsweredPlayers = 0;

      for (const key in state.players) {
        if (state.players[key]) {
          if (state.players[key].answered) {
            countOfAnsweredPlayers++;
          }
        }
      }

      return countOfPlayers == countOfAnsweredPlayers;
    },
  },

  mutations: {
    setCurrentPlayer(state, player) {
      state.currentPlayer = player;
    },

    addPlayer(state, player) {
      state.players[player.soid] = player;
    },

    addPoint(state, { playerId, point }) {
      let soid = playerId;
      if (!state.players[soid]) {
        soid = "masterUser";
      }
      state.players[soid].points += Number(point);
    },

    markPlayerAnswered(state, playerId) {
      state.players[playerId].answered = true;
    },

    markAllPlayerNotAnswered(state) {
      for (const key in state.players) {
        if (state.players[key]) {
          const player = state.players[key];
          player.answered = false;
        }
      }
    },

    addPlayers(state, players) {
      for (const player of players) {
        state.players[player.soid] = player;
      }
    },

    removePlayer(state, deletedPlayer) {
      // eslint-disable-next-line no-unused-vars
      const { [deletedPlayer]: _, ...players } = state.players;
      state.players = players;
    },

    configureRoom(state, room) {
      state.game = { ...state.game, ...room };
    },
  },
});

export default store;
