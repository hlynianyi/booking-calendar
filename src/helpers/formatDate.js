export function formatDate(date) {
  return new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replace(/(\d{2})\.(\d{2})\.(\d{4})/, "$3-$2-$1");
}