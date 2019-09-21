import { makePersistor } from "../utils/storage";

export const cardsPersistor = makePersistor("cards");

export const globalStoreEffects = store => {
  store.on("cards").subscribe(cards => cardsPersistor.set(cards));
  return store;
};
