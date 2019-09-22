export function sortObjKeysAlphabetically(obj) {
  let ordered = {};
  Object.keys(obj)
    .sort()
    .forEach(function(key) {
      ordered[key] = obj[key];
    });
  return ordered;
}

export const formatLink = link => {
  const httpRegex = RegExp("^https?://", "g");
  const isHttpProtocolFound = httpRegex.test(link);

  if (isHttpProtocolFound) {
    return link;
  } else {
    return `https://${link}`;
  }
};
