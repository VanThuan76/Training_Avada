export const parseURLSearch = (param, location, sorts) => {
  const queryParams = new URLSearchParams(location.search);
  const oldQuery = Object.fromEntries(queryParams.entries());
  if (Object.keys(oldQuery).length > 0) {
    if (param !== "page") {
      oldQuery.page = "0";
    }
    const queryStringOld = Object.entries(oldQuery)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const finalQueryString = queryStringOld ? `?${queryStringOld}` : "";
    return finalQueryString;
  } else {
    const queryString = sorts
      .map((sort) => `${sort.field}=${sort.direction}`)
      .join("&");
    const finalQueryString = queryString ? `?${queryString}` : "";
    return finalQueryString;
  }
};
