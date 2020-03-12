import {
  STAT_TYPE_ENUM,
  STAT_TYPE_STATUS,
  STAT_TYPE_INT,
  STAT_TYPE_FLOAT,
  STAT_GROUP,
  STAT_TYPE_ZYGOSITY,
  STAT_TYPE_TRANSCRIPT_MULTISET,
  STAT_TYPE_TRANSCRIPT_STATUS,
  NUMERIC_RENDER_TYPES,
  STAT_TYPES,
  RENDER_OPERATIVE
} from "./constants"

export function prepareParams({ ws, filter, conditions, zones }) {
  const params = new URLSearchParams()
  if (ws) {
    params.append("ws", ws)
  }
  if (filter) {
    params.append("filter", filter)
  }
  if (conditions && conditions.length) {
    params.append("conditions", JSON.stringify(conditions))
  }
  if (zones) {
    zones.forEach(zone => {
      if (zone.selectedValues.length !== 0) {
        params.append(
          "zone",
          JSON.stringify([zone.zoneName, zone.selectedValues])
        )
      }
    })
  }
  return params
}

export function prepareVariantDetails(data) {
  const result = {}
  const getValuesForRow = row =>
    Array.isArray(row) ? row.map(val => val[0]) : []
  data.forEach(item => {
    if (item.type === "table") {
      const tableData = item.rows.map(row => [
        {
          name: row[0],
          title: row[1],
          description: row[3],
          data: getValuesForRow(row[2])
        }
      ])
      result[item.name] = {
        title: item.title,
        data: tableData,
        collapseTable: false,
        type: item.type,
        ...(item.colhead ? { colhead: item.colhead } : {})
      }
    } else if (item.type === "pre") {
      result[item.title] = {
        title: item.title,
        content: item.content,
        collapseTable: false,
        type: item.type
      }
    }
  })
  return result
}

export function getDataFromTableByName(table, name) {
  const detail = table.data
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
  return null
}

export function getStatListWithOperativeStat(data) {
  const statsToAdd = (data && data["avail-import"]) || []
  let statList = data["stat-list"]
  if (statList && Array.isArray(statList)) {
    statsToAdd.forEach((statToAdd, index) => {
      const dubbedHetStat = statList.findIndex(
        statItem => statItem[1].name === statToAdd
      )
      if (dubbedHetStat === -1) {
        const target = [
          STAT_TYPE_ENUM,
          {
            vgroup: "Inheritance",
            name: statToAdd,
            render: RENDER_OPERATIVE,
            title: data["avail-import-titles"]
              ? data["avail-import-titles"][index]
              : ""
          },
          [["Proband", null]]
        ]
        statList = [...statList, target]
      }
    })
  }
  return statList
}

export function prepareStatList(statList) {
  const tmpResult = []
  const groupsData = {}

  if (statList && Array.isArray(statList)) {
    statList
      .filter(statItem => STAT_TYPES.includes(statItem[0]))
      .forEach(statItem => {
        const groupName = statItem[1].vgroup
        if (groupName) {
          if (!Object.keys(groupsData).includes(groupName)) {
            tmpResult.push({
              title: groupName,
              type: STAT_GROUP
            })
            groupsData[groupName] = []
          }
          groupsData[groupName].push(prepareStatDataByType(statItem))
        } else {
          const data = prepareStatDataByType(statItem)
          tmpResult.push({ ...data, title: data.name })
        }
      })
  }

  return tmpResult.map(item => {
    if (item.type === STAT_GROUP) {
      return {
        ...item,
        data: groupsData[item.title]
      }
    }
    return item
  })
}

export const prepareStatDataByType = statItem => {
  switch (statItem[0]) {
    case STAT_TYPE_INT:
    case STAT_TYPE_FLOAT:
      return prepareNumericStatData(statItem)
    case STAT_TYPE_ENUM:
    case STAT_TYPE_STATUS:
    case STAT_TYPE_TRANSCRIPT_MULTISET:
    case STAT_TYPE_TRANSCRIPT_STATUS:
      return prepareEnumStatData(statItem)
    case STAT_TYPE_ZYGOSITY:
      return prepareZygosityStatData(statItem)
    default:
      return null
  }
}

export function checkStatByQuery(stat, query = "") {
  if (stat.name.toLowerCase().includes(query.toLowerCase())) {
    return true
  } else if (stat.type === STAT_TYPE_ENUM || stat.type === STAT_TYPE_STATUS) {
    return stat.data.some(item =>
      item[0].toLowerCase().includes(query.toLowerCase())
    )
  } else if (stat.type === STAT_TYPE_ZYGOSITY) {
    return (
      stat.data.family.some(item =>
        item.toLowerCase().includes(query.toLowerCase())
      ) ||
      stat.data.variants.some(item =>
        item[0].toLowerCase().includes(query.toLowerCase())
      )
    )
  }
  return false
}

const prepareNumericStatData = statItem => ({
  type: statItem[0],
  name: statItem[1].name,
  title: statItem[1].title,
  tooltip: statItem[1].tooltip,
  render: statItem[1].render
    ? statItem[1].render.split(",")[0]
    : NUMERIC_RENDER_TYPES.LINEAR,
  data: statItem.splice(2)
})

const prepareEnumStatData = statItem => ({
  type: statItem[0],
  name: statItem[1].name,
  title: statItem[1].title,
  tooltip: statItem[1].tooltip,
  data: statItem[2],
  render: statItem[1].render
})

const prepareZygosityStatData = statItem => ({
  type: statItem[0],
  name: statItem[1].name,
  title: statItem[1].title,
  data: {
    family: statItem[1].family,
    selectedFamily: statItem[2],
    variants: statItem[3]
  }
})
