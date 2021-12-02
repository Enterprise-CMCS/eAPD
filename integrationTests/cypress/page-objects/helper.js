// Extract just the numbers from an input string
export const extractNumber = str => {
  return parseInt(str.replace(/\D/g, ''), 10);
};

export const addCommas = str => {
  const converted = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return converted;
};

export const getDateRange = (startDate, endDate) => {
  const start = startDate ? startDate.join('/') : 'Date not specified';
  const end = endDate ? endDate.join('/') : 'Date not specified';
  return `${start} - ${end}`;
};
