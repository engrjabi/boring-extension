import queryString from "query-string";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { chromeStorageGet, chromeStorageKeys } from "../src/utils/chromeStorage";

// Text to display on the DOM link
const slackLinkTextDom = "SLACK SEARCH";
const ticketNumberRegex = /^#?[\w]{5,6} .+/g;

function addSlackLinkFromClickUpTag() {
  for (const node of document.querySelectorAll("span")) {
    const stringToSearch = _get(node, "textContent", "");

    if (!_isEmpty(stringToSearch) && stringToSearch.match(ticketNumberRegex)) {
      // break loop if there is already a slack link on the page
      if (stringToSearch.includes(slackLinkTextDom)) {
        break;
      }

      // Get ticket number and make serialized query param
      const ticketNumber = stringToSearch.match(ticketNumberRegex);
      const serializedQueryParameter = queryString.stringify({
        search: `created pull request ${ticketNumber}`
      });

      // Attach Link
      const linkNode = document.createElement("a");
      const link = document.createTextNode(slackLinkTextDom);
      linkNode.appendChild(link);
      linkNode.title = slackLinkTextDom;
      linkNode.href = `https://app.slack.com/client?${serializedQueryParameter}`;
      linkNode.target = "_blank";
      linkNode.style = "margin: 0 10px";
      node.appendChild(linkNode);

      // Only need to apply on first occurrence
      break;
    }
  }
}

(async () => {
  const isBitBucketSlackSearchEnabled = await chromeStorageGet(
    chromeStorageKeys.options_enable_bitbucket_slack_search
  );

  if (!isBitBucketSlackSearchEnabled) {
    return;
  }

  window.setInterval(() => {
    if (document.readyState !== "complete") {
      return;
    }

    addSlackLinkFromClickUpTag();
  }, 2000);
})();
