<template>
  <div v-show="variant.details" class="variants-list-item">
    <div class="variants-list-item__wrapper">
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
        <BaseListItem
          :title="getTitle('exome_af')"
          :data="getData('exome_af')"
        />
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
    <div class="variants-list-item__footer">
      <div class="variants-list-item__footer__main">
        <CollapseButton
          v-if="variant.note"
          class="variants-list-item__footer__main__note-btn"
          btn-class="btnPrimary"
          hide-class="btnDanger"
          :value="isNoteViewShow"
          :show-icon="showNoteViewIcon"
          :hide-icon="hideNoteViewIcon"
          @change="isNoteViewShow = !isNoteViewShow"
        />
        <div class="variants-list-item__footer__main__tags-list">
          <TagsHorizontalList :variant="variant" />
        </div>
      </div>
      <div
        v-show="variant.note && (isNoteViewShow || isShowAllNotes)"
        class="variants-list-item__footer__note-view"
      >
        {{ variant.note }}
      </div>
    </div>
  </div>
</template>

<script>
import CollapseButton from "~/components/UI/Controls/CollapseButton.vue"
import PredicateItem from "~/components/view/list/PredicateItem.vue"
import SampleItem from "~/components/view/list/SampleItem.vue"
import BaseListItem from "~/components/UI/Lists/BaseListItem.vue"
import TagsHorizontalList from "~/components/UI/Tags/TagsHorizontalList.vue"
export default {
  name: "VariantsListItem",
  components: {
    TagsHorizontalList,
    BaseListItem,
    PredicateItem,
    SampleItem,
    CollapseButton
  },
  props: {
    variant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showNoteViewIcon: ["fas", "clipboard"],
      hideNoteViewIcon: ["fas", "times"],
      notPresent: "Not Present",
      pass: "PASS",
      failed: "FAILED: ",
      isNoteViewShow: false
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
    },
    isShowAllNotes() {
      return this.$store.getters.isShowAllNotes
    }
  },
  watch: {
    isShowAllNotes() {
      this.isNoteViewShow = this.isShowAllNotes
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
  min-height: 25vh;
  position: relative;
  background-color: $default-color;
  border: 2px solid $secondary-color;
  border-radius: 10px;
  margin: 10px 20px;
  font-size: 16px;
  overflow: hidden;
  &__wrapper {
    width: 100%;
    min-height: 20vh;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    padding: 5px 20px 5px 10px;
  }
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
  }
  &__footer {
    margin-right: 20px;
    &__main {
      position: relative;
      width: 100%;
      max-height: 5vh;
      &__tags-list {
        padding: 5px 10px;
        margin-left: 50px;

        .tags-horizontal-list {
          justify-content: flex-end;
        }
      }

      &__note-btn {
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 50px;
        border-radius: 0 5px 0 0;
        border-width: 2px !important;
        border-left: none !important;
        border-bottom: none !important;
        font-size: 20px;
      }
    }
    &__note-view {
      width: 100%;
      background-color: $default-color;
      border-top: 2px solid $danger-color;
      padding: 5px 10px;
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
