import _get from "lodash/get";

export const chromeStorageKeys = {
  options_enable_slack_url_search: "enable_slack_url_search",
  options_enable_bitbucket_slack_search: "enable_bitbucket_slack_search"
};

export const chromeStorageSet = (key, value) => {
  /**
   * Call storage local and resolve sync only on background
   * because local operation is much faster than sync
   */
  return new Promise(resolve => {
    // eslint-disable-next-line
    chrome.storage.local.set({ [key]: value }, function() {
      // eslint-disable-next-line
      chrome.storage.sync.set({ [key]: value });
      resolve({ [key]: value });
    });
  });
};

export const chromeStorageGet = (key, defaultValue) => {
  /**
   * If no value can be read from local check out sync storage
   * if there is on sync storage do a background syncing
   */
  return new Promise(resolve => {
    // eslint-disable-next-line
    chrome.storage.local.get(key, function(result) {
      const value = _get(result, key, defaultValue);

      if (value) {
        return resolve(value);
      }

      // eslint-disable-next-line
      chrome.storage.sync.get(key, function(result) {
        const value = _get(result, key, defaultValue);
        chromeStorageSet(key, value);
        resolve(value);
      });
    });
  });
};
