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
  data () {
    return {
      games: []
    }
  },
  props: ['title', 'type'],
  created () {
    fetch('../data.json')
      .then(res => res.json())
      .then(games => {
        this.games = games.filter(game => {
          return this.type === 'new'
          ? new Date(game.dates_released_dts[0]) < new Date ()
          : new Date(game.dates_released_dts[0]) > new Date ()
        });
      })
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
