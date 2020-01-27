<template>
  <div class="variants-tables default-scroll">
    <VariantDetailTable :table-name="'view_gen'" />
    <VariantDetailTable :table-name="'view_qsamples'" />
    <VariantDetailTable :table-name="'view_gnomAD'" />
    <VariantDetailTable :table-name="'view_genetics'" />
    <VariantDetailTable :table-name="'view_db'" />
    <VariantDetailTable :table-name="'colocated_v'" />
    <VariantDetailTable :table-name="'_main'" />
    <VariantDetailTable :table-name="'view_pred'" />
    <VariantDetailTable :table-name="'transcripts'" />
    <VariantDetailTable :table-name="'view_cohorts'" />
  </div>
</template>

<script>
import VariantDetailTable from "~/components/UI/Tables/VariantDetailTable.vue"
export default {
  name: "VariantsTables",
  components: { VariantDetailTable }
}
</script>

<style lang="scss">
.variants-tables {
  flex: 1;
  height: 100%;
  padding: 10px;
}
</style>
