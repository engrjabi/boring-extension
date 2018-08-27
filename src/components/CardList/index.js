import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import tileData from './tildeData';
import { styles } from './styles';
import { preventDefaultEvent } from '../../utils/browserCommands';
import { getRandomInt } from '../../utils/randomGenerator';
import 'whatwg-fetch';

class CardList extends Component {
  applyImages = dataArray =>
    dataArray.map(card => {
      const cardCopy = { ...card };
      if (!cardCopy.hasOwnProperty('img')) {
        cardCopy.img = `https://picsum.photos/240/180?sig=${getRandomInt(
          1,
          10000,
        )}`;
      }
      return cardCopy;
    });

  render() {
    const { classes, cardList } = this.props;

    return (
      <div className={classes.root}>
        <GridList cellHeight={180} cols={8} className={classes.gridList}>
          {this.applyImages(cardList).map((tile, indexId) => (
            <GridListTile key={indexId} className={classes.gridListTile}>
              <ButtonBase
                focusRipple
                className={classes.buttonWrapper}
                focusVisibleClassName={classes.focusVisible}
              >
                <div className={classes.avatarWrapper}>
                  <Avatar aria-label="default-icon" className={classes.avatar}>
                    {tile.title.substring(0, 2).toUpperCase()}
                  </Avatar>
                </div>

                <img
                  src={tile.img}
                  onDragStart={preventDefaultEvent}
                  className={classes.image}
                  alt={tile.title}
                />

                <GridListTileBar
                  title={tile.title}
                  style={{ textAlign: 'left' }}
                  subtitle={
                    <span>
                      <FavoriteIcon /> {tile.launched}
                    </span>
                  }
                  actionIcon={
                    <IconButton className={classes.icon}>
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
              </ButtonBase>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

CardList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardList);
