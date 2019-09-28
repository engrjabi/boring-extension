const httpRegex = RegExp("://", "g");

export const formatLink = link => {
  const isHttpProtocolFound = httpRegex.test(link);

  if (isHttpProtocolFound) {
    return link;
  } else {
    return `http://${link}`;
  }
};
