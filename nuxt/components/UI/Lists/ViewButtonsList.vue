<template>
  <div class="view-buttons-list">
    <AppButton
      v-for="item in viewItems"
      v-show="isInactiveViewItem(item)"
      :key="item.view"
      class="view-button"
      btn-class="btnPrimaryWithoutBorder"
      @click="viewChange(item)"
    >
      <font-awesome-icon :icon="item.icon" />
    </AppButton>
  </div>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
export default {
  name: "ViewButtonsList",
  components: { AppButton },
  data() {
    return {
      showViews: false,
      viewItems: [
        {
          view: "variantsListView",
          icon: ["fas", "list"]
        },
        {
          view: "variantsTableView",
          icon: ["fas", "th"]
        }
      ]
    }
  },
  methods: {
    isInactiveViewItem(item) {
      return this.$route.name !== item.view
    },
    viewChange(selectedItem) {
      this.viewItems.map(item => {
        item.isActive = selectedItem.view === item.view
      })
      const selectedWorkspace = this.$store.getters.getSelectedWorkspace
      this.$router.push({
        path: "/" + selectedItem.view,
        query: { ws: selectedWorkspace }
      })
    }
  }
}
</script>

<style lang="scss">
.view-buttons-list {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $default-color;
  padding-left: 5px;
  border: 5px solid $accent-color;
  border-left: none;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  .view-button {
    margin: 0 15px;
  }
}
</style>
