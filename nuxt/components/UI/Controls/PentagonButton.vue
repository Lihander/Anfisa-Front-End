<template>
  <button :class="getPentagonClasses" v-bind="$attrs" v-on="$listeners">
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <polygon points="20,0 80,0 100,50 50,100 0,50" />
      <font-awesome-icon
        v-if="icon"
        :icon="icon"
        x="25"
        y="15"
        height="50"
        width="50"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: "PentagonButton",
  props: {
    icon: {
      type: Array,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      pentagonClasses: ["pentagon"]
    }
  },
  computed: {
    getPentagonClasses() {
      const classes = this.pentagonClasses.slice(0)
      if (this.icon) {
        classes.push("pentagon-animation")
      }
      return classes
    }
  }
}
</script>

<style lang="scss">
button {
  height: 100%;
  cursor: default;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  padding: 0;
  margin: 0;
}
.pentagon {
  fill: $primary-color;
  stroke: $default-color;
  stroke-width: 2px;
  color: $default-color;
  &-animation {
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      color: $secondary-color;
      stroke: $secondary-color;
      fill: $default-color;
    }
  }
}
</style>
