import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentPlayer: {
            name: '',
            avatar: '',
            isMaster: false
        },
        players: [
            {
                name: 'Burak Başar',
                avatar: 'images/farmer.png',
                points: 100,
            },
            {
                name: 'Recep Can',
                avatar: 'images/man-supervillain.png',
                points: 150,
            },
            {
                name: 'Batuhan Kara',
                avatar: 'images/female-singer.png',
                points: 100,
            },
            {
                name: 'Burak Başar',
                avatar: 'images/farmer.png',
                points: 150,
            },
            {
                name: 'Burak Başar',
                avatar: 'images/farmer.png',
                points: 150,
            },
            {
                name: 'Recep Can',
                avatar: 'images/man-supervillain.png',
                points: 150,
            },
            {
                name: 'Batuhan Kara',
                avatar: 'images/female-singer.png',
                points: 150,
            },
            {
                name: 'Burak Başar',
                avatar: 'images/farmer.png',
                points: 150,
            }
        ],
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
    },

    mutations: {
        setCurrentPlayer (state, player) {
            state.currentPlayer = player
        },

        removePlayer (state, deletedPlayer) {
            state.players = state.players.filter(player => player !== deletedPlayer)
        }
    }
})

export default store
