<template>
  <div v-show="getSelectedWorkspace" class="workspace-info">
    <div class="workspace-info__top-line">
      <div class="workspace-info__top-line__name">
        PROJECT
      </div>
      <div class="workspace-info__top-line__title">
        {{ getSelectedWorkspace }}
      </div>
    </div>
    <div class="workspace-info__bottom-line">
      <div v-show="getTotalVariants && getFilteredVariants" class="workspace-info__bottom-line__variants-count">
        <span>Variants:</span>{{getTotalVariants}}/{{getFilteredVariants}}
      </div>
      <div v-show="getTranscripts.length > 0" class="workspace-info__bottom-line__transcripts-count">
        <span>Transcripts:</span>{{transcripts[0]}}/{{transcripts[1]}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WorkspaceInfo",
    data() {
      return {
        transcripts: []
      }
    },
    computed: {
      getSelectedWorkspace() {
        return this.$store.getters.getSelectedWorkspace
      },
      getTotalVariants () {
        return this.$store.getters.getTotalVariants;
      },
      getFilteredVariants() {
        return this.$store.getters.getFilteredVariants;
      },
      getTranscripts() {
        this.transcripts = this.$store.getters.getTranscripts
        return this.transcripts;
      }
    }
  }
</script>

<style lang="scss">
  .workspace-info {
    height: 100%;
    width: 100%;
    font-size: 18px;
    &__top-line {
      height: 50%;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      font-weight: 800;
      border-bottom: 1px solid $secondary-color;
      &__name {
        height: 100%;
        width: 30%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 10px;
        color: $default-color;
        background-color: $secondary-color;
        font-size: 20px;
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
      }
      &__title {
        height: 100%;
        width: 70%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 10px;
        color: $primary-color;
      }
    }
    &__bottom-line {
      height: 50%;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      border-top: 1px solid $secondary-color;
      color: $primary-color;
      &__variants-count {
        height: 100%;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          color: $secondary-color;
          font-weight: 800;
          margin-right: 10px;
        }
      }
      &__transcripts-count {
        height: 100%;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          color: $secondary-color;
          font-weight: 800;
          margin-right: 10px;
        }
      }
    }
  }
</style>
