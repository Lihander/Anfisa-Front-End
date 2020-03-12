<template>
  <div class="condition-view-wrapper">
    <div class="main-view">
      <slot />
    </div>
    <div class="right-toolbar">
      <AppButton
        class="remove-btn"
        :btn-class="'btnDanger'"
        @click="$emit('remove')"
      >
        <font-awesome-icon :icon="removeIcon" />
      </AppButton>
    </div>
  </div>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
export default {
  name: "ConditionViewWrapper",
  components: { AppButton },
  data() {
    return {
      removeIcon: ["fas", "times"]
    }
  }
}
</script>

<style lang="scss">
.condition-view-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px dotted $neutral-placeholder;
  .main-view {
    width: 90%;
    padding: 5px 10px;
  }
  .right-toolbar {
    width: 10%;
    padding: 20px;
    .remove-btn {
      border-radius: 20px;
    }
  }
}
</style>
