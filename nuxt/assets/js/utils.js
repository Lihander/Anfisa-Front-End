export function prepareVariantDetails(data) {
  const result = {};
  const getValuesForRow = row => (Array.isArray(row) ? row.map(val => val[0]) : []);
  data.forEach((item) => {
    if (item.type === 'table') {
      const tableData = item.rows.map(row => [{
        data: row[1],
        title: row[3],
      },
        ...getValuesForRow(row[2]),
      ]);
      result[item.name] = {
        title: item.title,
        data: tableData,
        ...item.colhead ? { colhead: item.colhead } : {},
      };
    } else if (item.type === 'pre') {
      result[item.title] = {
        title: item.title,
        content: item.content,
      };
    }
  });
  return result;
}
