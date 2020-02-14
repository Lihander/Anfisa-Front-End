<template>
  <div class="tags-horizontal-list default-scroll">
    <TagButton
      v-for="(tag, index) in getTags"
      :key="index"
      class="tags-horizontal-list__item"
      :tag="tag"
      :icon="icon"
      @click="toogleTag(tag)"
    />
  </div>
</template>

<script>
import TagButton from "~/components/UI/Controls/TagButton.vue"
export default {
  name: "TagsHorizontalList",
  components: { TagButton },
  props: {
    icon: {
      type: Array,
      default() {
        return null
      }
    },
    variant: {
      type: Object,
      required: true
    }
  },
  computed: {
    getTags() {
      if (this.variant) {
        return this.variant.tags
      }
      return []
    }
  },
  methods: {
    toogleTag(tag) {
      const variant = this.$store.getters.getSelectedVariant
      this.$store.dispatch("saveVariantTagsAndNote", { variant, tag })
    }
  }
}
</script>

<style lang="scss">
.tags-horizontal-list {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 5px;
  &__item {
    width: unset;
  }
}

.default-scroll {
  &::-webkit-scrollbar {
    height: 5px;
  }
}
</style>
