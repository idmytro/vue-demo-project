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
      .reverse()
    },
    getSingleGame (state) {
      return (id) => state.games.find(game => game.fs_id === id)
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
