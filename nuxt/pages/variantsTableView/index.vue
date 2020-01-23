<template>
  <section class="wrapper-content wrapper-content--fixed">
    <div class="variants-desktop">
      <VariantsListPanel v-show="isVariantsListShow" />
      <ButtonsList
        :is-variants-list-show="isVariantsListShow"
        @showVariantsList="isVariantsListShow = !isVariantsListShow"
      />
      <VariantsTables />
    </div>
  </section>
</template>

<script>
import VariantsListPanel from "~/components/view/table/VariantsListPanel.vue"
import ButtonsList from "~/components/UI/Lists/ButtonsList.vue"
import VariantsTables from "~/components/view/table/VariantsTables"
export default {
  components: { VariantsTables, ButtonsList, VariantsListPanel },
  data() {
    return {
      isVariantsListShow: true
    }
  },
  validate({ params, query, store }) {
    return store.getters.getWorkspaces.some(ws => ws.name === query.ws)
  },
  watch: {
    "$route.query.ws"() {
      this.getWorkspaceDetails()
    }
  },
  mounted() {
    this.getWorkspaceDetails()
  },
  methods: {
    getWorkspaceDetails() {
      const { ws } = this.$route.query
      this.$store.dispatch("getWorkspaceDetails", ws)
    }
  }
}
</script>

<style lang="scss">
.variants-desktop {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
