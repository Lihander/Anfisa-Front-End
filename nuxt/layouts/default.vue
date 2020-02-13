<template>
  <v-app>
    <div class="home">
      <Header />
      <nuxt />
    </div>
  </v-app>
</template>

<script>
import Header from "~/components/system/header/Header.vue"
export default {
  components: { Header },
  // validate({ params, query, store }) {
  //   return store.getters.getWorkspaces.some(ws => ws.name === query.ws)
  // },
  watch: {
    "$route.query.ws"() {
      this.getWorkspaceDetails()
    }
  },
  created() {
    this.$store.dispatch("getWorkspacesList")
  },
  mounted() {
    const variants = this.$store.getters.getVariants
    if (variants.length === 0) {
      this.getWorkspaceDetails()
    }
  },
  methods: {
    getWorkspaceDetails() {
      const { ws } = this.$route.query
      if (ws) {
        this.$store.dispatch("getWorkspaceDetails", ws)
      }
    }
  }
}
</script>

<style lang="scss">
.home {
  height: 100vh;
  background: linear-gradient($border-light, transparent 1px),
    linear-gradient(90deg, $border-light, transparent 1px);
  background-size: 10px 10px;
  background-position: center center;
}
</style>
