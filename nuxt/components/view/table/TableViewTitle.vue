<template>
  <div class="title__wrapper">
    <div class="title__wrapper__info">
      <AppButton
        class="title__options__update-button"
        :btn-class="'btnSpin'"
        @click="updateVariant()"
      >
        <font-awesome-icon :icon="updateIcon" />
      </AppButton>
      <h2 v-html="selectedVariant.name"></h2>
      <div class="title__options">
        <AppButton
          class="title__options__button"
          :btn-class="'btnWithoutBorder'"
          @click="changeAllTablesCollapse(true)"
        >
          <font-awesome-icon :icon="expandAllIcon" />
        </AppButton>
        <AppButton
          class="title__options__button"
          :btn-class="'btnWithoutBorder'"
          @click="changeAllTablesCollapse(false)"
        >
          <font-awesome-icon :icon="compressAllIcon" />
        </AppButton>
        <AppButton class="title__options__button" :btn-class="'btnSpin'">
          <font-awesome-icon :icon="settingsIcon" />
        </AppButton>
      </div>
    </div>
    <div class="title__wrapper__tags-panel">
      <TagsPanel />
    </div>
  </div>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
import TagsPanel from "~/components/view/table/TagsPanel.vue"
export default {
  name: "TableViewTitle",
  components: { TagsPanel, AppButton },
  data() {
    return {
      updateIcon: ["fas", "sync-alt"],
      expandAllIcon: ["fas", "expand-arrows-alt"],
      compressAllIcon: ["fas", "compress-arrows-alt"],
      settingsIcon: ["fas", "cog"]
    }
  },
  computed: {
    selectedVariant() {
      const selectedVariantId = this.$store.getters.getSelectedVariantId
      return this.$store.getters.getVariantById(selectedVariantId)
    }
  },
  methods: {
    changeAllTablesCollapse(collapseTable) {
      const selectedVariantId = this.$store.getters.getSelectedVariantId
      this.$store.commit("setVariantCollapseDetailsById", {
        selectedVariantId,
        collapseTable
      })
    },
    updateVariant() {
      const selectedVariantId = this.$store.getters.getSelectedVariantId
      this.$store.dispatch("getVariantDetails", selectedVariantId)
      this.$store.dispatch("getVariantTagsAndNote", selectedVariantId)
    }
  }
}
</script>

<style lang="scss">
.title {
  &__wrapper {
    width: 73%;
    height: 40px;
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
    &__info {
      height: 100%;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $secondary-color;
      color: $default-color;
      padding: 5px;
      border-bottom-left-radius: 20px;
      h2 {
        margin-left: 10px;
        text-align: left;
        flex: 2;
      }
    }
    &__tags-panel {
      width: 50%;
      height: 100%;
    }
  }
  &__options {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    margin: 0 10px;
    &__update-button {
      margin-left: 10px;
      width: 30px;
    }
    &__button {
      width: 30px;
      &:last-child {
        margin-left: 20px;
        margin-right: 10px;
      }
    }
  }
}
</style>
