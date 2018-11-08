var GamesList = {
  template: `
  <div>
    <h1>{{title}}</h1>
    <p>Total games: {{games.length}}</p>
    <div class="flex flex-wrap">
      <div v-for="game in games" class="w-1/3 mb-2 p-1">
        <!-- {{  game.fs_id }} -->
        <img :src="game.image_url_h2x1_s" class="rounded block">
        <h2 class="text-sm">{{game.title}}</h2>
        <p>{{ game.pretty_date_s | formatDate }}</p>
        <p>{{ game.price_lowest_f | dollars  }}</p>
      </div>
    </div>
  </div>
  `,
  props: ['title', 'type'],
  computed: {
    games () {
      return this.type === 'new'
      ? this.$store.getters.getNewGames
      : this.$store.getters.getFutureGames
    }
  },
  created () {
    this.$store.dispatch('fetchGames')
  },
  filters: {
    formatDate (val) {
      return val.replace(/\//g, '.')
    },
    dollars (val) {
      return '$' + val
    }
  }
}
