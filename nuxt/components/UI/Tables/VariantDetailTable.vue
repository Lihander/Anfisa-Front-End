<template>
  <TableWithHeader
    v-if="getSelectedVariantDetailByName(tableName)"
    :table-collapse="getCollapseTable"
    :table-data="getSelectedVariantDetailByName(tableName)"
  >
    <CollapseButton
      slot="btns"
      :btn-class="'btnWithoutBorder'"
      :value="getCollapseTable"
      :show-icon="collapseShowIcon"
      :hide-icon="collapseHideIcon"
      @change="changeCollapseVariantValue"
    />
  </TableWithHeader>
</template>

<script>
import TableWithHeader from "~/components/UI/Tables/TableWithHeader.vue"
import CollapseButton from "~/components/UI/Controls/CollapseButton.vue"

export default {
  name: "VariantDetailTable",
  components: { CollapseButton, TableWithHeader },
  props: {
    tableName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      collapseShowIcon: ["fas", "chevron-circle-down"],
      collapseHideIcon: ["fas", "chevron-circle-up"]
    }
  },
  computed: {
    getSelectedVariantId() {
      return this.$store.getters.getSelectedVariantId
    },
    getSelectedVariant() {
      return this.$store.getters.getSelectedVariant
    },
    getCollapseTable() {
      return this.getSelectedVariantDetailByName(this.tableName).collapseTable
    }
  },
  methods: {
    getSelectedVariantDetailByName(name) {
      const selectedVariant = this.getSelectedVariant
      if (
        selectedVariant.details &&
        Object.prototype.hasOwnProperty.call(selectedVariant.details, name)
      ) {
        return selectedVariant.details[name]
      }
      return null
    },
    changeCollapseVariantValue() {
      const selectedVariantId = this.getSelectedVariantId
      const tableName = this.tableName
      this.$store.commit("setVariantCollapseDetailsByIdAndTableName", {
        selectedVariantId,
        tableName
      })
    }
  }
}
</script>

<style lang="scss"></style>
