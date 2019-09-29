export function extractHostname(url) {
  let hostname = "";
  const haveProtocol = url.indexOf("//") > -1;
  const protocol = haveProtocol ? `${url.split("//")[0]}//` : null;

  //find & remove protocol (http, ftp, etc.) and get hostname
  if (haveProtocol) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  //find & remove port number
  hostname = hostname.split(":")[0];
  //find & remove "?"
  hostname = hostname.split("?")[0];

  if (protocol) {
    return `${protocol}${hostname}`;
  }

  return hostname;
}
