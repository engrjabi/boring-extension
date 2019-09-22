import { createConnectedStore } from "undux";
import { globalStoreEffects, cardsPersistor } from "./effects";

const cardsPersistedState = cardsPersistor.get([]);

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
  cards: cardsPersistedState,
  cardToEdit: {},
  showAddOrEditCardForm: false
};

// Create & export a store with an initial value.
export const GlobalStore = createConnectedStore(
  initialState,
  globalStoreEffects
);
