import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            paths: ['currentPlayer']
        }),
    ],
    state: {
        currentPlayer: {
            name: '',
            avatar: '',
            isMaster: false
        },
        players: {},
        game: {
            roundCount: 0,
            roundTime: 0,
            roomId: '',
            currentRound: 0,
            currentPuzzle: '',
        }
    },

    getters: {
        currentPlayer: state => state.currentPlayer,
        players: state => state.players,
        game: state => state.game,
    },

    mutations: {
        setCurrentPlayer (state, player) {
            state.currentPlayer = player
        },

        addPlayer (state, player) {
            state.players[player.soid] = player
        },

        addPlayers (state, players) {
            for (const player of players) {
                state.players[player.soid] = player
            }
        },

        removePlayer (state, deletedPlayer) {
            // eslint-disable-next-line no-unused-vars
            const { [deletedPlayer]: _, ...players } = state.players;
            state.players = players
        },

        configureRoom (state, room) {
            state.game = {...state.game, ...room}
        }
    }
})

export default store
