import React, { useLayoutEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ButtonBase from "@material-ui/core/ButtonBase";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { styles } from "./styles";
import { preventDefaultEvent } from "../../utils/browserCommands";
import { formatLink } from "../../utils/formatters";
import GenericMenu from "../GenericComponents/GenericMenu";
import { GlobalStore } from "../../store/store";
import Muuri from "muuri";
import _isEmpty from "lodash/isEmpty";
import _find from "lodash/find";
import { useWindowSize } from "../../utils/lifecycle";
import "./styles.css";

const CardList = ({ classes, cardList, updateClicker, removeACard }) => {
  const [width] = useWindowSize();
  const [draggableContainer, setDraggableContainer] = useState(null);
  const [cardMouseDownTimeStamp, setCardMouseDownTimeStamp] = useState(null);
  const store = GlobalStore.useStore();

  const handleCardRedirect = React.useCallback(
    tile => {
      const { link, id } = tile;
      updateClicker(id);
      window.open(formatLink(link), "_blank");
      window.close();
    },
    [updateClicker]
  );

  const handleEdit = card => {
    store.set("cardToEdit")(card);
    store.set("showAddOrEditCardForm")(true);
  };

  const handleDelete = React.useCallback(
    card => {
      removeACard(card.id);
    },
    [removeACard]
  );

  useLayoutEffect(() => {
    /**
     * Reset muuriInstance whenever cardList changes since muuriInstance
     * alone cannot track if new elements are added or removed
     */
    if (_isEmpty(cardList)) {
      return;
    }

    if (draggableContainer) {
      draggableContainer.destroy();
    }

    const muuriInstance = new Muuri(".grid", {
      dragEnabled: true,
      dragStartPredicate: {
        distance: 10,
        delay: 100
      }
    });

    setDraggableContainer(muuriInstance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardList]);

  useLayoutEffect(() => {
    if (draggableContainer) {
      draggableContainer.layout(true);
    }
  }, [draggableContainer, width]);

  return (
    <div className="grid">
      {cardList.map((tile, indexId) => {
        const doesImgExists = tile && tile.hasOwnProperty("imgData");
        // Deduct the margins and borders on both sides
        const tileSquareDimension = Math.floor(width / 10 - 6) * 0.99;

        return (
          <div className="item" key={indexId}>
            <div className="item-content" data-id={tile.id}>
              <ButtonBase
                disableRipple
                className={classes.buttonWrapper}
                onMouseDown={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCardMouseDownTimeStamp(e.timeStamp);
                }}
                onMouseUp={e => {
                  /**
                   * If interval between onMouseDown and onMouseUp is only short then user
                   * initiates a click event and not drag event
                   */
                  e.stopPropagation();
                  e.preventDefault();
                  if (
                    cardMouseDownTimeStamp &&
                    e.timeStamp - cardMouseDownTimeStamp < 300
                  ) {
                    return handleCardRedirect(tile);
                  }

                  /**
                   * We need to read data from draggableContainer then save the same order
                   * seen on the view on the local db. We need to add a delay on saving on DB
                   * to make the animation transition smooth
                   */
                  if (draggableContainer) {
                    const sortedCardList = draggableContainer
                      .getItems()
                      .map(item => {
                        const itemId = item._child.getAttribute("data-id");
                        return _find(cardList, { id: itemId });
                      });
                    setTimeout(() => store.set("cards")(sortedCardList), 300);
                  }
                }}
                style={{
                  width: tileSquareDimension,
                  height: tileSquareDimension
                }}
              >
                <GridListTileBar
                  titlePosition="top"
                  title={tile.title}
                  className={classes.gridListTileBar}
                  classes={{
                    title: classes.gridListTileTitle
                  }}
                />

                <div className={classes.launchedContainer}>
                  <FavoriteIcon
                    style={{
                      fontSize: "inherit"
                    }}
                  />
                  {tile.launched}
                </div>

                {doesImgExists && (
                  <img
                    src={tile.imgData}
                    onDragStart={preventDefaultEvent}
                    className={classes.image}
                    alt={tile.title}
                  />
                )}
              </ButtonBase>

              <GenericMenu
                className={classes.moreOptionsIcon}
                menuIcon={<MoreVertIcon />}
                id={`${classes.root}-${indexId}`}
                menuItems={[
                  {
                    label: "Edit",
                    clickAction: () => handleEdit(tile)
                  },
                  {
                    label: "Delete",
                    clickAction: () => handleDelete(tile)
                  }
                ]}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default withStyles(styles)(CardList);
