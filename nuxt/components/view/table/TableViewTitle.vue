<template>
  <div class="title__wrapper">
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
      <AppButton class="title__options__button" :btn-class="'btnWithoutBorder'">
        <font-awesome-icon :icon="settingsIcon" />
      </AppButton>
    </div>
  </div>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
export default {
  name: "TableViewTitle",
  components: { AppButton },
  data() {
    return {
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
    }
  }
}
</script>

<style lang="scss">
.title {
  &__wrapper {
    width: 40%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $secondary-color;
    color: $default-color;
    padding: 5px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    h2 {
      text-align: center;
      flex: 2;
    }
  }
  &__options {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    margin: 0 10px;
    &__button {
      width: 30px;
      &:last-child {
        margin-left: 20px;
      }
    }
  }
}
</style>
