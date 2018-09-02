/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { types } from './actions';
// import immutableTransform from 'redux-persist-transform-immutable';

// The initial state of the App
export const initialState = {
  cardList: [],
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
	  case types.ADD_CARD:
      return {
	      ...state,
	      cardList: [...state.cardList, action.dataDetails],
      };
	  case types.REMOVE_CARD:
		  return {
			  ...state,
			  cardList: state.cardList.filter(card => card.title !== action.cardTitle),
		  };
	  case types.UPDATE_CLICKER:
		  return {
			  ...state,
			  cardList: state.cardList.map(card => {
				  if (card.title === action.cardTitle) {
					  return {
						  ...card,
						  launched: String(Number(card.launched) + 1),
					  }
				  }
				  return card;
			  }),
		  };
    default:
      return state;
  }
}

const homePersistConfig = {
  // transforms: [immutableTransform()],
  key: 'home',
  storage,
};

export default persistReducer(homePersistConfig, homeReducer);
