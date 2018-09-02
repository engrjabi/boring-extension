/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = state => state.dashboardReducer;

const makeSelectCardList = () =>
  createSelector(selectHome, homeState => homeState.cardList);

export { selectHome, makeSelectCardList };
