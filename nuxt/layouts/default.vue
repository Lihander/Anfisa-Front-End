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
    components: {Header}
  }
</script>

<style lang="scss">
  .home {
    height: 100vh;
    background: linear-gradient( $border-light, transparent 1px), linear-gradient( 90deg, $border-light, transparent 1px);
    background-size: 10px 10px;
    background-position: center center;
  }
</style>
