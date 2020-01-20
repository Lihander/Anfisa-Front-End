<template>
  <section class="wrapper-content">
    <div class="helper">
      <div class="helper__step">To get started, select workspace.</div>
      <div class="helper__action">Click on <font-awesome-icon :icon="['fas', 'microscope']" /></div>
    </div>
  </section>
</template>

<script>
  import Header from "~/components/system/header/Header.vue"

  export default {
    components: {
      Header
    }
  }
</script>

<style lang="scss">
  .helper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: $secondary-color;
    font-size: 28px;
    font-weight: 600;
    opacity: .7;
    &__step {
      padding: 5px 30px;
      background-color: rgba(255, 255, 255, .6);
    }
    &__action {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 30px;
      background-color: rgba(255, 255, 255, .6);
      .fa-microscope {
        margin-left: 10px;
        font-size: 48px;
        color: $primary-color;
      }
    }
  }
</style>
