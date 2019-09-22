import React from "react";
import CardList from "../../components/CardList";
import Header from "../../components/Header";
import { GlobalStore } from "../../store/store";
import _toNumber from "lodash/toNumber";

const HomePage = () => {
  const store = GlobalStore.useStore();
  const cardList = store.get("cards");

  const removeACard = React.useCallback(
    cardId => {
      store.set("cards")(cardList.filter(card => card.id !== cardId));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cardList]
  );

  const updateClicker = React.useCallback(
    cardId => {
      store.set("cards")(
        cardList.map(card => {
          if (card.id === cardId) {
            return {
              ...card,
              launched: _toNumber(card.launched) + 1
            };
          }
          return card;
        })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cardList]
  );

  return (
    <div>
      <Header />
      <CardList
        cardList={cardList}
        removeACard={removeACard}
        updateClicker={updateClicker}
      />
    </div>
  );
};

export default HomePage;
