<template>
  <div class="advanced-view-toolbar">
    <AppButton
      class="close-button"
      :btn-class="'btnDanger'"
      @click="$emit('close')"
    >
      <font-awesome-icon :icon="['fas', 'arrow-circle-left']" />
    </AppButton>
    <div class="toolbar-left-side">
      <AppButton
        class="sub-button"
        :btn-class="'btnAccent'"
        @click="$emit('openParams')"
      >
        <font-awesome-icon :icon="['fas', 'cog']" />
        <span>Parameters</span>
      </AppButton>
    </div>
    <div class="toolbar-right-side">
      <AppButton
        class="sub-button"
        :btn-class="'btnAccent'"
        @click="$emit('applyChanges')"
      >
        <font-awesome-icon :icon="['fas', 'check-circle']" />
        <span>Apply Changes</span>
      </AppButton>
      <AppButton
        class="sub-button"
        :btn-class="'btnDanger'"
        @click="$emit('resetChanges')"
      >
        <font-awesome-icon :icon="['fas', 'undo-alt']" />
        <span>Reset Changes</span>
      </AppButton>
    </div>
  </div>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
export default {
  name: "AdvancedToolbar",
  components: {
    AppButton
  }
}
</script>

<style lang="scss">
.advanced-view-toolbar {
  height: 7%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $neutral-placeholder;
  .toolbar-left-side {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: calc(50% - 50px);
    .sub-button {
      width: 160px;
      margin: 0 20px;
    }
  }
  .toolbar-right-side {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 50%;
    .sub-button {
      width: 160px;
      margin: 0 10px;
    }
  }
  .close-button {
    height: 100%;
    width: 50px;
    border-radius: 0;
  }
}
</style>
