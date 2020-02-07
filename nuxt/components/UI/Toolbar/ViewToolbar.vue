<template>
  <ButtonsList>
    <div slot="btns" class="buttons-list__wrapper">
      <slot name="top-btns"></slot>
      <ButtonWithSlot
        class="buttons-list__button"
        btn-class="btnDefault"
        :icon="['fas', 'layer-group']"
      >
        <ViewButtonsList />
      </ButtonWithSlot>
      <AppButton
        class="buttons-list__button"
        btn-class="btnDefault"
        @click="$emit('showVariantsList')"
      >
        <font-awesome-icon :icon="['fas', 'filter']" />
      </AppButton>
      <slot name="btns"></slot>
    </div>
  </ButtonsList>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
import ButtonsList from "~/components/UI/Lists/ButtonsList.vue"
import ButtonWithSlot from "~/components/UI/Controls/ButtonWithSlot.vue"
import ViewButtonsList from "~/components/UI/Lists/ViewButtonsList.vue"

export default {
  name: "ViewToolbar",
  components: {
    ViewButtonsList,
    ButtonWithSlot,
    ButtonsList,
    AppButton
  }
}
</script>

<style lang="scss">
.buttons-list {
  &__wrapper {
    width: 100%;
  }
  &__button {
    margin-bottom: 5px;
    width: 100%;
  }
}
</style>
