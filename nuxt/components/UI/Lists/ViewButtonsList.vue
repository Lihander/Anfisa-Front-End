<template>
  <ButtonsList>
    <div slot="btns" class="view-buttons__wrapper">
      <AppButton
        v-for="item in viewItems"
        v-show="isInactiveViewItem(item)"
        :key="item.view"
        class="view-buttons__button"
        btn-class="btnDefault"
        @click="viewChange(item)"
      >
        <font-awesome-icon :icon="item.icon" />
      </AppButton>
    </div>
  </ButtonsList>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
import ButtonsList from "~/components/UI/Lists/ButtonsList.vue"
export default {
  name: "ViewButtonsList",
  components: { ButtonsList, AppButton },
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
.view-buttons {
  &__wrapper {
    width: 100%;
    padding: 5px 10px;
    background-color: $secondary-color;
    border: 1px solid $default-color;
    border-radius: 5px;
  }
  &__button {
    padding: 5px;
  }
}
</style>
