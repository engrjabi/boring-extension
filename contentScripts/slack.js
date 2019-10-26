import queryString from "query-string";
import _get from "lodash/get";

function doSearch(url = window.location.search) {
  const parsed = queryString.parse(url);
  const searchString = _get(parsed, "search");
  const getNode = document.querySelector.bind(document);

  const activateSearch = () => getNode('[data-qa="legacy_search_header"]').click();
  const inputKeyword = () => (getNode('[data-qa="focusable_search_input"] p').innerText = searchString);
  const submitSearchQuery = () => getNode("#c-search_autocomplete__suggestion_list li").click();

  return [activateSearch, inputKeyword, submitSearchQuery].map((func, idx) => setTimeout(func, idx * 500));
}

const intervalId = window.setInterval(() => {
  if (document.readyState === "complete") {
    window.clearInterval(intervalId);
    doSearch();
  }
}, 1000);
