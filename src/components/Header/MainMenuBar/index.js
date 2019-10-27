import React, { useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import GenericMenu from "../../GenericComponents/GenericMenu/index";
import GenericModal from "../../GenericComponents/GenericModal/index";
import AddOrEditShortcutForm from "../AddShortcutForm";
import { GlobalStore } from "../../../store/store";
import _isEmpty from "lodash/isEmpty";
import shortid from "shortid";
import { downloadFile, onFileSelected } from "../../../utils/fileManipulation";
import { OptionsForm } from "../OptionsForm";

const styles = () => ({
  root: {}
});

const MainMenuBar = ({ classes }) => {
  const store = GlobalStore.useStore();
  const cardList = store.get("cards");
  const openModal = store.get("showAddOrEditCardForm");
  const showOptions = store.get("showOptions");
  const cardToEdit = store.get("cardToEdit");
  const inputField = useRef(null);

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
      <input
        type="file"
        onChange={async e => {
          /**
           * For now for safety measures always backup current state to local file
           * before commencing import
           */
          e.persist();
          await downloadFile(store.get("cards"));
          const readInput = await onFileSelected(e);
          try {
            const parsedResult = JSON.parse(readInput.target.result);
            store.set("cards")(parsedResult);
          } catch (e) {
            console.log("ERROR ON IMPORT", e);
          }
        }}
        ref={inputField}
        style={{
          display: "none"
        }}
      />

      <GenericMenu
        className={classes.root}
        id={`${classes.root}-id`}
        menuItems={[
          {
            label: "Add Shortcut",
            clickAction: () => store.set("showAddOrEditCardForm")(true)
          },
          {
            label: "Export Shortcuts",
            clickAction: async () => await downloadFile(store.get("cards"))
          },
          {
            label: "Import Shortcuts",
            clickAction: () => inputField && inputField.current.click()
          },
          {
            label: "Settings",
            clickAction: () => store.set("showOptions")(true)
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

      <GenericModal
        openStatus={showOptions}
        handleClose={() => {
          store.set("showOptions")(false);
        }}
      >
        <OptionsForm />
      </GenericModal>
    </div>
  );
};

export default withStyles(styles)(MainMenuBar);
