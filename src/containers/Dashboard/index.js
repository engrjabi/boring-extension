import React from "react";
import CardList from "../../components/CardList";
import Header from "../../components/Header";
import { GlobalStore } from "../../store/store";

const HomePage = () => {
  const store = GlobalStore.useStore();
  const cardList = store.get("cards");

  const addACard = React.useCallback(
    card => store.set("cards")([card, ...cardList]),
    [cardList]
  );

  const removeACard = React.useCallback(
    cardTitle => {
      store.set("cards")(cardList.filter(card => card.title !== cardTitle));
    },
    [cardList]
  );

  const updateClicker = React.useCallback(
    cardTitle => {
      store.set("cards")(
        cardList.map(card => {
          if (card.title !== cardTitle) {
            return {
              ...card,
              launched: card.launched + 1
            };
          }
          return card;
        })
      );
    },
    [cardList]
  );

  return (
    <div>
      <Header addACard={addACard} />
      <CardList
        cardList={cardList}
        removeACard={removeACard}
        updateClicker={updateClicker}
      />
    </div>
  );
};

export default HomePage;
