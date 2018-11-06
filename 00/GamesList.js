var GamesList = {
  name: 'GamesList',
  template: `
    <div>
      <h1 class="mb-2">{{ $route.meta.title }}</h1>
      <p class="mb-2">Total games: {{games.length}}</p>
      <div class="flex flex-wrap">
        <router-link :to="'/game/' + game.fs_id"
        v-for="game in games" class="w-1/3 mb-2 px-1 group no-underline">
          <img :src="game.image_url_h2x1_s" class="rounded block">
          <h2 class="text-sm group-hover:underline">{{ game.title }}</h2>
          <p class="text-teal" v-if="$route.meta.title === 'All Games'">{{ game.price_lowest_f | dollars }}</p>
          <p class="text-blue" v-else>{{ game.pretty_date_s | formatDate }}</p>
        </router-link>
      </div>
    </div>
  `,
  computed: {
    games () {
      return this.$route.meta.title === 'All Games'
        ? this.$store.getters.getReleasedGames
        : this.$store.getters.getFutureGames
    }
  },
  filters: {
    dollars (val) {
      return '$' + val
    },
    formatDate (val) {
      return val.replace(/\//g, '.')
    }
  }
}
