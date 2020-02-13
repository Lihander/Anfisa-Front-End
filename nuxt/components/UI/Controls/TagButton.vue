<template>
  <AppButton
    class="tag"
    :btn-class="'btnWithoutBorder'"
    :style="{ 'background-color': getTagColor(tag) }"
    v-on="$listeners"
  >
    <div class="tag__content">
      <div class="tag__content__title">
        {{ tag }}
      </div>
      <div v-if="icon" class="tag__content__icon">
        <font-awesome-icon :icon="icon" />
      </div>
    </div>
  </AppButton>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
import { TAGS_COLORS } from "~/assets/js/constants.js"
export default {
  name: "TagButton",
  components: { AppButton },
  props: {
    tag: {
      type: String,
      required: true
    },
    icon: {
      type: Array,
      default() {
        return null
      }
    }
  },
  methods: {
    getTagColor(tag) {
      if (Object.prototype.hasOwnProperty.call(TAGS_COLORS, tag)) {
        return TAGS_COLORS[tag]
      }
      return null
    }
  }
}
</script>

<style lang="scss">
.tag {
  white-space: nowrap;
  font-size: 12px;
  padding: 5px 10px;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
  &__content {
    text-align: center;
    &__icon {
      display: inline-block;
      margin-left: 5px;
    }
    &__title {
      display: inline-block;
    }
  }
}
</style>
