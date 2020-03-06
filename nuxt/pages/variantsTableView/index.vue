<template>
  <section class="wrapper-content wrapper-content--fixed">
    <div class="table-view-desktop">
      <VariantsListPanel v-show="isVariantsListShow" />
      <div class="view-toolbar-wrapper">
        <ViewToolbar>
          <CollapseButton
            slot="top-btns"
            btn-class="btnSecondary"
            :value="isVariantsListShow"
            :show-icon="showVariantsListButtonIcon"
            :hide-icon="hideVariantsListButtonIcon"
            @change="isVariantsListShow = !isVariantsListShow"
          />
          <ButtonWithSlot
            v-if="isVariantSelected"
            slot="btns"
            :show-icon="['fas', 'clipboard']"
          >
            <NoteView />
          </ButtonWithSlot>
        </ViewToolbar>
      </div>
      <VariantsTables v-if="isVariantSelected" />
    </div>
  </section>
</template>

<script>
import VariantsListPanel from "~/components/view/table/VariantsListPanel.vue"
import VariantsTables from "~/components/view/table/VariantsTables.vue"
import ViewToolbar from "~/components/UI/Toolbar/ViewToolbar.vue"
import CollapseButton from "~/components/UI/Controls/CollapseButton.vue"
import NoteView from "~/components/view/table/NoteView.vue"
import ButtonWithSlot from "~/components/UI/Controls/ButtonWithSlot.vue"
export default {
  components: {
    NoteView,
    ViewToolbar,
    VariantsTables,
    VariantsListPanel,
    CollapseButton,
    ButtonWithSlot
  },
  data() {
    return {
      isVariantsListShow: true,
      hideVariantsListButtonIcon: ["fas", "arrow-circle-left"],
      showVariantsListButtonIcon: ["fas", "arrow-circle-right"]
    }
  },
  computed: {
    isVariantSelected() {
      return this.$store.getters.getSelectedVariantId !== ""
    }
  }
}
</script>

<style lang="scss">
.table-view-desktop {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.view-toolbar-wrapper {
  width: 4%;
}
</style>
