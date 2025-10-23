export const daysInMonth = (year, monthIndex) => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

export const calculateOffset = (year, monthIndex) => {
  const firstDay = new Date(year, monthIndex, 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1;
};

export const formatDate = (date) => {
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${m}-${d}-${y}`;
};
