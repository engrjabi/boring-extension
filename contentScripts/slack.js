import queryString from "query-string";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { chromeStorageGet, chromeStorageKeys } from "../src/utils/chromeStorage";

const getNode = document.querySelector.bind(document);

function closeSearchBox() {
  const closeSearchBoxNode = getNode('[data-qa="search_input_close"]');
  if (closeSearchBoxNode) {
    closeSearchBoxNode.click();
  }
}

function doSearch(url = window.location.search) {
  const parsed = queryString.parse(url);
  const searchString = _get(parsed, "search");

  if (_isEmpty(searchString)) {
    return;
  }

  const activateSearch = () => getNode('[data-qa="legacy_search_header"]').click();
  const inputKeyword = () => (getNode('[data-qa="focusable_search_input"] p').innerText = searchString);
  const submitSearchQuery = () => getNode("#c-search_autocomplete__suggestion_list li").click();

  return [activateSearch, inputKeyword, submitSearchQuery].map((func, idx) => setTimeout(func, idx * 500));
}

(async () => {
  const isSlackSearchEnabled = await chromeStorageGet(chromeStorageKeys.options_enable_slack_url_search);

  const intervalId = window.setInterval(async () => {
    if (document.readyState !== "complete") {
      return;
    }

    window.clearInterval(intervalId);

    /**
     * There is a issue right now that search box stays open even on refresh
     * so closeSearchBox is a workaround to fix that for now
     *
     * We need some delay to make sure that the search box will be closed if already opened
     * @fixme
     */
    closeSearchBox();
    await new Promise(resolve => setTimeout(resolve, 500));

    if (isSlackSearchEnabled) {
      doSearch();
    }
  }, 1000);
})();
