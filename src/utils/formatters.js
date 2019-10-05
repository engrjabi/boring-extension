export const formatLink = (link = "") => {
  const isHttpProtocolFound = link.includes("://");

  if (isHttpProtocolFound) {
    return link;
  } else {
    return `http://${link}`;
  }
};
