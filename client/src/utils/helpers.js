export const makeSearchParamsFromData = (data) => {
  const searchParams = new URLSearchParams();
  Object.keys(data).map((dataKey) => searchParams.append(dataKey, data[dataKey]));
  return searchParams;
};
