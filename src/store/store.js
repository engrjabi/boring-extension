import { createConnectedStore } from "undux";
import { globalStoreEffects, cardsPersistor } from "./effects";
import { useEffect } from "react";

const initialState = {
  /**
   * @typedef {Object} CardProps
   * @property {string} id
   * @property {string} img
   * @property {string} launched
   * @property {string} link
   * @property {string} title

   * @type {CardProps[]}
   */
  cards: [],
  cardToEdit: {},
  showAddOrEditCardForm: false,
  showOptions: false
};

// Create & export a store with an initial value.
export const GlobalStore = createConnectedStore(initialState, globalStoreEffects);

export const GlobalStorePersistor = ({ children }) => {
  const store = GlobalStore.useStore();

  useEffect(() => {
    (async () => {
      const cardsPersistedState = await cardsPersistor.get([]);
      store.set("cards")(cardsPersistedState);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
