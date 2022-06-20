export type Filter = {[key: string]: unknown};

export const matchAppData = (appData: Filter, filter: Filter): boolean => {
  // eslint-disable-next-line no-restricted-syntax
  for (const filterKey in filter) {
    if (filter[filterKey] !== appData[filterKey]) return false;
  }

  return true;
};

export const logger = (message: string, info?: any) => {
  // eslint-disable-next-line no-console
  console.log(`${message}${info}`);
};
