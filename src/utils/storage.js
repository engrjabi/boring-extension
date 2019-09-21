import _defaultTo from "lodash/defaultTo";

export const makePersistor = (key, storage = window.localStorage) => {
  const persistedKey = `persisted__${key}`;

  return {
    get: defaultValue => {
      const jsonString = storage.getItem(persistedKey);
      let returnValue = jsonString;

      try {
        returnValue = JSON.parse(jsonString);
      } catch (e) {
        returnValue = jsonString;
      }

      return _defaultTo(returnValue, defaultValue);
    },
    set: newValue => storage.setItem(persistedKey, JSON.stringify(newValue))
  };
};
