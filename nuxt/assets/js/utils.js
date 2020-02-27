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
