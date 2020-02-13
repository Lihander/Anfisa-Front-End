import * as utils from "../assets/js/utils.js"

export const state = () => ({
  workspaces: [],
  selectedWorkspace: "",
  version: "",
  variants: [],
  totalVariants: 0,
  filteredVariants: 0,
  transcripts: [],
  selectedVariantId: "",
  tags: []
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
    const variant = state.variants.find(v => v.id === payload.variantId)
    variant.details = payload.details
  },
  setVariantCollapseDetailsById(state, payload) {
    const variant = state.variants.find(v => v.id === payload.selectedVariantId)
    for (let tableName in variant.details) {
      variant.details[tableName].collapseTable = payload.collapseTable
    }
  },
  setVariantCollapseDetailsByIdAndTableName(state, payload) {
    const variant = state.variants.find(v => v.id === payload.selectedVariantId)
    const detail = variant.details[payload.tableName]
    detail.collapseTable = !detail.collapseTable
  },
  setVariantTags(state, payload) {
    const variant = state.variants.find(v => v.id === payload.variantId)
    variant.tags = payload.selectedTags
  },
  setVariantNote(state, payload) {
    const variant = state.variants.find(v => v.id === payload.variantId)
    variant.note = payload.note
  },
  setTags(state, payload) {
    state.tags = payload.tags
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
              details: null,
              tags: [],
              note: ""
            }
          })
        )
        commit("setTotalVariants", res.total)
        commit("setFilteredVariants", res.filtered)
        commit("setTranscripts", res.transcripts)
      })
      .catch(e => console.log(e))
  },
  async getVariantDetails({ commit }, variantId) {
    const params = new URLSearchParams()
    params.append("ds", this.getters.getSelectedWorkspace)
    params.append("rec", variantId)
    await this.$axios
      .$post("/reccnt", params)
      .then(response => {
        const details = utils.prepareVariantDetails(response)
        commit("setVariantDetailsById", { variantId, details })
      })
      .catch(error => {
        console.log(error)
      })
  },
  async getVariantTagsAndNote({ commit }, variantId) {
    const params = new URLSearchParams()
    const NOTE_TAG = "_note"
    params.append("ws", this.getters.getSelectedWorkspace)
    params.append("rec", variantId)
    await this.$axios
      .$post("/tags", params)
      .then(response => {
        const selectedTags = Object.keys(response["rec-tags"]).filter(
          item => response["rec-tags"][item] && item !== NOTE_TAG
        )
        const note = response["rec-tags"][NOTE_TAG] || ""
        const tags = [...response["check-tags"], ...response["op-tags"]].filter(
          item => item !== NOTE_TAG
        )
        commit("setVariantTags", { variantId, selectedTags })
        commit("setVariantNote", { variantId, note })
        commit("setTags", { variantId, tags })
      })
      .catch(error => {
        console.log(error)
      })
  },

  async saveVariantTagsAndNote({ commit }, payload) {
    const variantId = payload.variant.id
    const tag = payload.tag
    const params = new URLSearchParams()
    const NOTE_TAG = "_note"
    const tagsObject = {}

    if (this.state.note) {
      tagsObject[NOTE_TAG] = this.state.note.trim()
    }

    this.state.tags.forEach(item => {
      tagsObject[item] = false
    })
    payload.variant.tags.forEach(item => {
      tagsObject[item] = true
    })

    if (tag) {
      tagsObject[tag] = !tagsObject[tag]
    }

    params.append("tags", JSON.stringify(tagsObject))
    params.append("ws", this.getters.getSelectedWorkspace)
    params.append("rec", variantId)
    await this.$axios
      .$post("/tags", params)
      .then(response => {
        const selectedTags = Object.keys(response["rec-tags"]).filter(
          item => response["rec-tags"][item] && item !== NOTE_TAG
        )
        const note = response["rec-tags"][NOTE_TAG] || ""
        const tags = [...response["check-tags"], ...response["op-tags"]].filter(
          item => item !== NOTE_TAG
        )
        commit("setVariantTags", { variantId, selectedTags })
        commit("setVariantNote", { variantId, note })
        commit("setTags", { variantId, tags })
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
  getSelectedVariant(state) {
    return state.variants.find(
      variant => variant.id === state.selectedVariantId
    )
  },
  getVariantById: state => id => {
    return state.variants.find(variant => variant.id === id)
  },
  getVariantDetailDataByVariantIdAndName: state => (id, name) => {
    const variant = state.variants.find(variant => variant.id === id)
    if (variant) {
      const details = variant.details
      if (details) {
        for (const table in details) {
          if (Object.prototype.hasOwnProperty.call(details, table)) {
            const detail = details[table].data
            if (detail && detail.length > 0) {
              const data = detail.find(data => {
                if (data[0] && data[0].name) {
                  return data[0].name.toLowerCase() === name.toLowerCase()
                }
              })
              if (data) {
                return data
              }
            }
          }
        }
      }
    }
    return ""
  },
  getVariantTagsById: state => id => {
    const variant = state.variants.find(variant => variant.id === id)
    if (variant) {
      return variant.tags
    }
    return []
  },
  getVariantNoteById: state => id => {
    const variant = state.variants.find(variant => variant.id === id)
    if (variant) {
      return variant.note
    }
    return []
  },
  getTags(state) {
    return state.tags
  }
}
