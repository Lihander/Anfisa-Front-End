<template>
  <div v-if="variant.details" class="variants-list-item">
    <div class="variants-list-item__wrapper">
      <div class="variants-list-item__column" style="width: 12%">
        <div v-show="isShowHGMD" class="variants-list-item__column__hgmd">
          {{ getData("hgmd").data[0] }}
        </div>
        <div class="variants-list-item__column__title">
          {{ getData("genes").data[0] }}
        </div>
        <div
          class="variants-list-item__column__html"
          v-html="getData('gtex').data[0]"
        ></div>
      </div>
      <div class="variants-list-item__column" style="width: 12%">
        <div class="variants-list-item__column__data">
          {{ getData("hg19").data[0].split(/\s+/)[0] }}
        </div>
        <div
          class="variants-list-item__column__html"
          v-html="getData('hg19').data[0].split(/\s+/)[1]"
        ></div>
        <div
          class="variants-list-item__column__html"
          v-html="getIGVOpenLink"
        ></div>
      </div>
      <div class="variants-list-item__column" style="width: 15%">
        <BaseListItem :data="getData('canonical_annotation').data[0]" />
        <BaseListItem :data="getData('ppos_canonical').data[0]" />
      </div>
      <div class="variants-list-item__column" style="width: 15%">
        <PredicateItem
          :predicate-title="'Polyphen'"
          :predicate-data="getData('polyphen').data[0]"
        />
        <PredicateItem
          :predicate-title="'SIFT'"
          :predicate-data="getData('sift').data[0]"
        />
        <PredicateItem
          :predicate-title="'MUT TASTER'"
          :predicate-data="getData('mutation_taster').data[0]"
        />
        <PredicateItem
          :predicate-title="'FATHMM'"
          :predicate-data="getData('fathmm').data[0]"
        />
      </div>
      <div class="variants-list-item__column" style="width: 15%">
        <BaseListItem
          :title="getData('overall_af').title"
          :data="getData('overall_af').data[0]"
        />
        <BaseListItem
          :title="getData('overall_af_popmax').title"
          :data="getData('overall_af_popmax').data[0]"
        />
        <BaseListItem
          :title="getData('genome_af').title"
          :data="getData('genome_af').data[0]"
        />
        <BaseListItem
          :title="getData('genome_af_popmax').title"
          :data="getData('genome_af_popmax').data[0]"
        />
        <BaseListItem
          :title="getData('exome_af').title"
          :data="getData('exome_af').data[0]"
        />
        <BaseListItem :title="'Hom'" :data="getData('hom').data[0]" />
        <BaseListItem :title="'Hem'" :data="getData('hem').data[0]" />
      </div>
      <div class="variants-list-item__column" style="width: 25%">
        <SampleColumn :table="getTableByName('view_qsamples')" />
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
import SampleColumn from "~/components/view/list/SampleColumn.vue"
import BaseListItem from "~/components/UI/Lists/BaseListItem.vue"
import TagsHorizontalList from "~/components/UI/Tags/TagsHorizontalList.vue"
import * as utils from "~/assets/js/utils"
export default {
  name: "VariantsListItem",
  components: {
    TagsHorizontalList,
    BaseListItem,
    PredicateItem,
    SampleColumn,
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
      isNoteViewShow: false
    }
  },
  computed: {
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
        hgmd.data[0] &&
        hgmd.data[0].toLowerCase().trim() !==
          this.notPresent.toLowerCase().trim()
      )
    },
    getIGVOpenLink() {
      const igv = this.getData("igv").data[0]
      if (!igv) {
        return ""
      }
      const closeLinkTag = "</a>"
      const startLink = igv.indexOf("<a")
      const endLink = igv.indexOf(closeLinkTag)
      return igv.substring(startLink, endLink + closeLinkTag.length)
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
    getData(name) {
      const details = this.variant.details
      for (const table in details) {
        if (Object.prototype.hasOwnProperty.call(details, table)) {
          const data = utils.getDataFromTableByName(details[table], name)
          if (data) {
            return data[0]
          }
        }
      }
      return {
        title: "",
        data: [""]
      }
    },
    getTableByName(name) {
      const details = this.variant.details
      if (Object.prototype.hasOwnProperty.call(details, name)) {
        return details[name]
      }
    },
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
