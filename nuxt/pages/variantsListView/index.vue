<template>
  <section class="wrapper-content wrapper-content--fixed">
    <div class="list-view-desktop">
      <div class="view-toolbar-wrapper">
        <ViewToolbar>
          <AppButton
            slot="btns"
            class="buttons-list__button"
            btn-class="btnDefault"
          >
            <font-awesome-icon :icon="['fas', 'clipboard']" />
          </AppButton>
        </ViewToolbar>
      </div>
      <VariantsListView />
    </div>
  </section>
</template>

<script>
import ViewToolbar from "~/components/UI/Toolbar/ViewToolbar.vue"
import VariantsListView from "~/components/view/list/VariantsListView"
import AppButton from "~/components/UI/Controls/Button.vue"
export default {
  name: "Index",
  components: { VariantsListView, ViewToolbar, AppButton }
}
</script>

<style lang="scss">
.list-view-desktop {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.view-toolbar-wrapper {
  width: 4%;
}
.buttons-list__button {
  z-index: 1000;
}
</style>
