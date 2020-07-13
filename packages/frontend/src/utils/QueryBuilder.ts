export type RequestQuery = { [name: string]: number | string };

export function getQueryString(query?: RequestQuery): string {
  if (!query) {
    return "";
  }
  const pairs: string[] = [];
  Object.keys(query).forEach((key) => {
    const value = query[key];
    pairs.push(`${key}=${value}`);
  });
  return "?".concat(pairs.join("&"));
}
