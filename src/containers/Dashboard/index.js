import React from "react";
import CardList from "../../components/CardList";
import Header from "../../components/Header";
import { GlobalStore } from "../../store/store";

const HomePage = () => {
  const store = GlobalStore.useStore();
  const cardList = store.get("cards");

  const removeACard = React.useCallback(
    cardTitle => {
      store.set("cards")(cardList.filter(card => card.title !== cardTitle));
    },
    [cardList, store]
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
    [cardList, store]
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
