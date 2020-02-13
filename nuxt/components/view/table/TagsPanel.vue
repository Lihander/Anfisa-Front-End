<template>
  <div class="tags-panel">
    <div class="tags-panel__icon">
      <font-awesome-icon :icon="['fas', 'tags']" />
    </div>
    <div class="tags-panel__buttons default-scroll">
      <TagButton
        v-for="(tag, index) in getTags"
        :key="index"
        class="tags-panel__buttons__item"
        :tag="tag"
        :icon="removeTagIcon"
        @click="toogleTag(tag)"
      />
    </div>
    <CollapseButton
      slot="top-btns"
      class="tags-panel__add-button"
      :style="
        isAddTagsViewShow
          ? { borderRadius: '0' }
          : { borderRadius: '0 0 20px 0' }
      "
      btn-class="btnSuccess"
      :value="isAddTagsViewShow"
      :show-icon="addTagIcon"
      :hide-icon="removeTagIcon"
      @change="isAddTagsViewShow = !isAddTagsViewShow"
    />
    <AddTagView v-if="isAddTagsViewShow" class="tags-panel__add-tags-view" />
  </div>
</template>

<script>
import TagButton from "~/components/UI/Controls/TagButton.vue"
import CollapseButton from "~/components/UI/Controls/CollapseButton.vue"
import AddTagView from "~/components/view/table/AddTagView.vue"
export default {
  name: "TagsPanel",
  components: { AddTagView, CollapseButton, TagButton },
  data() {
    return {
      addTagIcon: ["fas", "plus"],
      removeTagIcon: ["fas", "times"],
      isAddTagsViewShow: false
    }
  },
  computed: {
    getTags() {
      return this.$store.getters.getSelectedVariant.tags
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
.tags-panel {
  height: 100%;
  width: 100%;
  position: relative;
  background-color: $default-color;
  border-bottom: 1px solid $secondary-color;
  border-right: 1px solid $secondary-color;
  border-bottom-right-radius: 20px;
  padding: 5px 0 0 5px;
  &__icon {
    width: 40px;
    height: 39px;
    position: absolute;
    top: 0;
    left: -20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $default-color;
    color: $primary-color;
    border-bottom-left-radius: 20px;
  }
  &__buttons {
    width: 88%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow-y: auto;
    margin-left: 20px;
    padding-bottom: 5px;
    &__item {
      width: unset;
    }
  }
  &__add-button {
    position: absolute;
    right: -1px;
    top: 0;
    width: 30px;
    height: 40px;
    color: $success-color;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: $neutral-placeholder;
    }
  }
  .btn {
    &:hover {
      border-top: none;
    }
  }
  &__add-tags-view {
    position: absolute;
    top: 40px;
    right: 29px;
    width: 90%;
  }
}
.default-scroll {
  &::-webkit-scrollbar {
    height: 5px;
  }
}
</style>
