<template>
  <div class="load-view">
    <LoadToolbar @close="$emit('close')" />
    <div class="load-filters-list">
      <div v-for="(preset, index) in presets" :key="index">
        <LoadViewCard class="load-filter" :filter="filter(preset)" />
      </div>
    </div>
  </div>
</template>

<script>
import LoadToolbar from "~/components/view/filter/load-view/LoadToolbar.vue"
import LoadViewCard from "~/components/view/filter/load-view/LoadViewCard.vue"
export default {
  name: "LoadView",
  components: {
    LoadViewCard,
    LoadToolbar
  },
  data() {
    return {
      sortDate: "",
      sortAlpha: ""
    }
  },
  computed: {
    presets() {
      return this.$store.getters.getPresets.slice(1)
    },
    filter() {
      return preset => {
        return this.$store.getters.getPresetByName(preset[0])
      }
    }
  },
  created() {
    const presets = this.$store.getters.getPresets
    presets.forEach(preset => {
      if (!preset) {
        return
      }
      this.$store.dispatch("getConditionsByFilter", {
        ws: this.$store.getters.getSelectedWorkspace,
        filter: preset[0]
      })
    })
  },
  methods: {
    sortBy() {}
  }
}
</script>

<style lang="scss">
.load-view {
  height: 100%;
  .load-filter {
    border-bottom: 2px dotted $neutral-placeholder;
  }
}
</style>
