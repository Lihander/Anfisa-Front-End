<template>
  <div class="tags-list">
    <SearchLine v-model="search" :placeholder="searchPlaceholder" />
    <TagButton
      v-for="(tag, index) in getNotSelectedTags"
      :key="index"
      :tag="tag"
      :icon="addTagIcon"
      class="tags-list__item"
      @click="toogleTag(tag)"
    />
  </div>
</template>

<script>
import TagButton from "~/components/UI/Controls/TagButton.vue"
import SearchLine from "~/components/UI/Controls/SearchLine.vue"
export default {
  name: "AddTagView",
  components: { SearchLine, TagButton },
  data() {
    return {
      search: "",
      addTagIcon: ["fas", "plus"],
      searchPlaceholder: "Search in Tags"
    }
  },
  computed: {
    getNotSelectedTags() {
      const variantTags = this.$store.getters.getSelectedVariant.tags
      const allTags = this.$store.getters.getTags
      let search = this.search,
        notSelectedTags = []
      allTags.forEach(tag => {
        if (variantTags.indexOf(tag) === -1) {
          notSelectedTags.push(tag)
        }
      })
      if (search) {
        search = search.trim().toLowerCase()
        notSelectedTags = notSelectedTags.filter(item => {
          if (item.toLowerCase().indexOf(search) !== -1) {
            return item
          }
        })
      }
      return notSelectedTags
    }
  },
  watch: {
    search(searchValue) {
      this.$emit("search", searchValue)
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
.tags-list {
  text-align: center;
  background-color: $default-color;
  border: 1px solid $secondary-color;
  border-top: none;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 10px;
  &__item {
    width: unset;
    display: inline-block;
    margin-bottom: 5px;
  }
}
</style>
