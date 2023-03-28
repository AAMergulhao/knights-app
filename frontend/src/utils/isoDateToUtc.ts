export const isoDateToUTC = (isoDate: string): string => {
  isoDate = isoDate.split('T')[0];

  const day = isoDate.slice(8);
  const mounth = isoDate.slice(5, 7);
  const year = isoDate.slice(0, 4);

  return `${day}/${mounth}/${year}`;
}