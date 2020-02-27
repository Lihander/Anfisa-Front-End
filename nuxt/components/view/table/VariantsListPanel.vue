<template>
  <div class="variants-list">
    <div class="variants-list__header">
      <DefaultSwitcher :items="switchItems" @selected="selectedItemChange" />
    </div>
    <div class="variants-list__wrapper default-scroll">
      <div v-if="selectedItem.name === 'VARIANTS'" class="variants">
        <VariantsItem v-for="item in getVariants" :key="item.id" :item="item" />
      </div>
      <div v-else class="genes">
        <VariantsGroup
          v-for="(group, index) in getVariantsGroupName"
          :key="index"
          :group="group"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VariantsItem from "~/components/view/table/VariantsItem.vue"
import DefaultSwitcher from "~/components/UI/Controls/DefaultSwitcher.vue"
import VariantsGroup from "~/components/view/table/VariantsGroup"
export default {
  name: "VariantsList",
  components: { VariantsGroup, DefaultSwitcher, VariantsItem },
  data() {
    return {
      switchItems: [
        {
          name: "GENE",
          isActive: false
        },
        {
          name: "VARIANTS",
          isActive: true
        }
      ]
    }
  },
  computed: {
    getSelectedVariantsId() {
      return this.$store.getters.getSelectedVariantId
    },
    getVariants() {
      return this.$store.getters.getVariants
    },
    getVariantsGroupName() {
      return Object.keys(this.$store.getters.getVariantsByGroups)
    },
    selectedItem() {
      return this.switchItems.find(item => {
        return item.isActive === true
      })
    }
  },
  watch: {
    getSelectedVariantsId() {
      this.scrollToItem()
    }
  },
  mounted() {
    this.scrollToItem()
  },
  methods: {
    scrollToItem() {
      const panel = this.$el.querySelector(".variants-list__wrapper")
      const variantsList = this.$el.querySelector(".variants")
      if (!variantsList) {
        return
      }
      const item = variantsList.firstElementChild
      if (item) {
        const selectedVariantPosition =
          item.offsetHeight * this.getSelectedVariantsId
        if (
          panel.offsetHeight + panel.scrollTop < selectedVariantPosition ||
          panel.scrollTop > selectedVariantPosition
        ) {
          panel.scrollTop = selectedVariantPosition - item.offsetHeight * 0.4
        }
      }
    },
    selectedItemChange(selectedItem) {
      this.switchItems.map(item => {
        item.isActive = selectedItem.name === item.name
      })
    }
  }
}
</script>

<style lang="scss">
.variants-list {
  height: 100%;
  width: 21%;
  display: inline-block;
  font-size: 14px;
  background-color: $default-color;
  &__header {
    height: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $secondary-color;
    padding: 5px 20px;
  }
  &__wrapper {
    height: 95%;
  }
}
</style>
