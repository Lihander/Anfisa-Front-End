<template>
  <div class="buttons-list">
    <AppButton
      class="buttons-list__button"
      btn-class="btnSecondary"
      @click="showVariantsList"
    >
      <font-awesome-icon :icon="getVariantsListButtonIcon" />
    </AppButton>
    <div class="view-btn-wrapper">
      <AppButton
        class="buttons-list__button__view"
        btn-class="btnDefault"
        @focus="showViewSwitcher = true"
        @blur="hideViewSwitcher"
      >
        <font-awesome-icon :icon="['fas', 'layer-group']" />
      </AppButton>
      <div v-show="showViewSwitcher" class="view-wrapper">
        <DefaultSwitcher
          :items="viewItems"
          :hide-name="true"
          @selected="viewChange"
        />
      </div>
    </div>
    <AppButton
      class="buttons-list__button"
      btn-class="btnDefault"
      @click="showVariantsList"
    >
      <font-awesome-icon :icon="['fas', 'compress-arrows-alt']" />
    </AppButton>
    <AppButton
      class="buttons-list__button"
      btn-class="btnDefault"
      @click="showVariantsList"
    >
      <font-awesome-icon :icon="['fas', 'clipboard']" />
    </AppButton>
    <AppButton
      class="buttons-list__button"
      btn-class="btnDefault"
      @click="showVariantsList"
    >
      <font-awesome-icon :icon="['fas', 'filter']" />
    </AppButton>
  </div>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
import DefaultSwitcher from "~/components/UI/Controls/DefaultSwitcher"
export default {
  name: "ButtonsList",
  components: { DefaultSwitcher, AppButton },
  props: {
    isVariantsListShow: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      hideVariantsListButtonIcon: ["fas", "arrow-circle-left"],
      showVariantsListButtonIcon: ["fas", "arrow-circle-right"],
      showViewSwitcher: false,
      viewItems: [
        {
          view: "variantsListView",
          icon: ["fas", "list"],
          isActive: this.$route.path === "/variantsListView"
        },
        {
          view: "variantsTableView",
          icon: ["fas", "th"],
          isActive: this.$route.path === "/variantsTableView"
        }
      ]
    }
  },
  computed: {
    getVariantsListButtonIcon() {
      return this.isVariantsListShow
        ? this.hideVariantsListButtonIcon
        : this.showVariantsListButtonIcon
    }
  },
  methods: {
    showVariantsList() {
      this.$emit("showVariantsList")
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
    },
    hideViewSwitcher() {
      setTimeout(() => {
        this.showViewSwitcher = false
      }, 300)
    }
  }
}
</script>

<style lang="scss">
.buttons-list {
  width: 4%;
  display: inline-block;
  border: 1px solid $default-color;
  margin-left: 2px;
  font-size: 24px;
  &__button {
    margin-bottom: 5px;
    &__view {
      &:focus {
        color: $default-color;
        background-color: $primary-color;
        border: 1px solid $default-color;
      }
    }
  }
}
.view-btn-wrapper {
  position: relative;
  margin-bottom: 5px;
  .view-wrapper {
    position: absolute;
    left: 2px;
    top: 5%;
    height: 90%;
    width: 400%;
    margin-left: 100%;
    background-color: $secondary-color;
    padding: 5px 10px;
    border-radius: 5px;
    z-index: 1000;
  }
}
</style>
