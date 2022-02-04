export const serialize = (obj: Record<string, string | number | boolean>) => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }}
  return str.join('&');
};
