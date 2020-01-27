<template>
  <TableWithHeader
    v-if="getSelectedVariantDetailByName(tableName)"
    :table-collapse="getCollapseTable"
    :table-data="getSelectedVariantDetailByName(tableName)"
  >
    <CollapseButton
      slot="btns"
      :value="getCollapseTable"
      :show-icon="collapseShowIcon"
      :hide-icon="collapseHideIcon"
      @change="changeCollapseVariantValue"
    />
  </TableWithHeader>
</template>

<script>
import TableWithHeader from "~/components/UI/Tables/TableWithHeader"
import CollapseButton from "../Controls/CollapseButton"

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
      const selectedVariantId = this.getSelectedVariantId
      return this.$store.getters.getVariantById(selectedVariantId)
    },
    getCollapseTable() {
      return this.getSelectedVariantDetailByName(this.tableName).collapseTable
    }
  },
  methods: {
    getSelectedVariantDetailByName(name) {
      const selectedVariant = this.getSelectedVariant
      return selectedVariant.details[name]
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
