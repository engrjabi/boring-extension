import React from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Avatar from "@material-ui/core/Avatar";
import ButtonBase from "@material-ui/core/ButtonBase";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { styles } from "./styles";
import { preventDefaultEvent } from "../../utils/browserCommands";
import { formatLink } from "../../utils/formatters";
import GenericMenu from "../GenericComponents/GenericMenu";
import { GlobalStore } from "../../store/store";

const CardList = ({ classes, cardList, updateClicker, removeACard }) => {
  const store = GlobalStore.useStore();

  const handleCardRedirect = React.useCallback(
    tile => {
      const { link, id } = tile;
      updateClicker(id);
      window.location = formatLink(link);
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

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} cols={8} className={classes.gridList}>
        {cardList.map((tile, indexId) => {
          const doesImgExists = tile && tile.hasOwnProperty("imgData");
          return (
            <GridListTile key={indexId} className={classes.gridListTile}>
              <ButtonBase
                disableRipple
                className={classes.buttonWrapper}
                onClick={() => handleCardRedirect(tile)}
                focusVisibleClassName={classes.focusVisible}
              >
                <div
                  className={`${classes.avatarWrapper} ${
                    doesImgExists ? classes.avatarWrapperHoverEffect : ""
                  }`}
                >
                  <Avatar aria-label="default-icon" className={classes.avatar}>
                    {tile.title.substring(0, 2).toUpperCase()}
                  </Avatar>
                </div>

                {doesImgExists && (
                  <img
                    src={tile.imgData}
                    onDragStart={preventDefaultEvent}
                    className={classes.image}
                    alt={tile.title}
                  />
                )}

                <GridListTileBar
                  title={tile.title}
                  style={{ textAlign: "left" }}
                  subtitle={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.625rem 0"
                      }}
                    >
                      <FavoriteIcon
                        style={{
                          fontSize: "inherit",
                          marginRight: "0.1875rem"
                        }}
                      />
                      {tile.launched}
                    </div>
                  }
                />
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
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
};

export default withStyles(styles)(CardList);
