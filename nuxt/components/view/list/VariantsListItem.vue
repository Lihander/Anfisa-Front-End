<template>
  <div v-show="variant.details" class="variants-list-item">
    <div class="variants-list-item__column" style="width: 12%">
      <div v-show="isShowHGMD" class="variants-list-item__column__hgmd">
        {{ getData("hgmd") }}
      </div>
      <div class="variants-list-item__column__title">
        {{ getData("genes") }}
      </div>
      <div
        class="variants-list-item__column__html"
        v-html="getData('gtex')"
      ></div>
      <div v-if="getTags.length > 0" class="variants-list-item__column__tags">
        <div class="variants-list-item__column__tags__wrapper default-scroll">
          <TagButton
            v-for="(tag, index) in getTags"
            :key="index"
            class="variants-list-item__column__tags__wrapper__item"
            :tag="tag"
          />
        </div>
      </div>
    </div>
    <div class="variants-list-item__column" style="width: 12%">
      <div class="variants-list-item__column__data">
        {{ getData("hg19").split(/\s+/)[0] }}
      </div>
      <div
        class="variants-list-item__column__html"
        v-html="getData('hg19').split(/\s+/)[1]"
      ></div>
      <div
        class="variants-list-item__column__html"
        v-html="getIGVOpenLink"
      ></div>
    </div>
    <div class="variants-list-item__column" style="width: 15%">
      <BaseListItem :data="getData('canonical_annotation')" />
      <BaseListItem :data="getData('ppos_canonical')" />
    </div>
    <div class="variants-list-item__column" style="width: 15%">
      <PredicateItem
        :predicate-title="'Polyphen'"
        :predicate-data="getData('polyphen')"
      />
      <PredicateItem
        :predicate-title="'SIFT'"
        :predicate-data="getData('sift')"
      />
      <PredicateItem
        :predicate-title="'MUT TASTER'"
        :predicate-data="getData('mutation_taster')"
      />
      <PredicateItem
        :predicate-title="'FATHMM'"
        :predicate-data="getData('fathmm')"
      />
    </div>
    <div class="variants-list-item__column" style="width: 15%">
      <BaseListItem
        :title="getTitle('overall_af')"
        :data="getData('overall_af')"
      />
      <BaseListItem
        :title="getTitle('overall_af_popmax')"
        :data="getData('overall_af_popmax')"
      />
      <BaseListItem
        :title="getTitle('genome_af')"
        :data="getData('genome_af')"
      />
      <BaseListItem
        :title="getTitle('genome_af_popmax')"
        :data="getData('genome_af_popmax')"
      />
      <BaseListItem :title="getTitle('exome_af')" :data="getData('exome_af')" />
      <BaseListItem :title="'Hom'" :data="getData('hom')" />
      <BaseListItem :title="'Hem'" :data="getData('hem')" />
    </div>
    <div class="variants-list-item__column" style="width: 25%">
      <SampleItem
        v-for="(name, index) in getData('title').slice(2)"
        :key="index"
        :data="name"
      />
      <BaseListItem
        style="font-size: 12px"
        :class="getFilterColor"
        :data="getFilters"
      />
    </div>
    <button class="more-button" @click="toggleToTableView">
      <font-awesome-icon :icon="['fas', 'angle-double-right']" />
    </button>
  </div>
</template>

<script>
import PredicateItem from "~/components/view/list/PredicateItem.vue"
import SampleItem from "~/components/view/list/SampleItem.vue"
import BaseListItem from "~/components/UI/Lists/BaseListItem.vue"
import TagButton from "~/components/UI/Controls/TagButton.vue"
export default {
  name: "VariantsListItem",
  components: { BaseListItem, PredicateItem, SampleItem, TagButton },
  props: {
    variant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      notPresent: "Not Present",
      pass: "PASS",
      failed: "FAILED: "
    }
  },
  computed: {
    getDetailData() {
      const vm = this
      return name => {
        if (vm.variant) {
          const id = vm.variant.id
          return vm.$store.getters.getVariantDetailDataByVariantIdAndName(
            id,
            name
          )
        } else {
          return ""
        }
      }
    },
    getTitle() {
      const vm = this
      return name => {
        const detailData = vm.getDetailData(name)
        if (detailData && detailData[0]) {
          return detailData[0].title
        } else {
          return ""
        }
      }
    },
    getData() {
      const vm = this
      return name => {
        const detailData = vm.getDetailData(name)
        if (detailData && detailData[0]) {
          return detailData[0].data[0]
        } else {
          return ""
        }
      }
    },
    getTags() {
      if (this.variant) {
        return this.variant.tags
      }
      return []
    },
    isShowHGMD() {
      const hgmd = this.getData("hgmd")
      return (
        hgmd &&
        hgmd.toLowerCase().trim() !== this.notPresent.toLowerCase().trim()
      )
    },
    getIGVOpenLink() {
      const igv = this.getData("igv")
      const closeLinkTag = "</a>"
      const startLink = igv.indexOf("<a")
      const endLink = igv.indexOf(closeLinkTag)
      return igv.substring(startLink, endLink + closeLinkTag.length)
    },
    getFilters() {
      const filtersString = this.getData("ft").toString()
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
    toggleToTableView() {
      this.$store.commit("setSelectedVariantId", this.variant.id)
      const selectedWorkspace = this.$store.getters.getSelectedWorkspace
      this.$router.push({
        path: "/variantsTableView",
        query: { ws: selectedWorkspace }
      })
    }
  }
}
</script>

<style lang="scss">
.variants-list-item {
  height: 25vh;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  background-color: $default-color;
  border: 2px solid $secondary-color;
  border-radius: 10px;
  margin: 10px 20px;
  padding: 5px 20px 5px 10px;
  font-size: 16px;
  &__column {
    text-align: left;
    height: 100%;
    &__hgmd {
      font-size: 14px;
    }
    &__title {
      font-size: 24px;
      line-height: 26px;
      font-weight: 800;
      color: $primary-color;
    }
    &__tags {
      width: 100%;
      height: 60%;
      margin-top: 5px;
      padding: 0 0 0 5px;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
      border: 1px solid $primary-color;
      border-radius: 5px;
      &__wrapper {
        width: 100%;
        height: 99%;
        padding: 2px 2px 2px 0;
        &__item {
          width: 100%;
          height: 20%;
          margin-right: 0;
          margin-bottom: 5px;
          &.tag {
            margin-right: 0;
          }
        }
      }
      .default-scroll {
        &::-webkit-scrollbar {
          width: 4px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
        }
      }
    }
  }
  .more-button {
    width: 20px;
    position: absolute;
    right: 0;
    top: 0;
    color: $secondary-color;
    cursor: pointer;
    border-left: 2px solid $secondary-color;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: $neutral-placeholder;
    }
  }
}
.filter {
  &__pass {
    color: $success-color;
  }
  &__failed {
    color: $danger-color;
  }
}
</style>
