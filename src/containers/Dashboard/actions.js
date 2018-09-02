export const types = {
  ADD_CARD: 'HOME/ADD_CARD',
	REMOVE_CARD: 'HOME/REMOVE_CARD',
	UPDATE_CLICKER: 'HOME/UPDATE_CLICKER',
};

export const actions = {

  addACard: dataDetails => ({
    type: types.ADD_CARD,
    dataDetails,
  }),

  removeACard: cardTitle => ({
    type: types.REMOVE_CARD,
	  cardTitle,
  }),

	updateClicker: cardTitle => ({
		type: types.UPDATE_CLICKER,
		cardTitle,
	}),

};
