export type Filter = {[key: string]: unknown};

export const matchAppData = (appData: Filter, filter: Filter): boolean => {
  for (const filterKey in filter) {
    if (filter[filterKey] !== appData[filterKey]) return false;
  }

  return true;
};

export const removeFromArray = <T>(array: Array<T>, item: T) => {
  const index = array.indexOf(item);
  if (index < 0) throw new Error('Item not fount');
  array.splice(index, 1);
};
