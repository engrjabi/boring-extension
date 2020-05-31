import React, { useState, useMemo } from "react";
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
import _find from "lodash/find";
import { useWindowSize } from "../../utils/lifecycle";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./styles.css";
import GridLayout from "react-grid-layout";

const CardList = ({ classes, cardList, updateClicker, removeACard }) => {
  const [width] = useWindowSize();
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

  const handleLayoutChange = React.useCallback(
    layout => {
      const cardListWithLayout = cardList.map(item => {
        const itemLayout = _find(layout, { i: item.id });
        return {
          ...item,
          layout: itemLayout
        };
      });
      store.set("cards")(cardListWithLayout);
    },
    [cardList, store]
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

  const layoutDimensions = useMemo(() => {
    // Don't use full width so there can be a padding on start and end tiles
    const limitedWidth = width - 20;
    const tileSquareDimension = Math.floor(limitedWidth / 10);
    const colCount = Math.floor(limitedWidth / tileSquareDimension);

    return {
      limitedWidth,
      tileSquareDimension,
      colCount
    };
  }, [width]);

  return (
    <>
      <GridLayout
        className={classes.parentContainerLayout}
        cols={layoutDimensions.colCount}
        rowHeight={layoutDimensions.tileSquareDimension}
        width={layoutDimensions.limitedWidth}
        margin={[10, 10]}
        onLayoutChange={handleLayoutChange}
      >
        {cardList.map((tile, indexId) => {
          const doesImgExists = tile && tile.hasOwnProperty("imgData");

          return (
            <div
              className="item"
              key={String(tile.id)}
              data-grid={tile.layout || { x: indexId % layoutDimensions.colCount, y: 0, w: 1, h: 1 }}
            >
              <div className="item-content" data-id={tile.id}>
                <ButtonBase
                  disableRipple
                  className={classes.buttonWrapper}
                  onMouseDown={e => {
                    setCardMouseDownTimeStamp(e.timeStamp);
                  }}
                  onMouseUp={e => {
                    /**
                     * If interval between onMouseDown and onMouseUp is only short then user
                     * initiates a click event and not drag event
                     */
                    e.stopPropagation();
                    e.preventDefault();
                    if (cardMouseDownTimeStamp && e.timeStamp - cardMouseDownTimeStamp < 300) {
                      return handleCardRedirect(tile);
                    }
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
      </GridLayout>
    </>
  );
};

export default withStyles(styles)(CardList);
