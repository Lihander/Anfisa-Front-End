<template>
  <div class="buttons-list">
    <slot name="btns" />
  </div>
</template>

<script>
export default {
  name: "ButtonsList"
}
</script>

<style lang="scss">
.buttons-list {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  font-size: 24px;
}
</style>
