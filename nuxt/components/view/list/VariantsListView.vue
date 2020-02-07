<template>
  <div class="variants-list-view__wrapper">
    <InfinityList @updateList="updateListLength">
      <VariantsListItem
        v-for="variant in slicedVariants"
        :key="variant.id"
        :variant="variant"
      />
    </InfinityList>
  </div>
</template>

<script>
import InfinityList from "~/components/UI/Lists/InfinityList.vue"
import VariantsListItem from "~/components/view/list/VariantsListItem.vue"
export default {
  name: "VariantsListView",
  components: { VariantsListItem, InfinityList },
  data() {
    return {
      oldListLength: 0,
      listLength: 10,
      slicedVariants: []
    }
  },
  computed: {
    variants() {
      return this.$store.getters.getVariants
    }
  },
  watch: {
    variants() {
      this.updateVariants()
    }
  },
  created() {
    this.updateVariants()
  },
  methods: {
    updateVariants() {
      const variants = this.variants
      const newVariants = variants.slice(this.oldListLength, this.listLength)
      newVariants.forEach(variant => {
        if (variant.details === null) {
          this.$store.dispatch("getVariantDetails", variant.id)
        }
      })

      newVariants.forEach(variant => {
        this.slicedVariants.push(variant)
      })
    },
    updateListLength(newLength) {
      this.oldListLength = this.listLength
      this.listLength = newLength
      this.updateVariants()
    }
  }
}
</script>

<style lang="scss">
.variants-list-view__wrapper {
  width: 96%;
  height: 100%;
  padding-left: 10px;
}
</style>
