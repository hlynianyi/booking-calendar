export function formatJson(jsonData) {
  const dataObject = jsonData.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
  return dataObject;
}
