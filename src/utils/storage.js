import _defaultTo from "lodash/defaultTo";
import localforage from "localforage";

localforage.config({
  name: "BoringDashboard",
  storeName: "BoringDashboardStore",
  description: "more boring than your default new tab page"
});

export const makePersistor = (
  key,
  storage = localforage,
  storeAsJson = false
) => {
  const persistedKey = `persisted__${key}`;

  return {
    get: async defaultValue => {
      const rawValue = await storage.getItem(persistedKey);

      if (storeAsJson) {
        try {
          return _defaultTo(JSON.parse(rawValue), defaultValue);
        } catch (e) {
          return _defaultTo(rawValue, defaultValue);
        }
      }

      return _defaultTo(rawValue, defaultValue);
    },

    set: async newValue => {
      return await storage.setItem(
        persistedKey,
        storeAsJson ? JSON.stringify(newValue) : newValue
      );
    }
  };
};
