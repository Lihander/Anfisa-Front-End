import Vue from "vue"
import * as utils from "../assets/js/utils.js"
import {
  STAT_GROUP,
  STAT_TYPE_ENUM,
  STAT_TYPE_ZYGOSITY,
  STAT_NUMERIC
} from "../assets/js/constants.js"

export const state = () => ({
  workspaces: [],
  selectedWorkspace: "",
  version: "",
  variants: [],
  totalVariants: 0,
  filteredVariants: 0,
  transcripts: [],
  selectedVariantId: "",
  tags: [],
  isShowAllNotes: false,
  noteStatus: "",
  meta: null,
  compiled: null,
  zones: [],
  selectedPreset: [],
  presets: [],
  presetsLoading: false,
  stats: [],
  showVariantsFilter: false,
  currentConditions: [],
  nonzeroOnly: true
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
  setNoteStatus(state, payload) {
    state.noteStatus = payload.noteStatus
  },
  updateShowAllNotes(state, isShowAllNotes) {
    state.isShowAllNotes = isShowAllNotes
  },
  setMeta(state, meta) {
    state.meta = meta
  },
  setCompiled(state, compiled) {
    state.compiled = compiled
  },
  setZone(state, payload) {
    const zoneIndex = state.zones.findIndex(
      zone => zone.zoneName === payload.zoneName
    )
    if (zoneIndex === -1) {
      state.zones.push(payload)
    } else {
      state.zones[zoneIndex] = payload
    }
  },
  setStats(state, stats) {
    state.stats = stats
  },
  setSelectedPreset(state, selectedPreset) {
    state.selectedPreset[0] = selectedPreset
  },
  setPresets(state, presets) {
    state.presets = presets
  },
  setPresetsLoading(state, presetsLoading) {
    state.presetsLoading = presetsLoading
  },
  setShowVariantsFilter(state, isShow) {
    state.showVariantsFilter = isShow
  },
  setAllCurrentConditions(state, conditions) {
    state.currentConditions = conditions
  },
  setCurrentConditions(state, condition) {
    const index = state.currentConditions.findIndex(
      item => item[1] === condition[1] && item[0] === condition[0]
    )
    if (index === -1) {
      state.currentConditions.push(condition)
    } else {
      const conditionFixed = JSON.parse(JSON.stringify(condition))
      if (condition[0] === STAT_TYPE_ENUM) {
        ;[, , conditionFixed[2]] = state.currentConditions[index]
      }
      if (condition[0] === STAT_TYPE_ZYGOSITY) {
        ;[, , , conditionFixed[3]] = state.currentConditions[index]
      }
      Vue.set(state.currentConditions, index, conditionFixed)
    }
  },
  setZygosityByName(state, payload) {
    let stats = state.stats
    const units = payload.units[0]
    if (units[1].vgroup) {
      const targetGroup = stats.find(
        item => item.title === units[1].vgroup && item.type === STAT_GROUP
      )
      stats = targetGroup.data
    }
    const targetItemIndex = stats.findIndex(item => item.name === units[1].name)
    Vue.set(stats, targetItemIndex, utils.prepareStatDataByType(units))
  },
  setNonzeroOnly(state, nonzeroOnly) {
    state.nonzeroOnly = nonzeroOnly
  },
  removeConditionsByIndex(state, index) {
    state.currentConditions.splice(index, 1)
  },
  removeConditionsItemByIndex(state, payload) {
    const condition = state.currentConditions[payload.conditionIndex]
    let index = 3
    if (condition[0] === STAT_TYPE_ZYGOSITY) {
      index = 4
    }
    condition[index].splice(payload.index, 1)
  },
  resetWorkspace(state) {
    state.variants = []
    state.totalVariants = 0
    state.filteredVariants = 0
    state.transcripts = []
    state.selectedVariantId = ""
  },
  resetZones(state) {
    state.zones = []
  },
  resetFilters(state) {
    state.zones.forEach(zone => {
      return (zone.selectedValues = [])
    })
    state.selectedPreset = []
  },
  resetConditionsByName(state, name) {
    const index = state.currentConditions.findIndex(
      condition => condition[1] === name
    )
    if (index !== -1) {
      state.currentConditions.splice(index, 1)
    }
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
  async getWorkspaceDetails({ commit }, payload) {
    commit("setSelectedWorkspace", payload.ws)
    commit("resetWorkspace")
    const selectedPreset = payload.selectedPreset
    const zones = payload.zones

    const params = utils.prepareParams({
      ws: payload.ws,
      filter: selectedPreset,
      zones: zones
    })
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
    const note = this.getters.getVariantNoteById(variantId)
    const tag = payload.tag
    const params = new URLSearchParams()
    const NOTE_TAG = "_note"
    const tagsObject = {}

    if (note) {
      tagsObject[NOTE_TAG] = note.trim()
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
        const tags = [...response["check-tags"], ...response["op-tags"]].filter(
          item => item !== NOTE_TAG
        )
        commit("setVariantTags", { variantId, selectedTags })
        commit("setTags", { variantId, tags })
        commit("setNoteStatus", { noteStatus: "Saved" })
      })
      .catch(error => {
        commit("setNoteStatus", { noteStatus: error })
        console.log(error)
      })
  },

  async getMeta({ commit }, selectedWorkspace) {
    const params = new URLSearchParams()
    params.append("ds", selectedWorkspace)
    await this.$axios
      .$post("/dsmeta", params)
      .then(response => {
        commit("setMeta", response)
      })
      .catch(error => {
        console.log(error)
      })
  },

  async getFilters({ commit }, selectedWorkspace) {
    commit("setPresetsLoading", true)
    const params = new URLSearchParams()
    params.append("ws", selectedWorkspace)
    const compiled = this.getters.getCompiled
    if (compiled) {
      params.append("compiled", JSON.stringify(compiled))
    }
    await this.$axios
      .$post("/stat", params)
      .then(response => {
        const filterList = response["filter-list"]
        if (filterList && Array.isArray(filterList)) {
          const data = filterList.map(item => item[0])
          commit("setPresets", [null, ...data])
          commit("setPresetsLoading", false)
        }
        const statList = utils.getStatListWithOperativeStat(response)
        commit("setStats", utils.prepareStatList(statList))
        commit("setCompiled", response.compiled)
      })
      .catch(error => {
        console.log(error)
      })
  },

  async getZones({ commit }, selectedWorkspace) {
    const params = new URLSearchParams()
    params.append("ws", selectedWorkspace)
    await this.$axios
      .$post("/zone_list", params)
      .then(response => {
        response.forEach(zone => {
          commit("setZone", {
            zoneName: zone[0],
            zoneLoading: true,
            selectedValues: [],
            defaultValue: zone[1],
            values: []
          })
          this.dispatch("getZoneData", { selectedWorkspace, zone })
        })
      })
      .catch(error => {
        console.log(error)
      })
  },

  async updateZygosityByName({ commit }, { family, name }) {
    const currentConditions = this.getters.getCurrentConditions
    const params = new URLSearchParams()
    params.append("ws", this.getters.getSelectedWorkspace)
    params.append("units", JSON.stringify([name]))
    params.append("ctx", JSON.stringify({ problem_group: family }))
    if (currentConditions.length) {
      params.append("conditions", JSON.stringify(currentConditions))
    }
    await this.$axios
      .$post("/statunits", params)
      .then(response => {
        commit("setZygosityByName", response)
      })
      .catch(error => {
        console.log(error)
      })
  },

  async getZoneData({ commit }, payload) {
    const [zone, value] = payload.zone
    const params = new URLSearchParams()
    params.append("ws", payload.selectedWorkspace)
    params.append("zone", zone)
    await this.$axios.$post("/zone_list", params).then(response => {
      const zoneData = {
        zoneName: zone,
        zoneLoading: false,
        selectedValues: [],
        defaultValue: value,
        values: response.variants
      }
      commit("setZone", zoneData)
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
  getVariantsByGroups(state) {
    const regExp = /^\[.+\]/
    const variantsByGroups = {}
    state.variants.forEach(item => {
      const group = regExp.exec(item.name)
      if (group) {
        if (!variantsByGroups[group]) {
          variantsByGroups[group] = []
        }
        variantsByGroups[group].push(item)
      }
    })
    return variantsByGroups
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
  },
  getNoteStatus(state) {
    return state.noteStatus
  },
  isShowAllNotes(state) {
    return state.isShowAllNotes
  },
  getMeta(state) {
    return state.meta
  },
  getCompiled(state) {
    return state.compiled
  },
  getZones(state) {
    return state.zones
  },
  getSelectedPreset(state) {
    return state.selectedPreset
  },
  getPresets(state) {
    return state.presets
  },
  getPresetsLoading(state) {
    return state.presetsLoading
  },
  getShowVariantsFilter(state) {
    return state.showVariantsFilter
  },
  getStats(state) {
    return state.stats
  },
  getFilteredStats(state) {
    return searchQuery => {
      const result = []
      state.stats.forEach(stat => {
        let subResult
        if (stat.type === STAT_GROUP) {
          if (stat.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            subResult = stat
          } else {
            const data = stat.data.filter(subStat =>
              utils.checkStatByQuery(subStat, searchQuery)
            )
            subResult = { ...stat, data }
          }
        } else {
          subResult = utils.checkStatByQuery(stat, searchQuery)
            ? stat
            : { ...stat, type: STAT_GROUP, data: [] }
        }
        result.push(subResult)
      })
      return result
    }
  },
  getCurrentConditionsArray(state) {
    return state.currentConditions
  },
  getCurrentConditions(state) {
    const result = []
    state.currentConditions.forEach(condition => {
      if (condition[0] === STAT_TYPE_ZYGOSITY) {
        const [type, name, family, , variants] = condition
        result[name] = {
          type,
          family,
          variants
        }
      } else {
        const [type, name, data, list] = condition
        result[name] = {
          type,
          data,
          list
        }
      }
    })
    return result
  },
  getConditionsByName: state => name => {
    return state.currentConditions.find(condition => {
      if (condition[1] === name) {
        if (condition[0] === STAT_TYPE_ENUM) {
          return condition[3]
        } else if (condition[0] === STAT_TYPE_ZYGOSITY) {
          return condition[4]
        } else if (condition[0] === STAT_NUMERIC) {
          return condition[2]
        }
      }
    })
  },
  getNonzeroOnly(state) {
    return state.nonzeroOnly
  }
}
