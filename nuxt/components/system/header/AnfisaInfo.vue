<template>
  <div class="anfisa-info content-row">
    <div class="anfisa-info-project-name">
      {{ getVersionName }}
    </div>
    <div class="anfisa-info-links content-row">
      <div class="anfisa-info-link">
        {{ getVersionNum }}
      </div>
      <div class="anfisa-info-link">
        About
      </div>
      <div class="anfisa-info-link">
        Help
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnfisaInfo",
  computed: {
    getVersionName() {
      return this.version().split(" ")[0]
    },
    getVersionNum() {
      return "ver " + this.version().split(" ")[1]
    }
  },
  methods: {
    version() {
      return this.$store.getters.getVersion
    }
  }
}
</script>

<style lang="scss">
.anfisa-info {
  width: 100%;
  border-top: 1px solid $default-color;
  background-color: $primary-color;
  color: $default-color;
  font-size: 12px;
  &-project-name {
    font-size: 14px;
    font-weight: 600;
    margin-right: 5px;
  }
  &-link {
    padding: 0 10px;
    border-right: 1px solid $default-color;
    cursor: pointer;
    &:last-child {
      border: none;
    }
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
