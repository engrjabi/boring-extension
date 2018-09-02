export const types = {
  ADD_CARD: 'HOME/ADD_CARD',
};

export const actions = {
  addACard: dataDetails => ({
    type: types.ADD_CARD,
    dataDetails,
  }),
};
