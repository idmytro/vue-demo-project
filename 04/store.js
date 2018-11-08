var store = new Vuex.Store({
  plugins: [
    new VuexPersistence.VuexPersistence().plugin
  ],
  state: {
    games: []
  },
  getters: {
    getNewGames (state) {
      return state.games.filter(game => new Date(game.dates_released_dts[0]) < new Date ())
    },
    getFutureGames (state) {
      return state.games.filter(game => new Date(game.dates_released_dts[0]) > new Date ())
    }
  },
  mutations: {
    saveGames (state, games) {
      state.games = games
    }
  },
  actions: {
    fetchGames (context) {
      if (context.state.games.length) return Promise.resolve()
      return fetch('../data.json')
        .then(res => res.json())
        .then(games => {
          context.commit('saveGames', games)
        })
    }
  },
})
