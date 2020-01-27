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
        ...(item.colhead ? { colhead: item.colhead } : {})
      }
    } else if (item.type === "pre") {
      result[item.title] = {
        title: item.title,
        content: item.content
      }
    }
  })
  return result
}
