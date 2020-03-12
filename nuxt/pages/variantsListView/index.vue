<template>
  <section class="wrapper-content wrapper-content--fixed">
    <div class="list-view-desktop">
      <div class="view-toolbar-wrapper">
        <ViewToolbar>
          <AppButton
            slot="btns"
            style="padding-right: 5px; margin-top: 5px;"
            btn-class="btnDefault"
            @click="updateShowAllNotes"
          >
            <font-awesome-icon :icon="['fas', 'clipboard']" />
            <font-awesome-icon
              v-if="!isShowAllNotes"
              class="sticker green-eye"
              :icon="['fas', 'eye']"
            />
            <font-awesome-icon
              v-if="isShowAllNotes"
              class="sticker red-eye"
              :icon="['fas', 'eye-slash']"
            />
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
  components: { VariantsListView, ViewToolbar, AppButton },
  computed: {
    isShowAllNotes() {
      return this.$store.getters.isShowAllNotes
    },
    getStickerColor() {
      return this.isShowAllNotes ? "red-eye" : "green-eye"
    }
  },
  methods: {
    updateShowAllNotes() {
      this.$store.commit("updateShowAllNotes", !this.isShowAllNotes)
    }
  }
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
.sticker {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 18px;
}
.green-eye {
  color: $success-color;
}
.red-eye {
  color: $danger-color;
}
</style>
