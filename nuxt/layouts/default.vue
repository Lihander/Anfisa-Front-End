<template>
  <v-app>
    <div class="home">
      <Header />
      <nuxt />

      <BaseModal
        v-show="showVariantsFilter"
        :title="variantsFilterTitle"
        :show-footer="false"
        @close="showVariantsFilter = false"
      >
        <div slot="header-buttons">
          <AppButton
            class="advanced-view-button"
            :btn-class="'btnDefaultOutline'"
          >
            &lt;/&gt;
          </AppButton>
        </div>
        <VariantsFilter slot="body" />
      </BaseModal>
    </div>
  </v-app>
</template>

<script>
import Header from "~/components/system/header/Header.vue"
import BaseModal from "~/components/UI/Modals/BaseModal.vue"
import AppButton from "~/components/UI/Controls/Button.vue"
import VariantsFilter from "~/components/view/filter/VariantsFilter"
import { VARIANTS_FILTER_TITLE } from "~/assets/js/constants.js"

export default {
  components: { Header, BaseModal, AppButton, VariantsFilter },
  // validate({ params, query, store }) {
  //   return store.getters.getWorkspaces.some(ws => ws.name === query.ws)
  // },
  computed: {
    showVariantsFilter: {
      get() {
        return this.$store.getters.getShowVariantsFilter
      },
      set(value) {
        this.$store.commit("setShowVariantsFilter", value)
      }
    },
    variantsFilterTitle() {
      return VARIANTS_FILTER_TITLE
    }
  },
  watch: {
    "$route.query.ws"() {
      this.getWorkspaceDetails()
    }
  },
  created() {
    this.$store.dispatch("getWorkspacesList")
  },
  mounted() {
    const variants = this.$store.getters.getVariants
    if (variants.length === 0) {
      this.getWorkspaceDetails()
    }
  },
  methods: {
    getWorkspaceDetails() {
      const { ws } = this.$route.query
      if (ws) {
        this.$store.dispatch("getWorkspaceDetails", { ws: ws })
        this.$store.dispatch("getFilters", ws)
        this.$store.dispatch("getZones", ws)
        this.$store.dispatch("getMeta", ws)
        this.$store.commit("resetZones")
      }
    }
  }
}
</script>

<style lang="scss">
.home {
  height: 100vh;
  background: linear-gradient($border-light, transparent 1px),
    linear-gradient(90deg, $border-light, transparent 1px);
  background-size: 10px 10px;
  background-position: center center;

  .modal-content {
    width: 80vw;
    height: 90vh;
    .modal-header {
      height: 7%;
    }
    .modal-body {
      height: 93%;
    }
    .advanced-view-button {
      padding: 0 20px;
      font-size: 24px;
      border-radius: 20px;
    }
  }
}
</style>
