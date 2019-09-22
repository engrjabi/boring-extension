import React from "react";
import { withStyles } from "@material-ui/core/styles";
import GenericMenu from "../../GenericComponents/GenericMenu/index";
import GenericModal from "../../GenericComponents/GenericModal/index";
import AddOrEditShortcutForm from "../AddShortcutForm";
import { GlobalStore } from "../../../store/store";
import _isEmpty from "lodash/isEmpty";
import shortid from "shortid";

const styles = () => ({
  root: {}
});

const MainMenuBar = ({ classes }) => {
  const store = GlobalStore.useStore();
  const cardList = store.get("cards");
  const openModal = store.get("showAddOrEditCardForm");
  const cardToEdit = store.get("cardToEdit");

  const addACard = React.useCallback(
    card =>
      store.set("cards")([
        {
          ...card,
          id: shortid.generate()
        },
        ...cardList
      ]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cardList]
  );

  const editACard = React.useCallback(
    editedCard => {
      store.set("cards")(
        cardList.map(card => {
          if (card.id === editedCard.id) {
            return editedCard;
          }
          return card;
        })
      );
      store.set("cardToEdit")({});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cardList]
  );

  const handleCloseModal = () => {
    store.set("showAddOrEditCardForm")(false);
    store.set("cardToEdit")({});
  };

  return (
    <div>
      <GenericMenu
        className={classes.root}
        id={`${classes.root}-id`}
        menuItems={[
          {
            label: "Add Shortcut",
            clickAction: () => store.set("showAddOrEditCardForm")(true)
          },
          {
            label: "Export Settings",
            clickAction: () => console.log("exporting settings")
          },
          {
            label: "Import Settings",
            clickAction: () => console.log("importing settings")
          }
        ]}
      />

      <GenericModal openStatus={openModal} handleClose={handleCloseModal}>
        <AddOrEditShortcutForm
          initialValues={cardToEdit}
          addACard={_isEmpty(cardToEdit) ? addACard : editACard}
          closeModal={handleCloseModal}
        />
      </GenericModal>
    </div>
  );
};

export default withStyles(styles)(MainMenuBar);
