<template>
  <div class="view-toolbar">
    <div class="buttons-list">
      <slot name="top-btns" />
      <ButtonWithSlot :show-icon="['fas', 'layer-group']">
        <ViewButtonsList />
      </ButtonWithSlot>
      <ButtonWithSlot
        :show-icon="['fas', 'filter']"
        :show="showQuickFilterView"
        @changeSlotVisible="changeQuickFilterViewVisible"
      >
        <QuickFilterView @close="changeQuickFilterViewVisible(false)" />
      </ButtonWithSlot>
      <slot name="btns"></slot>
    </div>
  </div>
</template>

<script>
import ButtonWithSlot from "~/components/UI/Controls/ButtonWithSlot.vue"
import ViewButtonsList from "~/components/UI/Lists/ViewButtonsList.vue"
import QuickFilterView from "~/components/view/filter/QuickFilterView.vue"

export default {
  name: "ViewToolbar",
  components: {
    QuickFilterView,
    ViewButtonsList,
    ButtonWithSlot
  },
  data() {
    return {
      showQuickFilterView: false
    }
  },
  methods: {
    changeQuickFilterViewVisible(value) {
      this.showQuickFilterView = value
    }
  }
}
</script>

<style lang="scss">
.buttons-list {
  width: 100%;
  margin: 5px;
  font-size: 24px;
}
</style>
