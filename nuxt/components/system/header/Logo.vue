<template>
  <div class="logo">
    <img src="~assets/img/foromeLogo.png" alt="Forome" />
  </div>
</template>

<script>
export default {
  name: "Logo"
}
</script>

<style lang="scss">
.logo {
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  img {
    height: auto;
    max-width: 100%;
    padding: 7px 10px;
  }
}
</style>
