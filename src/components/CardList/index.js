import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { styles } from './styles';
import { preventDefaultEvent } from '../../utils/browserCommands';
import { formatLink } from '../../utils/formatters';
import GenericMenu from '../GenericComponents/GenericMenu';

class CardList extends Component {

	handleCardRedirect = (link) => {
		window.location = formatLink(link);
	};

	handleEdit = (card) => {
		console.log('editing', card);
	};

	handleDelete = (card) => {
		const { removeACard } = this.props;
		removeACard(card.title);
	};

	render() {
    const { classes, cardList } = this.props;

    return (
      <div className={classes.root}>
        <GridList cellHeight={180} cols={8} className={classes.gridList}>
	        {cardList.map((tile, indexId) => {
		        const doesImgExists = (tile && tile.hasOwnProperty('img'));
		        return (
			        <GridListTile key={indexId} className={classes.gridListTile}>
				        <ButtonBase
					        focusRipple
					        className={classes.buttonWrapper}
					        onClick={() => this.handleCardRedirect(tile.link)}
					        focusVisibleClassName={classes.focusVisible}>

					        <div className={`${classes.avatarWrapper} ${doesImgExists ? classes.avatarWrapperHoverEffect : ''}`}>
						        <Avatar aria-label="default-icon" className={classes.avatar}>
							        {tile.title.substring(0, 2).toUpperCase()}
						        </Avatar>
					        </div>

					        {doesImgExists &&
					        <img
						        src={tile.img}
						        onDragStart={preventDefaultEvent}
						        className={classes.image}
						        alt={tile.title}
					        />}

					        <GridListTileBar
						        title={tile.title}
						        style={{ textAlign: 'left' }}
						        subtitle={
							        <span>
                      <FavoriteIcon/> {tile.launched}
                    </span>
						        }
					        />
				        </ButtonBase>

				        <GenericMenu
					        className={classes.moreOptionsIcon}
					        menuIcon={(<MoreVertIcon/>)}
					        id={`${classes.root}-${indexId}`}
					        menuItems={[
						        {
							        label: 'Edit',
							        clickAction: () => this.handleEdit(tile),
						        },
						        {
							        label: 'Delete',
							        clickAction: () => this.handleDelete(tile),
						        },
					        ]}
				        />
			        </GridListTile>
		        )
	        })}
        </GridList>
      </div>
    );
  }
}

CardList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardList);
