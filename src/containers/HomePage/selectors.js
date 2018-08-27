/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home;

const makeSelectCardList = () =>
  createSelector(selectHome, homeState => homeState.cardList);

export { selectHome, makeSelectCardList };
