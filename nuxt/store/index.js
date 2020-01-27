import * as utils from "../assets/js/utils.js"

export const state = () => ({
  workspaces: [],
  selectedWorkspace: "",
  version: "",
  variants: [],
  totalVariants: 0,
  filteredVariants: 0,
  transcripts: [],
  selectedVariantId: ""
})

export const mutations = {
  setWorkspaces(state, workspaces) {
    state.workspaces = workspaces
  },
  setSelectedWorkspace(state, selectedWorkspace) {
    state.selectedWorkspace = selectedWorkspace
  },
  setVersion(state, version) {
    state.version = version
  },
  setVariants(state, variants) {
    state.variants = variants
  },
  setTotalVariants(state, totalVariants) {
    state.totalVariants = totalVariants
  },
  setFilteredVariants(state, filteredVariants) {
    state.filteredVariants = filteredVariants
  },
  setTranscripts(state, transcripts) {
    state.transcripts = transcripts
  },
  setSelectedVariantId(state, selectedVariantId) {
    state.selectedVariantId = selectedVariantId
  },
  setVariantDetailsById(state, payload) {
    const variant = state.variants.find(v => v.id === payload.selectedVariantId)
    variant.details = payload.details
  },
  setVariantCollapseDetailsById(state, payload) {
    const variant = state.variants.find(v => v.id === payload.selectedVariantId)
    if (variant && variant.details.length > 0) {
      for (let tableName in variant.details) {
        variant.details[tableName].collapseTable = false
      }
    }
  },
  setVariantCollapseDetailsByIdAndTableName(state, payload) {
    const variant = state.variants.find(v => v.id === payload.selectedVariantId)
    const detail = variant.details[payload.tableName]
    detail.collapseTable = !detail.collapseTable
  },
  resetWorkspace(state) {
    state.variants = []
    state.totalVariants = 0
    state.filteredVariants = 0
    state.transcripts = []
  }
}

export const actions = {
  // This worked only with universal mode
  // nuxtServerInit({ commit }) {
  //   return this.$axios
  //     .$get("/dirinfo")
  //     .then(res => {
  //       commit("setWorkspaces", res.workspaces)
  //       commit("setVersion", res.version)
  //     })
  //     .catch(e => console.log(e))
  // },

  async getWorkspacesList({ commit }) {
    await this.$axios
      .$get("/dirinfo")
      .then(res => {
        commit("setWorkspaces", res.workspaces)
        commit("setVersion", res.version)
      })
      .catch(e => console.log(e))
  },
  async getWorkspaceDetails({ commit }, selectedWorkspace) {
    commit("setSelectedWorkspace", selectedWorkspace)
    commit("resetWorkspace")
    const params = new URLSearchParams()
    params.append("ws", selectedWorkspace)
    await this.$axios
      .$post("/list", params)
      .then(res => {
        commit(
          "setVariants",
          res.records.map(record => {
            return {
              id: record[0],
              name: record[1],
              type: record[2],
              details: null
            }
          })
        )
        commit("setTotalVariants", res.total)
        commit("setFilteredVariants", res.filtered)
        commit("setTranscripts", res.transcripts)
      })
      .catch(e => console.log(e))
  },
  async getVariantDetails({ commit }, selectedVariantId) {
    const params = new URLSearchParams()
    params.append("ds", this.getters.getSelectedWorkspace)
    params.append("rec", selectedVariantId)
    await this.$axios
      .$post("/reccnt", params)
      .then(response => {
        const details = utils.prepareVariantDetails(response)
        commit("setVariantDetailsById", { selectedVariantId, details })
        commit("setSelectedVariantId", selectedVariantId)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const getters = {
  getWorkspaces(state) {
    return state.workspaces
  },
  getSelectedWorkspace(state) {
    return state.selectedWorkspace
  },
  getVersion(state) {
    return state.version
  },
  getVariants(state) {
    return state.variants
  },
  getTotalVariants(state) {
    return state.totalVariants
  },
  getFilteredVariants(state) {
    return state.filteredVariants
  },
  getTranscripts(state) {
    return state.transcripts
  },
  getSelectedVariantId(state) {
    return state.selectedVariantId
  },
  getVariantById: state => id => {
    return state.variants.find(variant => variant.id === id)
  }
}
