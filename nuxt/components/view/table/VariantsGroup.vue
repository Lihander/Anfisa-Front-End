<template>
  <div class="variants-group">
    <GroupList :group="group">
      <div slot="items" class="variants">
        <VariantsItem
          v-for="variant in getVariantsByGroup[group]"
          :key="variant.id"
          :item="variant"
          tabindex="-1"
        />
      </div>
    </GroupList>
  </div>
</template>

<script>
import VariantsItem from "~/components/view/table/VariantsItem.vue"
import GroupList from "~/components/UI/Lists/GroupList.vue"
export default {
  name: "VariantsGroup",
  components: { GroupList, VariantsItem },
  props: {
    group: {
      type: String,
      required: true
    }
  },
  computed: {
    getVariantsByGroup() {
      return this.$store.getters.getVariantsByGroups
    }
  }
}
</script>

<style lang="scss"></style>
