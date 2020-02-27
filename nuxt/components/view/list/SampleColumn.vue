<template>
  <div class="samples">
    <div class="samples-info-list">
      <div v-for="(sample, index) in samples" :key="index" class="samples-info">
        <div class="main-info">
          <div class="icon" :class="sample.icon"></div>
          <BaseListItem style="width: 80% !important;" :data="sample.name" />
        </div>
        <BaseListItem :data="sample.genotype" />
        <BaseListItem :data="sample.genotype_q" />
      </div>
    </div>
    <BaseListItem
      style="font-size: 12px"
      :class="getFilterColor"
      :data="getFilters"
    />
  </div>
</template>

<script>
import * as utils from "~/assets/js/utils"
import BaseListItem from "~/components/UI/Lists/BaseListItem.vue"

export default {
  name: "SampleColumn",
  components: { BaseListItem },
  props: {
    table: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pass: "PASS",
      failed: "FAILED: "
    }
  },
  computed: {
    samples() {
      const meta = this.$store.getters.getMeta
      const samplesFromTable = this.getData("title").data
      const genotype = this.getData("genotype").data
      const genotype_q = this.getData("genotype_quality").data
      const samples = []
      samplesFromTable.forEach((sample, index) => {
        const sampleName = sample.split(/\s+/)[1]
        if (
          meta &&
          meta.samples &&
          Object.prototype.hasOwnProperty.call(meta.samples, sampleName)
        ) {
          const { sex } = meta.samples[sampleName]
          const { affected } = meta.samples[sampleName]
          samples.push({
            name: sampleName,
            genotype: genotype[index],
            genotype_q: genotype_q[index],
            icon: this.getAffectedIcon(sex, affected)
          })
        }
      })
      return samples
    },
    getFilters() {
      const filtersString = this.getData("ft").data[0].toString()
      if (filtersString.toLowerCase() !== this.pass.toLowerCase()) {
        return this.failed + filtersString
      }
      return this.pass
    },
    getFilterColor() {
      return this.getFilters === this.pass ? "filter__pass" : "filter__failed"
    }
  },
  methods: {
    getData(name) {
      return utils.getDataFromTableByName(this.table, name)[0]
    },
    getAffectedIcon(sex, affected) {
      if (affected) {
        return sex === 1 ? "man rect" : "woman rect"
      }
      return sex === 1 ? "man circle" : "woman circle"
    }
  }
}
</script>

<style lang="scss">
.samples-info-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  .samples-info {
    width: 33%;
    .main-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        width: 20px;
        height: 20px;
        &.man {
          background-color: $man-color;
        }
        &.woman {
          border: 2px solid $woman-color;
        }
        &.circle {
          border-radius: 50%;
        }
        &.rect {
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
