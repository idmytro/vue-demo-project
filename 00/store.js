var store = new Vuex.Store({
  plugins: [new VuexPersistence.VuexPersistence().plugin],

  state: {
    games: []
  },
  getters: {
    getReleasedGames (state) {
      return state.games
        .filter(game => new Date(game.dates_released_dts[0]) < new Date)
        .filter(game => game.price_lowest_f > -1)
    },
    getFutureGames (state) {
      return state.games
        .filter(game => new Date(game.dates_released_dts[0]) > new Date)
    },
    getGameById (state) {
      return (id) => {
        return state.games.find(game => game.fs_id === id)
      }
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
        .then(json => {
          context.commit('saveGames', json)})
    }
  }
})
